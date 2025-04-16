import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

function getStorageIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const storageId = getStorageIdFromURL();
if (!storageId) {
  alert("잘못된 접근입니다. 저장소 ID가 없습니다.");
  throw new Error("저장소 ID 없음");
}

const scheduleTableBody = document.getElementById("schedule-table-body");
const addBtn = document.getElementById("add-schedule-btn");
const titleInput = document.getElementById("schedule-name");
const dateInput = document.getElementById("schedule-date");
const filterSelect = document.getElementById("filter-select");
const toggleBtn = document.getElementById("toggle-schedule-btn");

let allSchedules = [];
let isExpanded = false;

function extractAttributeAndTitle(text) {
  const match = text.match(/^\[(.+?)\]\s*(.+)$/);
  if (match) {
    return { attribute: match[1], title: match[2] };
  } else {
    return { attribute: "기타", title: text };
  }
}

async function addSchedule() {
  const rawText = titleInput.value.trim();
  const date = dateInput.value;
  if (!rawText || !date) {
    alert("일정 제목과 날짜를 입력해주세요.");
    return;
  }

  const { attribute, title } = extractAttributeAndTitle(rawText);

  try {
    await addDoc(collection(db, "storages", storageId, "schedules"), {
      title,
      date,
      completed: false,
      attribute,
      createdAt: Timestamp.now()
    });

    titleInput.value = "";
    dateInput.value = "";
    await loadSchedules();
  } catch (e) {
    console.error("일정 추가 실패:", e);
    alert("일정 추가에 실패했습니다.");
  }
}

async function deleteSchedule(id) {
  try {
    await deleteDoc(doc(db, "storages", storageId, "schedules", id));
    await loadSchedules();
  } catch (e) {
    console.error("일정 삭제 실패:", e);
    alert("일정 삭제에 실패했습니다.");
  }
}

async function toggleCompletion(id, newState) {
  try {
    const scheduleRef = doc(db, "storages", storageId, "schedules", id);
    await updateDoc(scheduleRef, { completed: newState });
    await loadSchedules();
  } catch (e) {
    console.error("완료 상태 변경 실패:", e);
    alert("완료 상태 업데이트 실패");
  }
}

async function updateField(id, field, value) {
  try {
    const scheduleRef = doc(db, "storages", storageId, "schedules", id);
    await updateDoc(scheduleRef, { [field]: value });
    await loadSchedules();
  } catch (e) {
    console.error(`${field} 수정 실패:`, e);
  }
}

function createEditableCell(text, field, id) {
  const td = document.createElement("td");
  td.textContent = text;

  td.addEventListener("click", () => {
    td.contentEditable = true;
    td.focus();

    const saveAndExit = () => {
      td.contentEditable = false;
      const newValue = td.textContent.trim();
      updateField(id, field, newValue);
    };

    td.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveAndExit();
        td.blur();
      }
    }, { once: true });

    td.addEventListener("blur", saveAndExit, { once: true });
  });

  return td;
}

function renderScheduleItem({ id, title, date, completed, attribute }) {
  const row = document.createElement("tr");

  const attrTd = createEditableCell(attribute, "attribute", id);
  const titleTd = createEditableCell(title, "title", id);
  const dateTd = createEditableCell(date, "date", id);

  if (completed) titleTd.classList.add("schedule-completed");

  const checkTd = document.createElement("td");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = completed;
  checkBox.addEventListener("change", () => toggleCompletion(id, checkBox.checked));
  checkTd.appendChild(checkBox);

  const deleteTd = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.addEventListener("click", () => deleteSchedule(id));
  deleteTd.appendChild(delBtn);

  row.appendChild(attrTd);
  row.appendChild(titleTd);
  row.appendChild(dateTd);
  row.appendChild(checkTd);
  row.appendChild(deleteTd);

  scheduleTableBody.appendChild(row);
}

function renderScheduleList(filteredAttr = "all") {
  scheduleTableBody.innerHTML = "";

  const filteredSchedules = allSchedules.filter(item =>
    filteredAttr === "all" || item.attribute === filteredAttr
  );

  const displayCount = isExpanded ? filteredSchedules.length : 15;
  const schedulesToRender = filteredSchedules.slice(0, displayCount);

  schedulesToRender.forEach(renderScheduleItem);

  if (filteredSchedules.length > 15) {
    toggleBtn.style.display = "block";
    toggleBtn.textContent = isExpanded ? "숨기기" : "더 보기";
  } else {
    toggleBtn.style.display = "none";
  }
}

toggleBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;
  renderScheduleList(filterSelect.value);
});

function updateFilterOptions() {
  const attributes = new Set(allSchedules.map(item => item.attribute));
  filterSelect.innerHTML = '<option value="all">전체 보기</option>';
  attributes.forEach(attr => {
    const option = document.createElement("option");
    option.value = attr;
    option.textContent = attr;
    filterSelect.appendChild(option);
  });
}

async function loadSchedules() {
  const scheduleRef = collection(db, "storages", storageId, "schedules");
  const q = query(scheduleRef);  // 쿼리에서 정렬은 하지 않고 JS에서 정렬함
  const snapshot = await getDocs(q);

  allSchedules = [];
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    allSchedules.push({
      id: docSnap.id,
      title: data.title,
      date: data.date,
      completed: data.completed || false,
      attribute: data.attribute || "기타",
      createdAt: data.createdAt?.toDate?.() || new Date() // Timestamp → Date 변환
    });
  });

  // ✅ 정렬: 완료 → 날짜 → 등록순
  allSchedules.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed; // 미완료(false) 우선
    }
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date); // 날짜 오름차순
    }
    return a.createdAt - b.createdAt; // 등록일 오름차순
  });

  updateFilterOptions();
  renderScheduleList(filterSelect.value);
}

document.addEventListener("DOMContentLoaded", () => {
  loadSchedules();
  addBtn.addEventListener("click", addSchedule);
  filterSelect.addEventListener("change", () => {
    isExpanded = false;
    renderScheduleList(filterSelect.value);
  });
});
