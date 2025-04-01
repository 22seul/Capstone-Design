import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// 현재 URL에서 저장소 ID 가져오기
function getStorageIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // id 값을 가져옴
}

// Firestore에서 해당 저장소 정보 불러오기
async function loadStorageDetails() {
    const storageId = getStorageIdFromURL();
    if (!storageId) {
        console.error("잘못된 접근입니다. 저장소 ID가 없습니다.");
        return;
    }

    try {
        const docRef = doc(db, "storages", storageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.querySelector('.storage-title').textContent = data.name;
            document.querySelector('.storage-period').textContent = `${data.start} ~ ${data.end}`;
        } else {
            console.error("해당 저장소가 존재하지 않습니다.");
        }
    } catch (error) {
        console.error("저장소 불러오기 실패:", error);
    }
}

// 페이지 로드 시 데이터 불러오기
document.addEventListener("DOMContentLoaded", loadStorageDetails);
