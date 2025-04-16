import { db } from "./firebase.js";
import {
  collection, query, where, getDocs,
  addDoc, deleteDoc, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const storageID = new URLSearchParams(window.location.search).get("id");
const container = document.getElementById("monthlyContainer");

const modal = document.getElementById("addScheduleModal");
const modalTitle = document.getElementById("scheduleTitle");
const modalStartDate = document.getElementById("scheduleStartDate");
const modalEndDate = document.getElementById("scheduleEndDate");
const modalColor = document.getElementById("scheduleColor");
const saveBtn = document.getElementById("saveScheduleBtn");
const closeModalBtn = modal.querySelector('.close');

const editModal = document.getElementById("editScheduleModal");
const editScheduleTitle = document.getElementById("editScheduleTitle");
const editScheduleColor = document.getElementById("editScheduleColor");
const editScheduleStartDate = document.getElementById("editScheduleStartDate");
const editScheduleEndDate = document.getElementById("editScheduleEndDate");
const editSaveBtn = document.getElementById("editSaveBtn");
const editDeleteBtn = document.getElementById("editDeleteBtn");
const editCloseBtn = editModal.querySelector('.close');


document.addEventListener('DOMContentLoaded', () => {
  closeModalBtn.addEventListener("click", closeModal);
  editCloseBtn.addEventListener("click", closeEditModal);

  const addBtn = document.querySelector(".add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", openAddModal);
  }

  saveBtn.addEventListener("click", async () => {
    const title = modalTitle.value;
    const startDate = modalStartDate.value;
    const endDate = modalEndDate.value || startDate;
    const color = modalColor.value;

    if (!title || !startDate) {
      alert("제목과 시작일을 입력해주세요.");
      return;
    }

    const ref = collection(db, "storages", storageID, "monthlySchedules");
    await addDoc(ref, { title, startDate, endDate, color });

    closeModal();
    location.reload();
  });

  renderCalendar();
});

function closeModal() {
  modal.style.display = "none";
  modalTitle.value = "";
  modalStartDate.value = "";
  modalEndDate.value = "";
  modalColor.value = "#87CEEB";
}

function closeEditModal() {
  editModal.style.display = "none";
  editScheduleTitle.value = "";
  editScheduleColor.value = "#87CEEB";
}

function openAddModal() {
  modal.style.display = "block";
}

function getDateColor(day) {
  if (day === 0) return "#DF6864";
  if (day === 6) return "#587595";
  return "#2F2F2F";
}

