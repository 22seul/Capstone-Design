import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const params = new URLSearchParams(location.search);
const storageId = params.get("storageId");
const subjectId = params.get("subjectId");

if (!storageId || !subjectId) {
  alert("잘못된 접근입니다.");
  throw new Error("필수 파라미터 없음");
}

const subjectTitleEl = document.querySelector(".subject-title");
const noteTitleInput = document.getElementById("note-title");
const noteColorSelect = document.getElementById("note-color");
const addNoteBtn = document.getElementById("add-note");
const notesContainer = document.querySelector(".notes-container");

async function loadSubjectName() {
  const subjectRef = doc(db, "storages", storageId, "subjects", subjectId);
  const subjectSnap = await getDoc(subjectRef);
  if (subjectSnap.exists()) {
    subjectTitleEl.textContent = subjectSnap.data().name;
  } else {
    subjectTitleEl.textContent = "과목명 없음";
  }
}

async function loadNotes() {
  notesContainer.innerHTML = "";
  const notesRef = collection(db, "storages", storageId, "subjects", subjectId, "notes");
  const notesSnap = await getDocs(notesRef);
  notesSnap.forEach(docSnap => {
    const noteData = docSnap.data();
    const noteId = docSnap.id;
    const noteEl = createNoteCard(noteData, noteId);
    notesContainer.appendChild(noteEl);
  });
}

function createNoteCard(noteData, noteId) {
  const card = document.createElement("div");
  card.className = "note-card";
  card.style.backgroundColor = noteData.color || "#f5f5f5";

  const titleEl = document.createElement("div");
  titleEl.className = "note-title";
  titleEl.textContent = noteData.title;

  titleEl.addEventListener("click", e => {
    e.stopPropagation(); // 카드 클릭 막기

    const input = document.createElement("input");
    input.value = noteData.title;
    input.className = "note-title editing";
    titleEl.replaceWith(input);
    input.focus();

    input.addEventListener("blur", async () => {
      const newTitle = input.value.trim();
      if (newTitle && newTitle !== noteData.title) {
        await updateDoc(doc(db, "storages", storageId, "subjects", subjectId, "notes", noteId), { title: newTitle });
        noteData.title = newTitle;
      }
      const updatedTitle = document.createElement("div");
      updatedTitle.className = "note-title";
      updatedTitle.textContent = noteData.title;
      input.replaceWith(updatedTitle);
      updatedTitle.addEventListener("click", () => titleEl.click());
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
  });

  const dateEl = document.createElement("div");
  dateEl.className = "note-date";
  if (noteData.createdAt?.seconds) {
    const date = new Date(noteData.createdAt.seconds * 1000);
    dateEl.textContent = `${date.getFullYear()}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getDate().toString().padStart(2,'0')}`;
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "note-delete";
  deleteBtn.innerHTML = "×";
  deleteBtn.addEventListener("click", async e => {
    e.stopPropagation();
    const confirmed = confirm("정말로 이 노트를 삭제하시겠습니까?");
    if (confirmed) {
      await deleteDoc(doc(db, "storages", storageId, "subjects", subjectId, "notes", noteId));
      card.remove();
    }
  });

  card.appendChild(titleEl);
  card.appendChild(dateEl);
  card.appendChild(deleteBtn);

  // 클릭 시 상세 페이지로 이동
  card.addEventListener("click", () => {
    window.location.href = `note_page.html?storageId=${storageId}&subjectId=${subjectId}&noteId=${noteId}`;
  });

  return card;
}

addNoteBtn.addEventListener("click", async () => {
  const title = noteTitleInput.value.trim();
  const color = noteColorSelect.value;

  if (!title) {
    alert("노트 제목을 입력해주세요.");
    return;
  }

  try {
    const newNote = {
      title,
      color,
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, "storages", storageId, "subjects", subjectId, "notes"), newNote);
    const card = createNoteCard({ ...newNote, createdAt: Timestamp.now() }, docRef.id);
    notesContainer.appendChild(card);
    noteTitleInput.value = "";
  } catch (e) {
    console.error("노트 추가 실패:", e);
    alert("노트 추가 중 오류가 발생했습니다.");
  }
});

loadSubjectName();
loadNotes();
