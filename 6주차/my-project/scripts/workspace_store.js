import { auth, db } from "./firebase.js";
import { collection, addDoc, deleteDoc, updateDoc, doc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firestore에 저장소 추가
async function addStorage(name, start, end) {
    try {
        if (!auth.currentUser) {
            throw new Error("사용자가 로그인되어 있지 않습니다.");
        }
        await addDoc(collection(db, "storages"), {
            name,
            start,
            end,
            createdAt: new Date(),
            createdBy: auth.currentUser.uid
        });
    } catch (error) {
        console.error("저장소 추가 실패:", error);
    }
}

// Firestore에서 저장소 수정
async function editStorage(storageId, newName, newStart, newEnd) {
    try {
        await updateDoc(doc(db, "storages", storageId), {
            name: newName,
            start: newStart,
            end: newEnd
        });
    } catch (error) {
        console.error("수정 실패:", error);
    }
}

// Firestore에서 저장소 삭제
async function deleteStorage(storageId) {
    if (confirm("이 저장소를 삭제할까요?")) {
        try {
            await deleteDoc(doc(db, "storages", storageId));
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    }
}

// 삭제 버튼 생성
function createDeleteButton(docId) {
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ 삭제";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();  // 👈 클릭 이벤트 전파 차단
        deleteStorage(docId);
    });
    return deleteBtn;
}

// 수정 버튼 생성
function createEditButton(docId, data) {
    let editBtn = document.createElement("button");
    editBtn.textContent = "⚙️ 수정";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();  // 👈 클릭 이벤트 전파 차단
        let newName = prompt("새 저장소 이름", data.name);
        let newStart = prompt("새 시작 날짜", data.start);
        let newEnd = prompt("새 종료 날짜", data.end);
        if (newName && newStart && newEnd) {
            editStorage(docId, newName, newStart, newEnd);
        }
    });
    return editBtn;
}

// 사용자 로그인 상태 감지 후 데이터 로드
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("로그인된 사용자:", user.uid);
        loadStorages(user.uid);
    } else {
        console.error("사용자가 로그인되지 않았습니다.");
    }
});

// Firestore에서 저장소 목록 불러오기
function loadStorages(userId) {
    const q = query(
        collection(db, "storages"),
        where("createdBy", "==", userId),
        orderBy("start", "desc"),
        orderBy("end", "desc")
    );

    onSnapshot(q, (snapshot) => {
        const storageContainer = document.querySelector('.storage-container');
        const storageList = document.querySelector('.storages');
        storageContainer.innerHTML = '';
        storageList.innerHTML = '';

        let yearGroups = {};
        snapshot.forEach((doc) => {
            const data = doc.data();
            let storageId = doc.id;

            // 저장소 카드 생성 (메인 페이지용)
            let card = document.createElement('div');
            card.className = 'storage-card';
            card.innerHTML = `<h4>${data.name}</h4><p>${data.start} ~ ${data.end}</p>`;
            card.appendChild(createEditButton(storageId, data));
            card.appendChild(createDeleteButton(storageId));
            card.addEventListener("click", () => {
                window.location.href = `storage.html?id=${storageId}`;
            });
            storageContainer.appendChild(card);

            // 연도별 그룹화 (사이드바)
            let year = new Date(data.start).getFullYear();
            if (!yearGroups[year]) {
                let yearGroup = document.createElement('div');
                yearGroup.className = 'year-group';
                yearGroup.dataset.year = year;
                yearGroup.innerHTML = `<div class="year-header">📅 ${year}년도</div><ul class="storage-list hidden"></ul>`;
                storageList.appendChild(yearGroup);
                yearGroups[year] = yearGroup.querySelector(".storage-list");

                // 연도 클릭 시 목록 토글
                yearGroup.querySelector(".year-header").addEventListener("click", () => {
                    yearGroups[year].classList.toggle("hidden");
                });
            }

            // 저장소 목록 추가 (사이드바)
            let ul = yearGroups[year];
            let li = document.createElement('li');
            li.textContent = `📌 ${data.name}`;
            li.addEventListener("click", () => {
                window.location.href = `storage.html?id=${storageId}`;
            });
            ul.appendChild(li);
        });
    });
}

// 저장소 추가 모달 이벤트
const modal = document.querySelector('.modal');
document.querySelector('.add-btn').addEventListener('click', () => modal.style.display = 'flex');
document.getElementById('close-modal').addEventListener('click', () => modal.style.display = 'none');

document.getElementById('save-storage').addEventListener('click', async () => {
    let name = document.getElementById('storage-name').value;
    let start = document.getElementById('storage-start').value;
    let end = document.getElementById('storage-end').value;

    if (!name || !start || !end) {
        alert("모든 값을 입력해주세요!");
        return;
    }

    await addStorage(name, start, end);
    modal.style.display = 'none';
    document.getElementById('storage-name').value = '';
    document.getElementById('storage-start').value = '';
    document.getElementById('storage-end').value = '';
});
