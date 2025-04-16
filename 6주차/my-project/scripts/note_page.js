import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// 이미지 리사이즈 모듈 등록
import ImageResize from 'https://cdn.skypack.dev/quill-image-resize-module@3.0.0';
Quill.register('modules/imageResize', ImageResize);

// 툴바 설정
const toolbarOptions = [
  [{ font: [] }],
  [{ header:  [1, 2, 3, 4, 5, 6, false] }], // Heading 1~6 추가
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote'],
  ['link', 'image'],
  ['clean']
];

let quill;
let saveTimeout;

// URL에서 storageId, subjectId, noteId 추출
const params = new URLSearchParams(location.search);
const storageId = params.get("storageId");
const subjectId = params.get("subjectId");
const noteId = params.get("noteId");

if (!storageId || !subjectId || !noteId) {
  alert("잘못된 접근입니다.");
  throw new Error("필수 파라미터 없음");
}

const titleEl = document.getElementById("note-title");
const saveStatusEl = document.getElementById("save-status");
const editorContainer = document.getElementById("editor-container");
const imageUpload = document.getElementById("image-upload");

// Quill 초기화
function initializeEditor(content = "") {
  quill = new Quill(editorContainer, {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      imageResize: {} // 이미지 리사이즈 기능
    },
    placeholder: '여기에 노트를 작성하세요...'
  });

  // 저장된 HTML 삽입
  setTimeout(() => {
    quill.clipboard.dangerouslyPasteHTML(content || '');
  }, 0);

  quill.on('text-change', () => {
    saveStatusEl.textContent = "저장 중...";
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveNote, 1000);
  });

  // 이미지 삽입 핸들러
  quill.getModule('toolbar').addHandler('image', () => {
    imageUpload.click();
    imageUpload.onchange = () => {
      const file = imageUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', base64Image);
        };
        reader.readAsDataURL(file);
      }
    };
  });
}

// 노트 로드
async function loadNote() {
  const noteRef = doc(db, "storages", storageId, "subjects", subjectId, "notes", noteId);
  const noteSnap = await getDoc(noteRef);

  if (noteSnap.exists()) {
    const data = noteSnap.data();
    titleEl.textContent = data.title || "제목 없음";
    initializeEditor(data.content || "");
  } else {
    alert("노트를 불러올 수 없습니다.");
  }
}

// 자동 저장
async function saveNote() {
  const content = quill.root.innerHTML;
  const noteRef = doc(db, "storages", storageId, "subjects", subjectId, "notes", noteId);
  await updateDoc(noteRef, {
    content,
    updatedAt: serverTimestamp()
  });
  saveStatusEl.textContent = "저장됨";
}

// 제목 클릭 → 수정 모드 전환
titleEl.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = titleEl.textContent;
  input.className = "note-title-input";
  titleEl.replaceWith(input);
  input.focus();

  input.addEventListener("blur", async () => {
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== titleEl.textContent) {
      await updateDoc(doc(db, "storages", storageId, "subjects", subjectId, "notes", noteId), {
        title: newTitle
      });
      titleEl.textContent = newTitle;
    }
    input.replaceWith(titleEl);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
  });
});

// 시작
loadNote();
