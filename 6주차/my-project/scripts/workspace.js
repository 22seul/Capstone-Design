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
