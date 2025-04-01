import { auth } from "./firebase.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile, 
    onAuthStateChanged,
    //구글
    GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// ✅ 비밀번호 보기 기능
document.addEventListener("DOMContentLoaded", function () {
    const toggleIcons = document.querySelectorAll(".toggle-password");

    toggleIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const passwordInput = this.previousElementSibling; // 아이콘 앞의 input 선택
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        });
    });
});

// ✅ 이메일 형식 검사 함수
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
}

// ✅ 회원가입 처리
document.getElementById("signup-form")?.addEventListener("submit", async function(event) {
    event.preventDefault(); // 기본 제출 방지

    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let nickname = document.getElementById("signup-nickname").value;  // 닉네임 입력값 가져오기
    let errorMsg = document.getElementById("signup-error");  // 오류 메시지 표시용

    errorMsg.textContent = ""; // 기존 오류 메시지 초기화

    // 예외 처리
    
    if (nickname.length < 2) {
        errorMsg.textContent = "닉네임은 최소 2자 이상이어야 합니다.";
        return;
    }
    if (!isValidEmail(email)) {
        errorMsg.textContent = "올바른 이메일 형식을 입력하세요!";
        return;
    }
    if (password.length < 6) {
        errorMsg.textContent = "비밀번호는 최소 6자 이상이어야 합니다.";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ 닉네임 설정
        await updateProfile(user, {
            displayName: nickname
        });

        console.log("회원가입 성공:", userCredential.user);
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("회원가입 오류:", error.code, error.message);
        
        // Firebase 오류 메시지 처리
        if (error.code === "auth/email-already-in-use") {
            errorMsg.textContent = "이미 사용 중인 이메일입니다.";
        } else {
            errorMsg.textContent = "회원가입 실패: " + error.message;
        }
    }
});

// ✅ 로그인 처리
document.getElementById("login-form")?.addEventListener("submit", async function(event) {
    event.preventDefault(); //폼 제출 방지

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let errorMsg = document.getElementById("login-error");  // 오류 메시지 표시용

    errorMsg.textContent = ""; // 기존 오류 메시지 초기화

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("로그인 성공:", userCredential.user);

        alert("로그인 성공!" );
        window.location.href = "workspace.html"; //로그인 후 이동
    } catch (error) {
        console.error("로그인 오류:", error.code, error.message);

        // Firebase 오류 메시지 처리
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
                                                || error.code === "auth/invalid-credential") {
            errorMsg.textContent = "이메일 또는 비밀번호가 잘못되었습니다.";
        } else {
            errorMsg.textContent = "로그인 실패: " + error.message;
        }
    }
});


// ✅ 로그인 유지 상태 감지
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(`로그인 유지됨: ${user.email}, UID: ${user.uid}, 닉네임: ${user.displayName}`);

        // ✅ Local Storage에 저장된 데이터 갱신
        localStorage.setItem("nickname", user.displayName || "사용자");
        localStorage.setItem("profileImage", user.photoURL || "default-profile.png");

        // ✅ 프로필 정보 업데이트
        document.getElementById("profile-nickname").textContent = localStorage.getItem("nickname");
        document.getElementById("profile-image").src = localStorage.getItem("profileImage");

    } else {
        console.log("로그아웃됨");
        localStorage.clear();  // ✅ 로그아웃 시 Local Storage 초기화
    }
});


// ✅ Google 로그인 버튼 클릭 이벤트 추가
document.getElementById("google-login")?.addEventListener("click", async function () {
    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ 구글 로그인 성공:", user);

        alert("Google 로그인 성공!");
        window.location.href = "workspace.html"; // 워크스페이스로 이동
    } catch (error) {
        console.error("❌ 구글 로그인 실패:", error);
        alert("구글 로그인에 실패했습니다.");
    }
});
