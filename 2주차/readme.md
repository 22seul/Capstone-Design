# 📝 2주차 개발일지

## 목표 : 프로젝트 기본 구조 설계 (HTML/CSS 기본 레이아웃)

- 메인 페이지 UI 구현
- 로그인 페이지 UI 구현
- 회원가입 페이지 UI구현
- workspace 기본 구조 구현

## 프로젝트 디렉토리 구조 정리 (1주차 개발)

![Image](https://github.com/user-attachments/assets/ab4243be-eefb-4be8-ac68-5f6f390f77d5)

- index.html (메인 페이지)
- login.html (로그인 페이지)
- signup.html (회원가입 페이지)
- workspace.html (로그인 후 개인 workspace 페이지)
- assets/ (이미지, 아이콘 저장 폴더)
    - main_cat.jpg (메인 페이지에 삽입되는 고양이 이미지)
    - profile.png (workspace 페이지에 삽입되는 프로필 이미지)
- scripts/ (JavaScript 저장 폴더)
    - auth.js (로그인, 회원가입, 로그아웃 등의 인증(Authentication) ****관련 코드)
    - workspace.js (workspace 페이지 동적 기능 코드)
- styles/ (CSS 저장 폴더)
    - main.css (메인 페이지 스타일)
    - login.css (로그인 페이지 스타일)
    - signup.css (회원가입 페이지 스타일)
    - workspace.css (workspace 페이지 스타일)

## 개발 진행

### 1. 메인 페이지 UI 구현

![Image](https://github.com/user-attachments/assets/e8255a65-f018-4cb8-a582-bd7d0fc163f5)

- 레이아웃 구성 (이미지, 설명, 버튼 배치)
- 반응형 디자인 고려
- 심플한 디자인을 보완할 애니메이션 스타일 적용
- 시작하기 버튼 추가
- 시작하기 버튼 클릭 시 로그인 페이지로 이동

### 2. 로그인 페이지 UI 구현

![Image](https://github.com/user-attachments/assets/b25aa84c-34e2-4c50-ba75-c90b3519a851)
![Image](https://github.com/user-attachments/assets/ab6e262f-2944-48b0-b231-78fd902ee8a7)

- 로그인 폼 디자인 (이메일, 비밀번호 입력 필드 추가)
- Firebase Authentication을 고려한 폼 구조 적용
- 계정 없을경우 회원가입 페이지로 이동
- 로그인 성공하면 workspace 페이지로 이동
- workspace페이지로 이동 테스트 로그인 구현

### 3. 회원가입 페이지 UI 구현

![Image](https://github.com/user-attachments/assets/dfae04d2-3f24-4b60-8ef2-5b7a5ecc6529)

- 회원가입 폼 디자인 (이메일, 비밀번호 입력 필드 추가)
- 로그인 폼 디자인과 동일하게 구성
- 계정이 있는경우 로그인 페이지로 이동
- 추후 firebase를 활용해 로그인, 회원가입 기능 구현할 예정

### 4. Workspace 기본 구조 제작

![Image](https://github.com/user-attachments/assets/af94a8b5-2c27-44ab-b55c-d1ef53d2000c)
![Image](https://github.com/user-attachments/assets/d73b50cb-193b-42a2-8a09-a070fb134561)
![Image](https://github.com/user-attachments/assets/9b1be403-42dc-40ac-b6f2-79400e71b69e)

- 로그인 후 진입할 workspace(메인 화면) 페이지 구성
- 저장소 추가 후 저장소 카드가 들어갈 자리 배치
- 저장소 추가 버튼, 모달 구현
- 사이드 바 (프로필 사진 + 저장소 목록)
- 추후 firebase를 활용해 새로고침 해도 저장소가 사라지지 않도록 구현 필요함

### 5. CSS 스타일링 및 반응형 적용

<p align="center">  
  <img src="https://github.com/user-attachments/assets/3609611a-2140-4a37-b155-6598543afaa9" align="center" width="24%">  
  <img src="https://github.com/user-attachments/assets/0fc28122-dffa-4eaa-aa89-9c433d0e31ae" align="center" width="23%">
  <img src="https://github.com/user-attachments/assets/388d3aca-2f9c-4918-bdb1-95607254c395" align="center" width="51%">
</p>

<p align="center">  
  <img src="https://github.com/user-attachments/assets/d7b8fa7f-9830-45a5-8ab6-c8eb4f63e050" align="center" width="23%">  
  <img src="https://github.com/user-attachments/assets/e84e0b01-9d73-415a-8870-17b581e98f3f" align="center" width="24%">
  <img src="https://github.com/user-attachments/assets/2099a219-8a5d-44f2-a24e-8e20ab5eb7b0" align="center" width="51%">
</p>

- 메인, 로그인, 회원가입, workspace 페이지 스타일링
- 다양한 화면 크기에 대응할 수 있도록 반응형 디자인 적용 (메인, 로그인, 회원가입)
- 추후 workspace페이지 기능 구현 마치면 반응형 디자인 적용 예정
