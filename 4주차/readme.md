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

## Firebase Firestore 시작 및 설정

저장소 추가 기능을 위해 firestore 필요

### **✅ 1. 데이터 베이스 만들기**

![Image](https://github.com/user-attachments/assets/1f6a520c-e6bc-4f3b-adaf-1c17e8a00edb)

### **✅ 2. 위치 설정 : 서울**

![Image](https://github.com/user-attachments/assets/c0eb9a9f-f56e-4572-8ec1-f7c138251dde)

### **✅ 3. 보안규칙 설정: 테스트모드**

테스트 모드로 설정해야 localhost에서 firestore로 데이터 요청이 가능

![Image](https://github.com/user-attachments/assets/d1d6fc98-67c7-4d7b-89bf-348fa4882c18)
![Image](https://github.com/user-attachments/assets/62e3c3cd-2d46-434a-945a-fda48e2fea83)
![Image](https://github.com/user-attachments/assets/9ff5c167-9d55-4a33-8329-fb870b3611b4)

### **✅ 4. firebase.js코드 수정**

![Image](https://github.com/user-attachments/assets/dc36fb2c-3684-48f7-ba0a-72ca5159c8d2)

## **추가된 저장소 화면에 표시**

firestore에 저장된 저장소 목록들을 화면에 표시

### **✅ 1. 정렬 관련 코드 문제 발생 및 해결**

- 정렬 코드를 작성했으나 firestore에 색인이 없어 오류 발생
    
    ![Image](https://github.com/user-attachments/assets/ac8689ba-fee4-4220-8564-a4a57e5c104e)
    
- firestore에 색인을 추가하여 오류 해결
    
    ![Image](https://github.com/user-attachments/assets/508751cc-78ed-49e9-a4a1-1579299e93d7) 

### **✅ 2. 저장소 표시**

- 저장소의 기간을 기준으로 최신 순으로 정렬되어  표시
    
    ![Image](https://github.com/user-attachments/assets/4bf3d750-fe47-4bcc-9a9a-c106609b0304)

### **✅ 3. 저장소 목록 사이드바 표시**

- 저장소 목록이 사이드바에 년도별로 그룹화되어 표시, 년도를 클릭하면 해당년도 기간의 저장소 목록을 확인가능
    
    ![Image](https://github.com/user-attachments/assets/2ae77fa1-f7b0-451b-9a8b-070fe164d876)

## 저장소 추가 기능

### **✅ 1. 저장소 추가 버튼 클릭**

![Image](https://github.com/user-attachments/assets/61858ae5-e1f4-495c-be42-0b168f71bef1)

### **✅ 2. 저장소 정보 입력 및 추가**

- 저장소 이름 및 기간 입력 후 추가 (해당이미지는 3개의 저장소 추가후 4번째 저장소 추가하는 이미지)
    
    ![Image](https://github.com/user-attachments/assets/aef66d8f-589a-48dd-ad31-a67ecd274fc3)

### **✅ 3. 추가된 저장소 확인**

- 저장된 데이터를 실시간으로 workspace페이지에서 확인
    
    ![Image](https://github.com/user-attachments/assets/16b13fa3-14b6-45a5-aa26-701e8cbd4ff2)
    
- firebase에 데이터가 저장됨
    
    ![Image](https://github.com/user-attachments/assets/bf5085fd-220b-4059-ada2-dccbc018e889)  

## **저장소 수정 기능**

### **✅ 1. 저장소 수정 버튼 클릭**

- 행복한 2025년도가 되었으면이라는 저장소의 수정 버튼 클릭
    
    ![Image](https://github.com/user-attachments/assets/6f4421e1-467f-4f2b-bcb4-f4f56931c619) 

### **✅ 2. 수정할 정보 입력**

- 새 저장소 이름 입력 : 행복한 2025년도 보내자!!
    
    ![Image](https://github.com/user-attachments/assets/2cba155c-992b-4181-b4cc-1c16a44d598b)
    
- 새 시작 날짜입력 : 2025-03-04
    
    ![Image](https://github.com/user-attachments/assets/d10a5ed1-bdc3-4d37-90c6-cc699a91dffa)

- 새 종료 날짜 입력 : 2025-12-31
    
    ![Image](https://github.com/user-attachments/assets/6636cf7a-6b6a-4032-8679-baa9a24f12f5)

### **✅ 3. 수정된 저장소 확인**

- 수정된 데이터를 실시간으로 workspace페이지에서 확인
    
    ![Image](https://github.com/user-attachments/assets/97eaf7c4-7d52-47fa-b821-d395872b7e9f)

- firebase에 데이터가 수정됨 (필드 값이 수정된걸 확인가능)
    
    ![Image](https://github.com/user-attachments/assets/6267a44f-ebb8-4dc2-b912-2a41f8aa0fd8)
    
## **저장소 삭제 기능**

### **✅ 1. 저장소 삭제 버튼 클릭**

- 2026년도.. 저장소의 삭제 버튼 클릭
    
    ![Image](https://github.com/user-attachments/assets/159546b9-21c0-4d09-9a99-de0cb17c72e9)

### **✅ 2. 삭제 여부 재확인**

- 삭제 여부 재확인을 통해 실수로 버튼을 눌러 삭제하는 일 방지
    
    ![Image](https://github.com/user-attachments/assets/56869534-9ee4-47f9-bc6e-07f98d67b690)

### **✅ 3. 삭제된 저장소**

- 삭제된 데이터를 실시간으로 workspace페이지에서 확인가능
    
    ![Image](https://github.com/user-attachments/assets/f131b403-9507-447f-8a4f-f6e6274c43d9)

- firebase에 저장소가 삭제됨 (문서가 삭제되어 3개만 남은것 확인 가능)
    
    ![Image](https://github.com/user-attachments/assets/3683807b-4d0e-4690-8b49-47807fb5997f)
  
