# 📝 6주차 개발일지(04.09~04.15)

> ### ✅ 목표
> 📌 일정 관리 기능 개발 및 데이터 연동
> ### ✅ 추가 목표
> 📌 주간일정관리 페이지 구현 <br>
> 📌 월간일정관리 페이지 구현

## 일정관리공간 페이지 구현

### **✅ 1. 주간 및 월간 일정관리페이지 이동 (schedule.js)**

- 일정관리공간 기본 페이지
    ![Image](https://github.com/user-attachments/assets/03c9e987-2a9a-4e69-b2b8-dc9e9ff6f9a6)
    
- 주간 일정 버튼 클릭 → 주간일정관리 페이지로 이동
    ![Image](https://github.com/user-attachments/assets/264f3bfd-90ba-4604-8e66-fc29bc9e86ff)
    ![Image](https://github.com/user-attachments/assets/52ff34cf-061e-4efa-a1f6-0246d080864d)
    
- 월간 일정 버튼 클릭 → 월간일정관리 페이지로 이동
    ![Image](https://github.com/user-attachments/assets/2b85bb24-97a9-4e1b-b92b-4f6d48e69702)
    ![Image](https://github.com/user-attachments/assets/73d11be6-39a3-44a1-882d-58e706114d30)


### **✅ 2. 일정 추가 (storage_schedule.js : 투두리스트 기능들)**

- 속성과 함께 일정 제목, 날짜 입력 후 추가 버튼 클릭 → 일정 추가
    ![Image](https://github.com/user-attachments/assets/5b3b5670-50ed-422f-8e3f-7ea9461c0053)
    ![Image](https://github.com/user-attachments/assets/bdb6437b-1297-44d0-b17d-ecaa27dd0c02)
    
- db에 저장된 것 확인 가능 (저장소 → schedules → 일정)
    ![Image](https://github.com/user-attachments/assets/b6f58be1-ed13-487f-9b35-bca962ff5f58)
    
- 속성 없이 입력가능 → 속성 부분이 기타로 설정됨
    ![Image](https://github.com/user-attachments/assets/3cfcc730-f04e-42e3-8669-4550fe9fb2c7)
    

### **✅ 3. 일정 완료 기능**

- 체크박스 클릭되면 제목 디자인 수정되고,  db에서 completed true로 변경
    ![Image](https://github.com/user-attachments/assets/a007a1ec-5488-47e8-aace-9871704ad2cd)
    ![Image](https://github.com/user-attachments/assets/cc5645b3-fa56-4c2a-a996-ded285a80ede)
    

### **✅ 4. 일정 삭제 기능**

- 삭제 버튼 클릭시 바로 삭제됨 (일정에는 아래에 다른 문서들이 없기 때문에 재확인 없이 삭제)
    ![Image](https://github.com/user-attachments/assets/f3d87756-3727-46c5-9d09-68b711c85e87)
    
- UI에서도 바로 삭제 확인 가능
    ![Image](https://github.com/user-attachments/assets/c1145626-084c-46f3-814c-f35a9f623c50)
    
- db에서 삭제되어 4개의 일정 남은 것 확인 가능
    ![Image](https://github.com/user-attachments/assets/7c73c553-0726-44bd-87f7-4187f2394035)
    

### **✅ 5. 일정 수정 기능**

- 속성 클릭해서 속성 수정 가능
    ![Image](https://github.com/user-attachments/assets/4d220fed-643d-42f1-ae7c-3f8e66075364)
    
- 제목 수정
    ![Image](https://github.com/user-attachments/assets/bbb77391-7e1d-4592-987a-046e9183870e)
    
- 날짜 수정
    ![Image](https://github.com/user-attachments/assets/9ac6ed78-6fde-44e3-a0a6-1706bfdeaebe)
    
- db에 수정한 속성, 제목, 날짜가 반영된 것을 확인 가능
    ![Image](https://github.com/user-attachments/assets/b8542f88-2819-459c-a95e-0a35597d0126)
    

### **✅ 6. 일정 정렬 및 확인**

- 정렬 : 완료된 일정은 아래로 → 날짜 순 → 추가순
    ![Image](https://github.com/user-attachments/assets/408c230d-b990-47a7-8832-5070b6713317)

- 일정이 15개 이상으로 쌓이면 더보기 버튼이 생기고
더보기 버튼 클릭 시 모든 일정 확인 가능하며 다시 숨기기 버튼으로 15개만 확인 가능
    ![Image](https://github.com/user-attachments/assets/7b3d2d00-e631-4844-ba8d-43d29321fb02)
    ![Image](https://github.com/user-attachments/assets/85d1196a-27f0-4e64-9167-96d8851f9de0)

- 일정 추가할때 입력한 속성들을 클릭해서 해당 속성 일정만 확인 가능
    ![Image](https://github.com/user-attachments/assets/c1f3980a-d2bc-4ed7-93de-75a8a1285ecd)
    

## 저장소 페이지와 일정관리공간 페이지의 기능 공유

### ✅ 일정관리공간 기능의 재사용

저장소 페이지에서 일정관리공간 페이지에서 구현된 **투두리스트 기능**을 **재사용**

- 일정관리공간 페이지(storage_schedule.js)에서 구현된 일정 추가, 수정, 삭제, 및 속성별 확인 기능 등을 **저장소 페이지의 일정관리공간 부분**에서 사용
- 일정관리공간 페이지와 저장소 페이지의 UI 구조를 유사하게 만들어, 동일한 JavaScript 코드로 두 페이지에서 동일한 기능 처리 가능
    ![Image](https://github.com/user-attachments/assets/db43e122-b0ef-47ba-a4c5-a87b8e2a4ff8)
    

## 주간일정관리 페이지 구현

### ✅ 1. 주간일정관리 기능

- 주간일정관리 기본 페이지 : 주간일정을 관리할 수 있는 부분과 이번주 목표 부분을 7:3비율 정도로 나누어 관리
    ![Image](https://github.com/user-attachments/assets/b5d37e67-63ef-4a0a-8670-4b7bfcdfb6f0)
    
- 날짜 옆에 있는 + 버튼으로 해당 날짜에 대한 일정 추가
    ![Image](https://github.com/user-attachments/assets/e5fb60be-1719-4c3c-8ed6-8c9d9bdcead6)
    ![Image](https://github.com/user-attachments/assets/f0ff8c54-a787-4763-927e-5bf655383020)
    
- db에 저장된 것 확인 가능 (저장소 → weeklySchedules → 일정)
    ![Image](https://github.com/user-attachments/assets/f988d378-198b-4b5f-87d4-9d7dd34bbad0)
    
- 일정 클릭 시 수정 모달에서 일정 정보 수정가능
    ![Image](https://github.com/user-attachments/assets/b0c7bb2b-0461-46e4-85ad-1bc5033e198b)
    ![Image](https://github.com/user-attachments/assets/0f2c156f-814b-4e3e-941d-064e846caae4)
    ![Image](https://github.com/user-attachments/assets/889d3921-8050-4b18-b969-0a0ea3b1475a)
    
- 일정 수정 모달에서 삭제도 같이 가능
    ![Image](https://github.com/user-attachments/assets/5e03cc5e-3a94-4ea0-9cdb-732c4953b3b1)
    ![Image](https://github.com/user-attachments/assets/0030ca94-030e-4e95-ba2e-cc7eaab437a9)
    ![Image](https://github.com/user-attachments/assets/4226c800-1474-4c14-9f2d-00d406cb4abb)
    

### ✅ 2. 주간 목표 기능

- 목표 입력 후 추가 가능
    ![Image](https://github.com/user-attachments/assets/7396d775-9f3b-45a1-a6fb-772b12de07ba)
    ![Image](https://github.com/user-attachments/assets/f371cdd4-173c-4a34-a8f6-31578c9fe2bc)
    
- db에 저장된 것 확인 가능 (저장소 → weeklyGoals → 목표)
    ![Image](https://github.com/user-attachments/assets/1c280c4b-4573-4f37-84a6-f5fa07459ab3)
    
- 체크박스 클릭으로 완료 표시 가능, db에서 completed가 true로 변경됨
    ![Image](https://github.com/user-attachments/assets/146d5831-351f-4b68-a0c6-6f6bc5d45bf6)
    ![Image](https://github.com/user-attachments/assets/f350950c-8b61-422b-9420-7bf734cd0846)
    
- 삭제 버튼 클릭시 목표 바로 삭제 가능
    ![Image](https://github.com/user-attachments/assets/dc523145-710a-4473-b2c6-39229f2bf0d7)
    ![Image](https://github.com/user-attachments/assets/103cf45d-e18c-437c-ba03-66eb83281135)
    ![Image](https://github.com/user-attachments/assets/f4046e7d-3847-429f-abd0-8823fa0dc204)
    

## 월간일정관리 페이지 구현

저장소를 추가할때 설정한 기간에 맞춘 달 별 일정 관리

### ✅ 1. 월간일정관리 페이지 구조

- 월간일정관리 기본 페이지 : 저장소 기간에 맞춰 3월부터 6월까지 달별로 컨테이너로 구성
    ![Image](https://github.com/user-attachments/assets/9a91e21c-eb7f-4590-9cd5-7567c8932d4e)
    
- 컨테이너 부분을 클릭하면 달력 확인가능, 클릭한 것을 local에서 기억하여 새로고침 되어도 내가 클릭한 달을 유지할 수 있도록 함
    ![Image](https://github.com/user-attachments/assets/1c574541-9f38-4728-8d82-3146d841d5e7)
    

### ✅ 2. 일정 추가

- +버튼 클릭 시 추가 모달로 일정 정보 입력 후 버튼 클릭
    ![Image](https://github.com/user-attachments/assets/21360c35-425e-40d9-964b-a1f085194cb6)
    
- 달력에 일정 날짜에 맞게 추가됨
    ![Image](https://github.com/user-attachments/assets/75de4ba4-53a3-4707-a387-c5d246633a2b)
    
- db에 저장된 것 확인 가능 (저장소 → monthlySchedules → 일정)
    ![Image](https://github.com/user-attachments/assets/b569155a-d7ad-4e0a-aab2-228efeef7901)
    

### ✅ 3. 일정 수정 및 삭제

- 일정 클릭 시 수정 모달에서 일정 정보 수정 후 저장 버튼 클릭
    ![Image](https://github.com/user-attachments/assets/c502e36d-5fb4-4a86-84f4-fcfefe07a28b)
    ![Image](https://github.com/user-attachments/assets/069841df-3d7f-4e15-8d9d-70a9745d7bdd)
    ![Image](https://github.com/user-attachments/assets/431f1c87-a9ee-4698-a33d-75beb1f281e5)
    
- 수정과 동일하게 일정 클릭 후 모달의 삭제 버튼 클릭 → 삭제여부 재확인 후 삭제
    ![Image](https://github.com/user-attachments/assets/cc4fe02e-9791-4f03-92f2-82d1a04190fa)
    ![Image](https://github.com/user-attachments/assets/51a765c1-0e68-473d-9e83-2735258097b8)
    ![Image](https://github.com/user-attachments/assets/06dae190-3269-486d-96c3-2a2dff628c8f)
    ![Image](https://github.com/user-attachments/assets/ebc69b36-97bc-4273-8014-ac3f5fde84db)
