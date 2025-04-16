// storage.js
import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

// 🔹 DOM 요소
const subjectInput = document.getElementById("subject-name");
const attributeInput = document.getElementById("attribute-input");
const attributeDatalist = document.getElementById("attribute-select");
const addBtn = document.getElementById("add-subject");
const groupContainer = document.querySelector(".subject-group-container");

// 🔹 속성과 그룹 정보 저장용
const attributes = new Set();
const groupedSubjects = {};

// 🔹 속성 선택창 업데이트
function updateAttributeDatalist() {
  attributeDatalist.innerHTML = "";
  [...attributes].forEach(attr => {
    const option = document.createElement("option");
    option.value = attr;
    attributeDatalist.appendChild(option);
  });
}

// 🔹 과목 카드 생성 함수 (편집/삭제 기능 포함)
function createCard(subjectName, attribute, docId) {
  const card = document.createElement("div");
  card.className = "subject-card";

  const nameSpan = document.createElement("span");
  nameSpan.textContent = subjectName;

  const editBtn = document.createElement("button");
  editBtn.textContent = "⚙️";
  editBtn.className = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete";

  // 카드 클릭 시 과목 페이지로 이동
  card.addEventListener("click", (e) => {
    // 버튼이나 입력 요소 클릭 시에는 이동 방지
    if (
      e.target.closest("button") ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName === "SELECT"
    ) {
      return;
    }
    window.location.href = `subject_page.html?storageId=${storageId}&subjectId=${docId}&from=record`;
  });

  // 편집 버튼
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    card.classList.add("editing");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = subjectName;
    nameInput.id = "subject-name-input"; 

    const attrInput = document.createElement("input");
    attrInput.type = "text";
    attrInput.value = attribute;
    attrInput.id = "attribute-input";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "💾";

    card.innerHTML = "";
    card.appendChild(nameInput);
    card.appendChild(attrInput);
    card.appendChild(saveBtn);

    // 🔹 편집된 과목 저장 후 페이지 리디렉션
    saveBtn.addEventListener("click", async () => {
      card.classList.remove("editing");

      const newName = nameInput.value.trim();
      const newAttr = attrInput.value.trim();

      if (!newName || !newAttr) {
        alert("과목명과 속성을 모두 입력해주세요.");
        return;
      }

      try {
        const subjectDocRef = doc(db, "storages", storageId, "subjects", docId);
        await updateDoc(subjectDocRef, {
          name: newName,
          attribute: newAttr,
        });

        // 기존 카드 내용 업데이트
        nameSpan.textContent = newName;
        nameSpan.value = newName;
        attrInput.value = newAttr;

        // 새 속성 처리
        attributes.add(newAttr);
        updateAttributeDatalist();

        // 그룹 처리
        const newGroup = ensureAttributeGroup(newAttr);
        const newCard = createCard(newName, newAttr, docId);

        // 새로운 속성 그룹에 카드 추가
        newGroup.appendChild(newCard);

        // 기존 그룹에서 카드 제거 (그룹 비었으면 삭제)
        const oldGroup = groupedSubjects[attribute];
        if (oldGroup && oldGroup.children.length === 0) {
          const wrapper = oldGroup.parentElement;
          wrapper.remove();
          delete groupedSubjects[attribute];
          attributes.delete(attribute);
        }

        // 페이지 리디렉션: "from" 파라미터로 기록공간에서 수정된 것인지 확인
        // 현재 페이지의 경로를 확인
        const currentPage = window.location.pathname;

        // 저장소 페이지에서 수정한 경우: 저장소 페이지로 리디렉션
        if (currentPage.includes('storage.html')) {
          window.location.href = `storage.html?id=${storageId}`;
        } 
        // 기록공간 페이지에서 수정한 경우: 기록공간 페이지로 리디렉션
        else if (currentPage.includes('record.html')) {
          window.location.href = `record.html?id=${storageId}`;
        }
      } catch (error) {
        console.error("업데이트 실패:", error);
        alert("업데이트 중 오류가 발생했습니다.");
      }
    });

  });

  // 삭제 버튼
  deleteBtn.addEventListener("click", async (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    if (!confirm("정말로 이 과목을 삭제하시겠습니까?")) return;

    try {
      const subjectDocRef = doc(db, "storages", storageId, "subjects", docId);
      await deleteDoc(subjectDocRef);
      card.remove();

      // 그룹이 비었으면 삭제
      const group = groupedSubjects[attribute];
      if (group && group.children.length === 0) {
        const wrapper = group.parentElement;
        wrapper.remove();
        delete groupedSubjects[attribute];
        attributes.delete(attribute);
        updateAttributeDatalist();
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  });

  card.appendChild(nameSpan);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);

  return card;
}

// 🔹 속성 그룹 생성
function ensureAttributeGroup(attribute) {
  if (groupedSubjects[attribute]) return groupedSubjects[attribute];

  const wrapper = document.createElement("div");
  wrapper.className = "attribute-group";

  const header = document.createElement("h4");
  header.className = "toggle-header";
  header.textContent = `▼ ${attribute}`;

  const list = document.createElement("div");
  list.className = "subject-list";
  list.style.display = "grid";

  header.addEventListener("click", () => {
    list.style.display = list.style.display === "none" ? "grid" : "none";
    if (list.style.display === "none") header.textContent = `▶ ${attribute}`;
    else header.textContent = `▼ ${attribute}`;
  });

  wrapper.appendChild(header);
  wrapper.appendChild(list);
  groupContainer.appendChild(wrapper);

  groupedSubjects[attribute] = list;
  return list;
}

// 🔹 과목 추가
async function addSubject() {
  const name = subjectInput.value.trim();
  const attr = attributeInput.value.trim();
  
  if (!name || !attr) {
    alert("과목명과 속성을 모두 입력해주세요.");
    return;
  }

  try {
    const newDoc = await addDoc(collection(db, "storages", storageId, "subjects"), {
      name,
      attribute: attr,
      createdAt: new Date()
    });

    const docId = newDoc.id;

    attributes.add(attr);
    updateAttributeDatalist();

    const group = ensureAttributeGroup(attr);
    const card = createCard(name, attr, docId);
    group.appendChild(card);

    subjectInput.value = "";
    attributeInput.value = "";
  } catch (error) {
    console.error("과목 추가 실패:", error);
    alert("과목 추가에 실패했습니다.");
  }
}

// 🔹 Firestore에서 과목 불러오기
async function loadSubjects() {
  const subjectRef = collection(db, "storages", storageId, "subjects");

  // 속성 오름차순, 등록시간 오름차순 정렬 (복합 색인 필요)
  const subjectQuery = query(
    subjectRef,
    orderBy("attribute", "asc"),   // 속성 기준 오름차순
    orderBy("createdAt", "asc")    // 등록시간 기준 오름차순
  );

  const snapshot = await getDocs(subjectQuery);

  snapshot.forEach(docSnap => {
    const { name, attribute } = docSnap.data();
    const docId = docSnap.id;

    attributes.add(attribute);
    const group = ensureAttributeGroup(attribute);
    const card = createCard(name, attribute, docId);
    group.appendChild(card);
  });

  updateAttributeDatalist();
}

// 🔹 초기화
document.addEventListener("DOMContentLoaded", () => {
  loadSubjects();
  addBtn.addEventListener("click", addSubject);
});
