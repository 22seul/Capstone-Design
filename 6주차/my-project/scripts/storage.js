// storage_record.js
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// 🔹 URL에서 저장소 ID 가져오기
function getStorageIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const storageId = getStorageIdFromURL();
if (!storageId) {
  alert("잘못된 접근입니다. 저장소 ID가 없습니다.");
  throw new Error("저장소 ID 없음");
}
console.log("현재 storageId:", storageId);

// 🔹 저장소 이름과 기간 표시
async function loadStorageInfo() {
  const docRef = doc(db, "storages", storageId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.querySelector(".storage-title").textContent = data.name;
    document.querySelector(".storage-period").textContent = `기간: ${data.start} ~ ${data.end}`;
  }
}

// 🔹 초기화
document.addEventListener("DOMContentLoaded", () => {
  loadStorageInfo();
  
  const recordTitle = document.getElementById("record-title");
  const scheduleTitle = document.getElementById("schedule-title");
  
  // 기록공간 타이틀 클릭 시
  if (recordTitle) {
    recordTitle.addEventListener("click", () => {
      window.location.href = `record.html?id=${storageId}`;
    });
  }

  // 일정관리공간 타이틀 클릭 시
  if (scheduleTitle) {
    scheduleTitle.addEventListener("click", () => {
      window.location.href = `schedule.html?id=${storageId}`;
    });
  }
});

