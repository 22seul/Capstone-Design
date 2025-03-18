// 회원가입 처리
document.getElementById("signup-form")?.addEventListener("submit", function(event) {
    event.preventDefault();  // 기본 제출 방지

    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    // 테스트용 회원가입 (Firebase 적용 시 수정)
    console.log("회원가입 요청:", email, password);

    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    window.location.href = "login.html";
});


//로그인 처리
document.getElementById("signup-btn").addEventListener("click", function() {
    window.location.href = "signup.html";  // 회원가입 페이지 이동
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();  // 폼 제출 방지

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    // 간단한 테스트용 로그인 (추후 Firebase 적용 가능)
    if (email === "test@example.com" && password === "1234") { 
        alert("로그인 성공!");
        window.location.href = "workspace.html";  // 로그인 후 이동
    } else {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
});