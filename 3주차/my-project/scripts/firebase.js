// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js"; // ✅ getAuth 추가

const firebaseConfig = {
  apiKey: "AIzaSyDqmRySPoF8HcWXBaMSjqCnvSNubsDlhQk",
  authDomain: "plannerapp-f1959.firebaseapp.com",
  projectId: "plannerapp-f1959",
  storageBucket: "plannerapp-f1959.firebasestorage.app",
  messagingSenderId: "66867017672",
  appId: "1:66867017672:web:aae4f9a42e0a0029b132fd",
  measurementId: "G-SGD2LVY8N2"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// ✅ Authentication 모듈 가져오기
const auth = getAuth(app);

// Firebase 모듈을 내보내기 (다른 파일에서 import 가능)
export { auth };
