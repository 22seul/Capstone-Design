import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const storageID = urlParams.get("id");

  if (!storageID) {
    console.error("저장소 ID가 제공되지 않았습니다.");
    return;
  }

  let currentDate = new Date();

  const weeklySchedulesRef = collection(db, "storages", storageID, "weeklySchedules");

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function formatKoreanWeek(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const weekNumber = Math.ceil((date.getDate() + firstDay.getDay()) / 7);
    return `${year}년 ${month}월 ${weekNumber}주차`;
  }

  function renderWeek(baseDate) {
    const startDate = getStartOfWeek(new Date(baseDate));
    document.getElementById("weekDate").textContent = formatKoreanWeek(startDate);
    renderGrid(startDate);
    renderSchedules(startDate);
  }

  function renderGoals() {
    const goalList = document.getElementById("goalList");
    if (!goalList) {
      console.error("goalList 요소를 찾을 수 없습니다.");
      return;
    }

    const startOfWeek = getStartOfWeek(currentDate);
    const weekKey = formatDate(startOfWeek);

    const weeklyGoalsRef = collection(db, "storages", storageID, "weeklyGoals");

    const q = query(weeklyGoalsRef, where("week", "==", weekKey), orderBy("createdAt"));
    getDocs(q).then((querySnapshot) => {
      goalList.innerHTML = "";

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data.completed || false;
        checkbox.addEventListener("click", () => {
          toggleGoal(docSnap.id, checkbox.checked);
          goalText.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });
        
        const goalText = document.createElement("span");
        goalText.textContent = data.text;
        goalText.style.marginLeft = "8px";
        goalText.style.textDecoration = data.completed ? "line-through" : "none";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.style.marginLeft = "12px";
        deleteBtn.addEventListener("click", () => deleteGoal(docSnap.id));

        li.appendChild(checkbox);
        li.appendChild(goalText);
        li.appendChild(deleteBtn);
        li.style.marginBottom = "8px";
        goalList.appendChild(li);
      });
    });
  }

  function toggleGoal(goalId, completed) {
    const goalRef = doc(db, "storages", storageID, "weeklyGoals", goalId);
    updateDoc(goalRef, { completed }).then(() => {
      console.log("목표 완료 상태가 업데이트되었습니다.");
    }).catch((error) => {
      console.error("목표 상태 업데이트 실패:", error);
    });
  }

  function deleteGoal(goalId) {
    const goalRef = doc(db, "storages", storageID, "weeklyGoals", goalId);
    deleteDoc(goalRef).then(() => {
      console.log("목표가 삭제되었습니다.");
      renderGoals();
    }).catch((error) => {
      console.error("목표 삭제 실패:", error);
    });
  }

  const goalInput = document.getElementById("goalInput");
  const addGoalBtn = document.getElementById("addGoalBtn");

  addGoalBtn.addEventListener("click", () => {
    const goalText = goalInput.value.trim();
    if (!goalText) {
      alert("목표를 입력해주세요.");
      return;
    }

    const startOfWeek = getStartOfWeek(currentDate);
    const weekKey = formatDate(startOfWeek);
    const weeklyGoalsRef = collection(db, "storages", storageID, "weeklyGoals");

    addDoc(weeklyGoalsRef, {
      text: goalText,
      week: weekKey,
      completed: false,
      createdAt: new Date()
    }).then(() => {
      goalInput.value = "";
      renderGoals();
    }).catch((error) => {
      console.error("목표 추가 실패:", error);
    });
  });

  function renderGrid(startDate) {
    const timetable = document.getElementById("weeklyGrid");
    timetable.innerHTML = "";

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const timeHeader = document.createElement("th");
    timeHeader.textContent = "시간";
    headerRow.appendChild(timeHeader);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const th = document.createElement("th");
      th.innerHTML = `
        ${["월", "화", "수", "목", "금", "토", "일"][i]} <br>
        ${date.getDate()}일
        <button class="add-btn" data-date="${formatDate(date)}">+</button>
      `;
      headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (let hour = 0; hour < 24; hour++) {
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");
      timeCell.textContent = `${hour}:00`;
      row.appendChild(timeCell);

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        cell.classList.add("time-slot");
        cell.dataset.hour = hour;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    timetable.appendChild(table);

    document.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => openAddModal(e.target.dataset.date));
    });
  }

  async function renderSchedules(startDate) {
    const table = document.querySelector("#weeklyGrid table");
    if (!table) return;

    const cells = table.querySelectorAll(".time-slot");
    cells.forEach((cell) => (cell.innerHTML = "", cell.style.display = ""));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = formatDate(date);

      const q = query(weeklySchedulesRef, where("date", "==", dateStr));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const startHour = parseInt(data.startTime.split(":")[0]);
        const startMinute = parseInt(data.startTime.split(":")[1]);
        const endHour = parseInt(data.endTime.split(":")[0]);
        const endMinute = parseInt(data.endTime.split(":")[1]);

        const rowSpan = endHour - startHour + (endMinute > startMinute ? 1 : 0);
        const cell = table.rows[startHour + 1]?.cells[i + 1];
        if (!cell) return;

        cell.innerHTML = `
          <div class="schedule-title">${data.title}</div>
          <div class="schedule-time">(${data.startTime} ~ ${data.endTime})</div>
        `;
        cell.style.backgroundColor = data.color || "#87CEEB";
        cell.rowSpan = rowSpan;

        for (let j = 1; j < rowSpan; j++) {
          const mergeCell = table.rows[startHour + 1 + j]?.cells[i + 1];
          if (mergeCell) mergeCell.style.display = "none";
        }

        cell.addEventListener("click", () => openEditModal(docSnap.id, data));
      });
    }
  }

  function openAddModal(date) {
    document.getElementById("addScheduleModal").style.display = "block";
    document.getElementById("addModalDate").value = date;
  }

  function openEditModal(id, schedule) {
    document.getElementById("editScheduleModal").style.display = "block";
    document.getElementById("editModalDate").value = schedule.date;
    document.getElementById("editTitle").value = schedule.title;
    document.getElementById("editStartTime").value = schedule.startTime;
    document.getElementById("editEndTime").value = schedule.endTime;
    document.getElementById("editColor").value = schedule.color;
    document.getElementById("saveEditSchedule").onclick = () => saveEditSchedule(id);
    document.getElementById("deleteEditSchedule").onclick = () => deleteSchedule(id);
  }

  function saveEditSchedule(id) {
    const scheduleData = {
      title: document.getElementById("editTitle").value,
      startTime: document.getElementById("editStartTime").value,
      endTime: document.getElementById("editEndTime").value,
      color: document.getElementById("editColor").value,
    };
    const scheduleRef = doc(db, "storages", storageID, "weeklySchedules", id);

    updateDoc(scheduleRef, scheduleData).then(() => {
      closeModals();
      renderWeek(currentDate);
    });
  }

  function deleteSchedule(id) {
    const scheduleRef = doc(db, "storages", storageID, "weeklySchedules", id);
    deleteDoc(scheduleRef).then(() => {
      closeModals();
      renderWeek(currentDate);
    });
  }

  document.getElementById("saveAddSchedule").addEventListener("click", () => {
    const date = document.getElementById("addModalDate").value;
    const title = document.getElementById("addTitle").value;
    const startTime = document.getElementById("addStartTime").value;
    const endTime = document.getElementById("addEndTime").value;
    const color = document.getElementById("addColor").value;

    addDoc(weeklySchedulesRef, {
      date, title, startTime, endTime, color,
    }).then(() => {
      closeModals();
      renderWeek(currentDate);
    });
  });

  function closeModals() {
    document.getElementById("addScheduleModal").style.display = "none";
    document.getElementById("editScheduleModal").style.display = "none";
  }

  document.getElementById("prevWeekBtn").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 7);
    renderWeek(currentDate);
    renderGoals();
  });

  document.getElementById("nextWeekBtn").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 7);
    renderWeek(currentDate);
    renderGoals();
  });

  // 모달 닫기 버튼 이벤트 연결
  document.querySelector(".add-close").addEventListener("click", () => {
    document.getElementById("addScheduleModal").style.display = "none";
  });

  document.querySelector(".edit-close").addEventListener("click", () => {
    document.getElementById("editScheduleModal").style.display = "none";
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    const addModal = document.getElementById("addScheduleModal");
    const editModal = document.getElementById("editScheduleModal");
    if (event.target === addModal) addModal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
  });

  renderWeek(currentDate);
  renderGoals();
});
