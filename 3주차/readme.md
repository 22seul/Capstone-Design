# 📝 3주차 개발일지 (03.19~03.25)

> #### ✅ **목표:** Firebase Authentication을 이용해 로그인 및 회원가입 기능 구현
> #### ✅ **추가 목표:** 로그인/회원가입 UI 및 UX 개선


## **Firebase 설정 & 프로젝트 연동**

### **✅ 1. Firebase 프로젝트 생성**

1. Firebase Console에 접속

   ![Image](https://github.com/user-attachments/assets/e5463779-39c1-468f-b3be-5a9b4ebb18b4)
    
2. **새 프로젝트 만들기** 클릭
    
   ![Image](https://github.com/user-attachments/assets/48b87ff0-926b-49c3-bb35-5d7431f9c418)
    
3. 프로젝트 이름 입력 (PlannerApp)
    
   ![Image](https://github.com/user-attachments/assets/a80563fe-be7b-46cd-b870-2386c356770b)

   ![Image](https://github.com/user-attachments/assets/abc96fc6-2c4e-47cb-bf09-3f7f159fe95c)
    
5. Google 애널리틱스 설정 (굳이 안 써도 되니까 "설정 안 함" 선택 가능)
    
   ![Image](https://github.com/user-attachments/assets/56c94286-9585-4e5b-a8d5-9e397345b812)
    
6. 프로젝트 생성 완료되면 Firebase 대시보드로 이동
    
   ![Image](https://github.com/user-attachments/assets/f44e27c9-df82-41c7-816b-66b301caa64c)
   ![Image](https://github.com/user-attachments/assets/8d59e244-754a-4b7b-bfa4-6554403d6089)

### **✅ 2. 웹 앱에 Firebase 추가**

1. Firebase 대시보드에서 `</>` 아이콘(웹 앱 추가) 클릭
    
    ![Image](https://github.com/user-attachments/assets/d3736694-3e16-4e28-ae3f-72400acc6374)
    
2. 앱 이름 입력 (planner-web)
    
    ![Image](https://github.com/user-attachments/assets/3c9b6bd6-c519-4a89-a179-e1de7949aadf)
    
3. **호스팅 설정은 건너뛰고** Firebase 설정 코드 복사, <script> 선택
    
    ![Image](https://github.com/user-attachments/assets/3311ffd4-95b8-4215-b351-1e439cb72795)
    - 나중에 react로 프로젝트 업그레이드 할 경우 npm 사용으로 변경할 예정

4. Firebase SDK 설치
    
    웹 프로젝트에서 firebase를 사용하려면 SDK를 추가해야 함
    - CDN방식 선택(index.html 파일에 복사한 코드 붙여넣기)
        - 테스트를 위해 index.html 파일에 복붙, 코드 분리 예정
        
        ```html
        <script type="module">
                // Firebase SDK 가져오기
                import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
                import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
        
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
                const analytics = getAnalytics(app);
        
                // 초기화 확인
                console.log("Firebase 초기화 완료!")
            </script>
        ```
        
        ![Image](https://github.com/user-attachments/assets/e966e5de-fa2c-44d0-bc3f-6107d8988704)
      ![Image](https://github.com/user-attachments/assets/0a8e9fc1-4ec4-483d-a15b-fa4462489a8a)

### **✅ 3. Firebase Authentication 활성화**

1. Firebase 콘솔에서 `Authentication` → `로그인 방법` 탭 이동
    
   ![Image](https://github.com/user-attachments/assets/7a662070-1b91-446b-b81f-1d5e93b055b3)
   ![Image](https://github.com/user-attachments/assets/b3d5e2bc-67d6-4c24-b69d-b61c9c2e2e1d)
   ![Image](https://github.com/user-attachments/assets/dd0b6704-cd8a-4313-b1b6-befaa141cf5d)
    
2. **이메일/비밀번호 로그인 활성화**
    - "설정" 버튼 클릭 → "사용 설정"
    ![Image](https://github.com/user-attachments/assets/6bf072f2-5cbe-4423-878b-9bd3becf48f8)
    
3. **Google 로그인 활성화**
    - "설정" 버튼 클릭 → "사용 설정"
    - 지원 이메일 입력 후 저장
    ![Image](https://github.com/user-attachments/assets/8da1f856-98ec-4f81-bea5-f881a073037a)
    ![Image](https://github.com/user-attachments/assets/c76cdd95-5fc6-493f-ac7f-3f44545004e4)

## **이메일/비밀번호 로그인 구현**

### **✅ 1. Firebase 설정을 `firebase.js`로 분리하기**

1. scripts 폴더에 **`firebase.js`** 파일을 생성
2. index.html에 있던 firebase 설정 코드를 `firebase.js`에 추가, index.html에선 삭제
3. 다른 파일에서 firebase인증 모듈을 가져와서 사용하기 위한 코드 추가 **`export { auth };`**

```jsx
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
```

![Image](https://github.com/user-attachments/assets/1e5860b0-0056-4bb4-94e1-7cb709165dfd)
firebase.js로 분리하기

### **✅ 2. firebase 적용한 로그인 기능 구현**

기존 **`auth.js`** 코드는 테스트용 회원가입/로그인 로직만 포함되어 있었는데 이를 Firebase Authentication을 적용하여 실제 로그인/회원가입 가능하도록 수정 및 로그인 유지 상태 기능 추가.

1. **회원가입 기능**
    - 기존: 단순 콘솔 출력 및 `alert()`
    - 변경: Firebase `createUserWithEmailAndPassword()` 사용하여 실제 회원가입 처리
2. **로그인 기능**
    - 기존: 단순 이메일/비밀번호 검증 (`if` 문 사용)
    - 변경: Firebase `signInWithEmailAndPassword()` 사용하여 실제 로그인 처리
3. **로그인 유지 (`onAuthStateChanged`) 기능 추가**
    - 로그인한 사용자가 유지되도록 Firebase 상태 감지 기능 추가
4. login.html, signup.html 코드에서 auth연결 코드에 `*type*="module"` 추가
    
    ```html
    <script type="module" src="scripts/auth.js"></script>
    ```
    
![Image](https://github.com/user-attachments/assets/a410134d-4c63-41f2-af3b-479021da6988)
이전에 테스트용 계정은 회원가입이 되어있지 않아 로그인 실패

![Image](https://github.com/user-attachments/assets/15de4906-072b-4c73-ab92-0fe80602337c)
이메일, 비밀번호 입력 후 회원가입 버튼 누르면 회원가입 성공

![Image](https://github.com/user-attachments/assets/40b8dc0e-3e24-4ab0-9100-b81aa0adfce7)
회원가입 성공하면 Authentication 콘솔창에 사용자가 추가됨

![Image](https://github.com/user-attachments/assets/acbb38f5-7571-461d-9c0b-b6e3440c52da)
회원가입 후 로그인 하면 로그인 성공

![Image](https://github.com/user-attachments/assets/ada07873-4e72-4fc2-a4e3-43c26485f4d8)
같은 이메일과 비번으로 회원가입 시도하면 회원가입 실패

## **기본적인 오류 처리 & UI 연결**

### ✅ 1. **회원가입 시 예외 처리**
워크스페이스에서 사용하기 위한 닉네임 입력 부분 추가

1. **닉네임 길이 검사 →** 2자 미만이면 `닉네임은 최소 2자 이상이어야 합니다.` 메시지 표시
    ![Image](https://github.com/user-attachments/assets/de1170ce-0432-4026-9eb0-2736b13c2a8b)
    

2. **이메일 형식 검사** → 잘못된 형식이면 `올바른 이메일 형식을 입력하세요!` 메시지 표시
    ![Image](https://github.com/user-attachments/assets/5179986b-1868-4a97-8477-e00b4665dba5)
    

3. **비밀번호 길이 검사** → 6자 미만이면 `비밀번호는 최소 6자 이상이어야 합니다.` 메시지 표시
    ![Image](https://github.com/user-attachments/assets/2c753dbc-8463-4266-84ef-c670177aef63)
    

4. **이메일 중복 검사** → `이미 사용 중인 이메일입니다.` 오류 메시지 표시
    ![Image](https://github.com/user-attachments/assets/6974a5a3-00ee-49f9-96dc-372d833e8e06)
    
### ✅ 2. **로그인 시 예외 처리**

 - **잘못된 이메일 또는 비밀번호 입력 시** → `이메일 또는 비밀번호가 잘못되었습니다.`

![Image](https://github.com/user-attachments/assets/a43f3f35-5fa9-49b8-9ceb-0a26f52aade8)
이메일 잘못 입력

![Image](https://github.com/user-attachments/assets/552e5d18-6082-4d07-a3ea-11c2e38d2d24)
비밀번호 잘못 입력

### ✅ 3. **기존 `alert()` 메시지 대신 HTML 요소에 오류 표시**

- `<p id="signup-error"></p>`
- `<p id="login-error"></p>`
- `textContent`로 메시지를 표시해 사용자 경험 개선

### ✅ 4. 워크스페이스에 닉네임 표시

![Image](https://github.com/user-attachments/assets/1b7234d1-7e36-40b9-a0d9-89e1c1fe7aea)
회원가입 성공

![Image](https://github.com/user-attachments/assets/0f71220f-3190-4d32-9b14-0f8c736e2cfb)
로그인 성공

![Image](https://github.com/user-attachments/assets/40b4b143-5235-4408-93c4-e5a8028e844c)
회원가입시 설정한 닉네임으로 워크스페이스 타이틀 작성됨

## 구글 로그인 추가

### ✅ 1. 로그인 페이지에 구글 간편 로그인 버튼 추가

- 구글 로그인 버튼 추가 + 구글 로고 이미지 (assets/google-logo.png) 추가
    
    ```html
    <button id="google-login">
        <img src="assets/google-logo.png" alt="Google Logo">
        Google 간편로그인
    </button>
    ```
    ![Image](https://github.com/user-attachments/assets/dbc5efa2-5f1b-4fa1-a3b6-b562dd41087e)

### ✅ 2. 구글 로그인 기능 추가

1. 처음 로그인하면 **자동으로 회원가입** 처리 (Firebase Auth가 알아서 함)

![Image](https://github.com/user-attachments/assets/7bf2a912-a676-42b1-9c75-6df3b8655ac0)
버튼 클릭 시 팝업창 자동으로나옴

![Image](https://github.com/user-attachments/assets/bbe5a4ce-09ba-4fab-8e7b-9125aca3143c)
사용 계정이 없다면 직접 입력해서 회원 가입 가능

2. 이후부터는 구글 로그인 클릭 시 로딩 후 **자동 로그인**
    ![Image](https://github.com/user-attachments/assets/dddb5422-3bc6-425b-8456-3d660e852698)
    
3. **닉네임은 구글 계정 이름으로 설정**
    ![Image](https://github.com/user-attachments/assets/f3c7809a-1163-4dd7-bdf3-dc2a1cbaec01)

## **UI 개선 & UX 보완**

### ✅ 1. **입력 필드와 버튼 간격 조정**

- 로그인 페이지와 회원가입 페이지로 이동해도 간격과 전체 크기를 유사하도록 수정
    ![Image](https://github.com/user-attachments/assets/34f5f996-6384-4b8b-96ae-e3362a6391d6)
    ![Image](https://github.com/user-attachments/assets/f8c46090-8a08-4d8f-a7da-2056780290b2)

- %를 활용해 반응형으로 다른 기기에서도 간격이 너무 붙지 않도록 유지
    ![Image](https://github.com/user-attachments/assets/642c0b48-e473-4d53-b289-1d08d173abc3)
    ![Image](https://github.com/user-attachments/assets/496a834c-6570-4aec-a0a1-acc592173276)
    ![Image](https://github.com/user-attachments/assets/8f582ba0-fb53-4dd9-9a53-367675e04413)

### ✅ 2. **회원가입 페이지의 "로그인" 링크 가독성 개선**

- 색상, 굵기, 밑줄 등의 css코드를 작성
- 사용자의 클릭을 유도할 수 있도록 텍스트 앞에 링크를 의미하는 이모지를 추가
    ![Image](https://github.com/user-attachments/assets/34df8c47-6646-455c-b331-84458dbd9bee)
    ![Image](https://github.com/user-attachments/assets/2a043205-6fc2-49a2-a2ba-227a2fa90dbd)

### ✅ 3. 로그인 **페이지에서 회원가입 페이지로의 이동 수정**

- 회원가입 페이지와 유사하도록 기존에 사용하던 회원가입 페이지로 이동하는 버튼을  a태그로 변경
    ![Image](https://github.com/user-attachments/assets/06a3f931-4bb4-45bd-b3ed-2616a5b613b4)

### ✅ 4. 비밀번호 보이기/숨기기 기능 추가

- 기존에 비밀번호 입력한 것은 볼 수 없었는데, 오타나 자신의 비밀번호를 확실히 하기 위해 볼 수 있는 기능의 필요성을 인식
- 비밀번호 입력창 오른쪽에 위치한 이모지 클릭으로 비밀번호 보이기/숨기기 변경이 가능
    ![Image](https://github.com/user-attachments/assets/6c84f2cc-abc9-47ac-8616-cbbc48481be3)
    ![Image](https://github.com/user-attachments/assets/eb826552-5978-47aa-b2dc-5b8ef16ae6a0)

