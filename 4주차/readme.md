# 📝 4주차 개발일지 (03.26~04.01)

> #### ✅ 목표
> 📌 개인 Workspace(자신 계정 공간) 구현 & 저장소 생성
> #### ✅ 추가 목표
> 📌 로그인 한 사용자 정보 표시 및 수정 기능 추가 <br>
> 📌 로그아웃 기능 추가 <br>
> 📌 저장소 삭제 및 수정 기능 추가


## Firebase Storage 시작 및 설정

프로필 이미지 등록 및 변경 하려면 storage필요

### **✅ 1. Firebase Storage 시작**

- storage가 유료라서 구글 무료 버전 가입 → storage에서 시작하기 버튼이 생성
<p align="center">  
     <img src="https://github.com/user-attachments/assets/825ea629-0bd7-4dc1-8fef-98536944a040" align="center" width="49%">  
     <img src="https://github.com/user-attachments/assets/7df128be-9687-42d3-a65d-b4b4dce13fda" align="center" width="49%">
</p>
<p align="center">  
     <img src="https://github.com/user-attachments/assets/732765e0-1a20-4a68-a64f-8a25382fcbcc" align="center" width="49%">  
     <img src="https://github.com/user-attachments/assets/1c55c6aa-f7cd-4bcf-94f9-dd635e16e1a9" align="center" width="49%">
</p>
<p align="left">  
     <img src="https://github.com/user-attachments/assets/2754b17d-3fad-41ea-8494-c57881d9ac28" align="center" width="50%"> 
</p>

### **✅ 2. Firebase Storage 설정**

- auth가 있는 경우에만 read/write허용가능 하도록 설정 변경
<p align="center">  
     <img src="https://github.com/user-attachments/assets/cca7c444-746f-49da-aba4-aa3960c168d1" align="center" width="49%">  
     <img src="https://github.com/user-attachments/assets/21a06af8-1a33-4cbc-b8a9-f0b6880d7179" align="center" width="49%">
</p>

## 로그인 한 사용자의 정보 표시

로그인한 사용자의 정보(닉네임, 프로필 이미지) 표시

### **✅ 1.** 이메일, 비밀번호 로그인 경우 : 닉네임은 회원가입시 닉네임, 프로필은 기본 이미지

![Image](https://github.com/user-attachments/assets/384823c4-d01d-45c0-8169-b7699acf23d9)

### **✅ 2.** 구글 로그인 경우 : 닉네임 및 프로필 이미지 모두 구글 계정 닉네임과 이미지

![Image](https://github.com/user-attachments/assets/636cd288-c3b5-4175-8e97-dbbe9cafcd9c)

## 프로필 이미지, 닉네임 변경 기능 구현 + 로그아웃 구현

### **✅ 1. 개인 정보 미니 창**

- 프로필 이미지 클릭시 작은 프로필 이미지, 닉네임, 계정에 대한 정보와 로그아웃 버튼이 있는 창 구현

  ![Image](https://github.com/user-attachments/assets/037ae0f9-a74c-4765-8e95-624c1b1d7390)

### **✅ 2. 프로필 이미지 변경 기능**

- 창안에 작은 프로필 이미지 클릭시 로컬에서 이미지 업로드 가능

   ![Image](https://github.com/user-attachments/assets/20a56bbb-3944-4ae6-affb-507cfd041445)
    
- 열기 한 뒤 잠시 로딩 시간 후 기존 프로필과 작은 프로필 모두 변경

  ![Image](https://github.com/user-attachments/assets/cd163972-8384-4f67-85d0-b94ceb60d162)

### **✅ 2. 닉네임 변경 기능**

- 닉네임 보이는 부분을 입력 창으로 하여 원래 닉네임을 지우고 원하는 닉네임 작성

  ![Image](https://github.com/user-attachments/assets/1844972f-f11b-406a-a029-25d13956f860)
    
- 닉네임 변경 하고 일정 로딩 시간 후 메인 타이틀 닉네임 변경

   ![Image](https://github.com/user-attachments/assets/6f8eb2b3-e41d-4652-972d-c47a7144331e)

### **✅ 3. 로그아웃 기능**

- 로그아웃 버튼 클릭 시 로그아웃 후 로그인 페이지로 이동
<p align="center">  
     <img src="https://github.com/user-attachments/assets/7c6cfa10-688f-4594-8d40-8a433f99a859" align="center" width="43%">  
     <img src="https://github.com/user-attachments/assets/c1b90129-5bf9-48bd-b416-cd639ee7cf6a" align="center" width="56%">
</p>

### **✅ 4. 문제 발생 및 해결**

문제 발생 : **이메일 로그인**을 했을경우 127.0.0.1 도메인에서는 정상적으로 닉네임과 이미지가 로드됨 <br>
**하지만 localhost 도메인에서는 구글계정 닉네임과 이미지가 로드되는 문제**
  
  - 개발자 모드(F12) → storage → local storage를 보면서 로그인, 로그아웃 실행 하면서 문제 원인 찾기
    
      - 127.0.0.1 도메인에서는 local storage에 닉네임과 이미지 값이 저장되어 있지 않음
        
      - localhost 도메인에서는 구글계정의 닉네임과 이미지 값이 저장되어 있음
        
      - firebase에서 구글 로그인을 구현하기 위해서는 도메인이 있어야 해서 localhost에서만 로그인이 가능함 <br>
      → 이를 통해 구글 로그인 코드에 문제 있다는 것을 발견

  - 코드 파악 및 수정
    
      - local storage에 정보를 저장하는 코드가 있어서 구글 계정 정보가 localhost 도메인에서 변경되지 않고 유지됨
        
      - Firebase Auth에서 로그인 정보를 관리하니까 굳이 Local Storage에 직접 저장하지 않아도 자동으로 갱신됨 따라서 관련 코드 삭제
        
      - 관련 코드 삭제 함으로써 닉네임 변경 시 새로고침을 하면 변경된 닉네임이 유지되지 않음 <br>
          → 닉네임 변경 코드에서 local storage에 저장하여 새로고침을 해도 유지되도록 변경