async function renderCalendar() {
  container.innerHTML = "";

  const storageData = (await getDocs(query(collection(db, "storages"), where("__name__", "==", storageID)))).docs[0]?.data();
  if (!storageData) return;

  const start = new Date(storageData.start);
  const end = new Date(storageData.end);

  const months = [];
  const temp = new Date(start);
  temp.setDate(1);

  while (temp <= end) {
    months.push(new Date(temp));
    temp.setMonth(temp.getMonth() + 1);
  }

  const scheduleRef = collection(db, "storages", storageID, "monthlySchedules");
  const scheduleSnap = await getDocs(scheduleRef);
  const schedules = scheduleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  months.forEach(month => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const section = document.createElement("div");
    section.className = "month-section";

    const header = document.createElement("div");
    header.className = "month-header";
    header.innerHTML = `
      <h2>${year}년 ${monthIndex + 1}월</h2>
      <button class="add-btn" data-month="${monthIndex + 1}" data-year="${year}">+</button>
    `;

    const key = `expanded-${year}-${monthIndex}`;
    const grid = generateCalendarGrid(year, monthIndex, schedules);

    const expanded = localStorage.getItem(key) === "true";
    grid.style.display = expanded ? "grid" : "none";

    header.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      const isOpen = grid.style.display === "grid";
      grid.style.display = isOpen ? "none" : "grid";
      localStorage.setItem(key, !isOpen);
    });

    header.querySelector(".add-btn").addEventListener("click", () => {
      modal.style.display = "block";
      modalStartDate.value = `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;
      modalEndDate.value = "";
    });

    section.appendChild(header);
    section.appendChild(grid);
    container.appendChild(section);
  });
}

// 일정 수정 모달 열기
function openEditModal(schedule) {
  editScheduleTitle.value = schedule.title;
  editScheduleColor.value = schedule.color || "#87CEEB";
  editScheduleStartDate.value = schedule.startDate || "";
  editScheduleEndDate.value = schedule.endDate || "";
  editModal.style.display = "block";

  editSaveBtn.onclick = async () => {
    const updatedTitle = editScheduleTitle.value;
    const updatedColor = editScheduleColor.value;
    const updatedStartDate = editScheduleStartDate.value;
    const updatedEndDate = editScheduleEndDate.value || updatedStartDate;

    if (!updatedTitle || !updatedStartDate) {
      alert("제목과 시작일은 필수입니다.");
      return;
    }

    const scheduleRef = doc(db, "storages", storageID, "monthlySchedules", schedule.id);

    await updateDoc(scheduleRef, {
      title: updatedTitle,
      color: updatedColor,
      startDate: updatedStartDate,
      endDate: updatedEndDate
    });

    closeEditModal();
    location.reload();
  };

  editDeleteBtn.onclick = async () => {
    const scheduleRef = doc(db, "storages", storageID, "monthlySchedules", schedule.id);

    if (confirm("이 일정을 삭제하시겠습니까?")) {
      await deleteDoc(scheduleRef);
      closeEditModal();
      location.reload();
    }
  };
}

function generateCalendarGrid(year, monthIndex, schedules) {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const grid = document.createElement("div");
  grid.className = "calendar-grid";
  grid.style.display = "none"; // 기본은 닫힌 상태

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  weekDays.forEach(day => {
    const dayName = document.createElement("div");
    dayName.className = "day-name";
    dayName.textContent = day;
    grid.appendChild(dayName);
  });

  const dateMap = {}; // 날짜 => 셀 div 저장

  // 날짜 셀 생성
  for (let i = 0; i < startDay + daysInMonth; i++) {
    const cell = document.createElement("div");
    if (i < startDay) {
      cell.className = "day-cell empty";
    } else {
      const d = i - startDay + 1;
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cell.className = "day-cell";
      cell.dataset.date = dateStr;

      const currentDate = new Date(year, monthIndex, d);
      const weekday = currentDate.getDay();

      const dateEl = document.createElement("strong");
      dateEl.textContent = d;
      dateEl.style.color = getDateColor(weekday);
      cell.appendChild(dateEl);

      dateMap[dateStr] = cell;
    }

    grid.appendChild(cell);
  }

  // 일정 추가
  schedules.forEach(schedule => {
    const start = new Date(schedule.startDate || schedule.date);
    const end = new Date(schedule.endDate || schedule.date);
  
    const currentMonthStart = new Date(year, monthIndex, 1);
    const currentMonthEnd = new Date(year, monthIndex + 1, 0);
  
    if (end < currentMonthStart || start > currentMonthEnd) return;
  
    const startDate = start < currentMonthStart ? currentMonthStart : start;
    const endDate = end > currentMonthEnd ? currentMonthEnd : end;
  
    const temp = new Date(startDate);
    while (temp <= endDate) {
      const dateStr = temp.toISOString().slice(0, 10);
      const cell = dateMap[dateStr];
      if (cell) {
        const spanEl = document.createElement("div");
        spanEl.className = "schedule-span";
        spanEl.textContent = schedule.title;
        spanEl.style.backgroundColor = schedule.color || "#333";
  
        spanEl.addEventListener("click", () => openEditModal(schedule));
        cell.appendChild(spanEl);
      }
      temp.setDate(temp.getDate() + 1);
    }
  });
  
  return grid;
}