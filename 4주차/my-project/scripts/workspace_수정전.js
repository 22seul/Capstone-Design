import { auth } from "./firebase.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
//storage
import { storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-storage.js";


document.getElementById("profile-img").addEventListener("click", () => {
    document.getElementById("profile-menu").classList.toggle("show");
});

// 사용자 정보 가져와 업데이트
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // ✅ 닉네임 & 프로필 이미지 가져오기 (localStorage 우선 사용)
        const savedNickname = user.displayName || "사용자";
        const savedProfileImage = user.photoURL || "assets/profile.png";
        console.log(`로그인 유지됨: ${user.email}, 닉네임: ${user.displayName}`);

        document.getElementById("nickname-placeholder").textContent = savedNickname;
        document.getElementById("profile-img").src = savedProfileImage;
        document.getElementById("nickname").value = savedNickname;
        document.getElementById("email").textContent = user.email;
        document.getElementById("menu-profile-img").src = savedProfileImage;
    } else {
        window.location.href = "login.html";
    }
});


// 닉네임 변경 이벤트
document.getElementById("nickname").addEventListener("change", async (e) => {
    const newNickname = e.target.value;
    try {
        await updateProfile(auth.currentUser, { displayName: newNickname });
        await auth.currentUser.reload(); // ✅ 사용자 정보 새로고침

        // ✅ 새로고침 없이 닉네임 즉시 업데이트
        document.getElementById("nickname-placeholder").textContent = auth.currentUser.displayName;
        document.getElementById("nickname").value = auth.currentUser.displayName;
        // ✅ 새로고침해도 유지되도록 localstorage에 저장
        localStorage.setItem("nickname", newNickname);
        console.log("닉네임 변경 완료");
    } catch (error) {
        console.error("닉네임 변경 실패:", error);
    }
});


// 프로필 이미지 변경
document.getElementById("menu-profile-img").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    
    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
            try {
                await uploadBytes(storageRef, file);
                const newPhotoURL = await getDownloadURL(storageRef);

                // ✅ Firebase에 프로필 사진 업데이트
                await updateProfile(auth.currentUser, { photoURL: newPhotoURL });

                // ✅ 변경된 이미지 localStorage에 저장 (새로고침해도 유지됨)
                localStorage.setItem("profileImage", newPhotoURL);

                // ✅ 화면 업데이트
                document.getElementById("profile-img").src = newPhotoURL;
                document.getElementById("menu-profile-img").src = newPhotoURL;
                
                console.log("프로필 이미지 변경 완료!");
            } catch (error) {
                console.error("프로필 이미지 업로드 실패:", error);
            }
        }
    });
    
    input.click();
});


// 로그아웃 기능
document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("로그아웃 실패:", error);
    });
});


// 저장소 데이터 (임시)
let storages = {};


// 모달 열기
document.querySelector('.add-btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'flex';
});

// 모달 닫기
document.getElementById('close-modal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

// 저장소 추가
document.getElementById('save-storage').addEventListener('click', () => {
    let name = document.getElementById('storage-name').value;
    let start = document.getElementById('storage-start').value;
    let end = document.getElementById('storage-end').value;

    if (!name || !start || !end) {
        alert("모든 값을 입력해주세요!");
        return;
    }

    // 기간에서 연도만 추출
    let year = new Date(start).getFullYear();

    // 저장소 그룹화
    if (!storages[year]) {
        storages[year] = [];
    }
    storages[year].push({ name, start, end });

    // UI 업데이트
    updateStorageUI();

    // 모달 닫기
    document.querySelector('.modal').style.display = 'none';

    // 입력 필드 초기화
    document.getElementById('storage-name').value = '';
    document.getElementById('storage-start').value = '';
    document.getElementById('storage-end').value = '';
});

// 저장소 목록 업데이트
function updateStorageUI() {
    let storageList = document.querySelector('.storages');
    let storageContainer = document.querySelector('.storage-container'); // 메인 화면 카드 추가
    storageList.innerHTML = '';
    storageContainer.innerHTML = ''; // 기존 카드 초기화

    Object.keys(storages).forEach(year => {
        // 연도 그룹 (사이드바)
        let yearGroup = document.createElement('div');
        yearGroup.className = 'year-group';
        yearGroup.innerHTML = `<div>📅 ${year}년도</div>`;
        
        let ul = document.createElement('ul');
        storages[year].forEach(storage => {
            let li = document.createElement('li');
            li.textContent = `📌 ${storage.name}`;
            ul.appendChild(li);

            // 📌 메인 화면 카드 추가
            let card = document.createElement('div');
            card.className = 'storage-card';
            card.innerHTML = `
                <h4>${storage.name}</h4>
                <p>${storage.start} ~ ${storage.end}</p>
            `;
            storageContainer.appendChild(card);
        });

        yearGroup.appendChild(ul);
        storageList.appendChild(yearGroup);

        // 연도별 토글 기능
        yearGroup.addEventListener('click', function() {
            ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
        });
    });
}

function addStorageCard(title, startDate) {
    let storageContainer = document.querySelector('.storage-container');
    let newCard = document.createElement('div');
    
    newCard.classList.add('storage-card');
    newCard.dataset.start = startDate; // 시작 날짜를 dataset에 저장
    newCard.innerHTML = `<h3>${title}</h3><p>${startDate}</p>`;

    // 저장소 목록에 추가 후 정렬
    storageContainer.appendChild(newCard);
    sortStorageByDate();
}


// Firestore에서 저장소 목록 불러오기
function loadStorages(userId) {
    const q = query(
        collection(db, "storages"),
        where("createdBy", "==", userId),
        orderBy("start", "desc"),
        orderBy("end","desc")
    );

    onSnapshot(q, (snapshot) => {
        const storageContainer = document.querySelector('.storage-container');
        const storageList = document.querySelector('.storages');
        storageContainer.innerHTML = '';
        storageList.innerHTML = '';

        let yearGroups = {};
        snapshot.forEach((doc) => {
            const data = doc.data();

            let card = document.createElement('div');
            card.className = 'storage-card';
            card.innerHTML = `<h4>${data.name}</h4><p>${data.start} ~ ${data.end}</p>`;
            card.appendChild(createEditButton(doc.id, data));
            card.appendChild(createDeleteButton(doc.id));
            storageContainer.appendChild(card);

            let year = new Date(data.start).getFullYear();
            if (!yearGroups[year]) {
                let yearGroup = document.createElement('div');
                yearGroup.className = 'year-group';
                yearGroup.dataset.year = year;
                yearGroup.innerHTML = `<div>📅 ${year}년도</div><ul></ul>`;
                storageList.appendChild(yearGroup);
                yearGroups[year] = yearGroup.querySelector("ul");
            }
            let ul = yearGroups[year];
            let li = document.createElement('li');
            li.textContent = `📌 ${data.name}`;
            ul.appendChild(li);
        });
    });
}