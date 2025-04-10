# 📝 5주차 개발일지 (04.02~04.08)

> #### ✅ 목표
> 📌 기록 공간(카테고리별 관리) UI 및 데이터 연동
> #### ✅ 추가 목표
> 📌 지금까지 구현한 기능(~워크스페이스) 중간 점검 <br>
> 📌 저장소 페이지 구조 설계 <br>
> 📌 (기록공간 → 과목 → 노트) 이동 및 각각 페이지 구현

## 현재까지 구현한 기능 중간점검

### 🔐 로그인 기능 (Firebase Authentication)

- [x]  로그인 시 Firebase 사용자 인증 완료되는가?
- [x]  잘못된 비밀번호/이메일 입력 시 에러 메시지가 뜨는가?
- [x]  로그아웃 기능 정상 작동하는가?

### 🗂️ 저장소(Workspace) 생성 및 관리

- [x]  로그인한 사용자에 따라 다른 저장소 목록이 보이는가?
- [x]  저장소 생성 시 기간 설정이 정상적으로 저장되는가?
- [x]  저장소 생성 후 사이드바에 바로 반영되는가?
- [x]  저장소 클릭 시 해당 저장소로 이동하는가?
- [ ]  저장소 수정 및 삭제 시 DB 및 UI에서 제거되는가?
- [x]  저장소 연도별 그룹화가 잘 되는가?

### **✅ 저장소** 수정 및 삭제 기능 **문제 해결**

저번 개발에서는 발견하지 못한 문제점 발견

❌ 문제 : 저장소 카드 전체에 클릭 이벤트가 바인딩되어 있어 수정 및 삭제 버튼 클릭 시 페이지 이동이 먼저 발생하여 어떤 저장소는 기능이 정상작동하고 또 어떤 저장소는 기능이 작동하지 않음

⭕ 해결 : 버튼의 클릭 이벤트에 e.stopPropagation() 추가하여 상위 이벤트로의 전파 차단하여 수정 및 삭제 기능이 정상 작동 하며 저장소의 페이지로의 이동 문제까지 해결

## 저장소 페이지 구조 설계 및 구현 (storage.js)

### **✅ 1. 저장소 기본 정보 표시**

- 앞서 저장소를 추가할 때 설정한 저장소 이름과 기간을 불러와 표시

### **✅ 2. 구조 분할**

- 저장소의 기본 정보를 표시하는 섹션과 기록공간, 일정관리 구역을 나누어 페이지 구성
- 기록공간이라는 글꼴 클릭 시 기록공간 페이지로 이동
![Image](https://github.com/user-attachments/assets/bfa867ac-a0c9-40f0-b1c6-2e3d8859e642)

## 기록공간 페이지 구현 (storage_record.js)

과목이라고 지칭하지만 의도에 따라서 다르게 사용가능 <br>
(예시 : 일기 > 3월 일기, 4월일기 | 가계부 > 3월, 4월)

### **✅ 1. 과목 추가**

- 기록공간 기본 페이지
![Image](https://github.com/user-attachments/assets/2865615e-b2c3-4569-a390-ccd7fee0c48f)
    
- 과목명과 속성 입력 후 추가
![Image](https://github.com/user-attachments/assets/33e6b723-bd07-47a0-8611-8e53d7c81fae)
    
- 속성 그룹안에 과목이 배치 됨
![Image](https://github.com/user-attachments/assets/8ec8e030-21ed-4552-bfc1-be8c61815071)
    
- db에도 과목명, 속성이 잘 반영되어 추가됨
![Image](https://github.com/user-attachments/assets/a521715e-8ede-43a1-bef0-dba958d263a9)
    
- 사용된 속성들은 추후 사용할 때 선택 가능 <br>
  앞서 추가한 과목과 같은 속성의 과목 2개 다른 과목 속성의  과목 1개가 추가된 상황에서 새로운 과목을 추가하려고 입력하는 상황
![Image](https://github.com/user-attachments/assets/ed55799d-af2c-4c9a-a07e-a1a1d864d39a)
    
- 새로고침 클릭 시 속성의 오름차순, 과목 생성 날짜 오름차순 기준으로 정렬
![Image](https://github.com/user-attachments/assets/1e95bead-7dd5-40af-b699-b9a2288692d1)
    
- 속성부분을 토글 형식으로 클릭시 과목을 보이게 할 수도 안보이게 할 수도 있도록 함
![Image](https://github.com/user-attachments/assets/bff7fab6-ee94-4448-87aa-976afb7ef7a8)
    
- 페이지에서 추가한 5개의 과목들이 db에 저장 됨
![Image](https://github.com/user-attachments/assets/bf1a6698-6e02-494d-98b7-4497153f861c)
    

### **✅ 2. 과목 수정**

- 각 과목에 있는 수정 버튼 클릭으로 수정 가능
![Image](https://github.com/user-attachments/assets/4c8577c1-1e7b-4028-8e22-9f9fbeb6a160)
    
- 과목명과 속성 입력을 할 수 있는 부분에서 수정할 부분을 입력하고 저장버튼 클릭으로 변동사항 저장
![Image](https://github.com/user-attachments/assets/262c2701-81a5-4c82-8bfb-6e21c68d74e1)
    
- 저장버튼을 클릭하면 해당 페이지로 리디렉션되어서 사용하지 않았던 속성이라면 속성 그룹이 새로 생기고 정렬
![Image](https://github.com/user-attachments/assets/4abd6e12-8836-4802-9336-d1fe1a61b955)
    
- 이름과 속성을 수정 후 저장
![Image](https://github.com/user-attachments/assets/ccf188bc-6e3e-44bf-8459-fe17dcb73c86)
    
- 이미 있는 속성으로 수정한다면 속성 그룹에 정렬되고, 속성 그룹에 아무런 과목이 없다면 속성이 삭제됨
![Image](https://github.com/user-attachments/assets/e9140a69-6c2d-4e05-afca-50c43f788db9)
    
- 수정된 값들이 db에도 잘 반영됨
![Image](https://github.com/user-attachments/assets/59f44bf7-53c1-48f7-9a0c-1e1530e18572)
    

### **✅ 3. 과목 삭제**

- 수정 버튼 옆에 있는 삭제 버튼으로 삭제 가능
![Image](https://github.com/user-attachments/assets/d5b742ab-c80c-4f8a-8323-a7d50584b3b0)
    
- 실수로 눌렀는데 바로 삭제되는걸 방지하기 위해 삭제여부 재확인
![Image](https://github.com/user-attachments/assets/edf92eff-d281-4867-8431-b92cf12729c8)
    
- 삭제 되는 것을 확인 가능
![Image](https://github.com/user-attachments/assets/d2ac12bb-5441-449f-9ed4-5093e58dfc8d)
    
- 선택교양 속성에 있는 나머지 과목 삭제 후
![Image](https://github.com/user-attachments/assets/bb7016f2-20cc-4e71-8212-92a7b34f17d2)
    
- 삭제한 과목들이 db에서도 잘 반영되어 3개의 과목들이 남은것 확인 가능
![Image](https://github.com/user-attachments/assets/f8c3a6ae-e152-42d8-9d6b-8d3a8f3ffd2b)
    

## 저장소 페이지와 기록공간 페이지의 기능 공유

### ✅ 기록공간 기능의 재사용

저장소 페이지에서는 기록공간 페이지에서 구현된 **기록공간 관련 기능**을 **재사용**

- 기록공간 페이지(storage_record.js)에서 구현된 과목 카드 추가, 수정, 삭제 기능 등을 **저장소 페이지의 기록공간 부분**에서도 사용
- 기록공간 페이지와 저장소 페이지의 UI 구조를 유사하게 만들어, 동일한 JavaScript 코드로 두 페이지에서 동일한 기능 처리 가능
![Image](https://github.com/user-attachments/assets/2ae9eb85-b6d0-4b3e-bf36-57fc9566a4ce)
    

## 과목 페이지 구현

기록 공간 페이지 또는 저장소 페이지에서 과목 클릭시 과목 페이지로 이동 가능

### **✅** 1. 과목 이름 표시

- 저장된 과목 이름을 과목 페이지 상단에 표시하도록 설정, 과목 데이터가 로드되면 해당 이름이 UI에 반영
![Image](https://github.com/user-attachments/assets/bd3f8e9b-c284-4f3d-979f-80909e4e8a87)
    

### **✅ 2. 노트 추가**

- 노트 제목 입력과 과목 페이지에 표시될 노트 색상 선택 가능
![Image](https://github.com/user-attachments/assets/770ec3ef-7429-4bce-97de-916c230d5892)
    
- 노트 5개를 색상 별로 추가한 상태, 색상은 사이트와 어울리도록 회색들로 설정
![Image](https://github.com/user-attachments/assets/eaa41bdf-f2c2-4487-86d4-a4cef3aa0e8a)
    
- 추가한 노트들이 db에서도 잘 추가되어 있는 것 확인
![Image](https://github.com/user-attachments/assets/7b49cdda-e5a8-4a91-88c2-978609f2ad2b)
    

### **✅ 3. 노트 수정**

- 노트 제목 클릭 후 제목 수정 가능
![Image](https://github.com/user-attachments/assets/c717ccee-b286-4c82-9c5d-62e11c68ebdd)
    
- 노트 제목 수정되는 것 확인 가능
![Image](https://github.com/user-attachments/assets/67358b52-a563-4692-978b-879847ba7f47)
    
- 노트 제목이 수정된 것이 db에서도 잘 반영 되는 것을 확인
![Image](https://github.com/user-attachments/assets/9b620116-c711-4afc-bd0e-677a120bbf78)
    

### **✅ 4. 노트 삭제**

- 노트에 오른쪽 위쪽에 X를 클릭하여 삭제 가능
![Image](https://github.com/user-attachments/assets/f16b6f8d-f790-48d4-9cbc-6f92afced205)
    
- 실수로 삭제되는 것 방지하기 위해 삭제여부 재확인
![Image](https://github.com/user-attachments/assets/8de1ee0e-f2c7-47bf-9426-f8d8c2143187)
    
- 삭제 된 것 확인 가능
![Image](https://github.com/user-attachments/assets/4482c542-674c-421b-b720-4466bd4aad60)
    
- 삭제한 노트가 db에서도 잘 반영되어 4개의 노트들만 존재
![Image](https://github.com/user-attachments/assets/09491aa2-06a8-4bf7-8e0f-c29c243dcac3)
    

## 노트 페이지 구현

과목 페이지에서 노트 클릭시 노트 페이지로 이동 가능

### **✅** 1. 노트 제목 표시 및 수정

- 저장된 노트 제목을 노트 페이지 상단에 표시하도록 설정
![Image](https://github.com/user-attachments/assets/c284d7ec-9d91-4eb7-8b49-b33ff103fca4)
    
- 노트 제목 클릭시 노트 제목 변경 가능
![Image](https://github.com/user-attachments/assets/278084c9-2188-4bf7-a4a8-d43a4a180e88)
    
- 수정된 제목 확인 가능
![Image](https://github.com/user-attachments/assets/4e326c00-2862-4296-bd5e-498fa2f0027c)
    
- db에서도 수정된 제목 잘 반영됨
![Image](https://github.com/user-attachments/assets/52b6d0cd-2ab6-46aa-b29d-acd0bae44f97)
    

### **✅ 2. 자동 저장 기능 및 상태 표시**

- 사용자가 노트를 작성할 때마다 일정 간격으로 Firebase에 자동 저장
- 노트 제목 오른쪽에는 저장상태(저장중…, 저장됨)가 실시간으로 표시되어, 사용자가 저장 여부를 직관적으로 확인 가능
![Image](https://github.com/user-attachments/assets/b8478e2d-a9be-4dc2-a1a9-80fa466e194c)
![Image](https://github.com/user-attachments/assets/f5c28fba-d752-42ab-9101-b722aaaf8b26)
    

### **✅ 3. 필기 기능**

마크다운은 개발자나 사용했던 사람에게는 익숙하지만 다른 사람들에게는 불편할 수도 있다 생각해서 직관적으로 눈에 보이는 편집 WYSIWYG 방식으로 구현

- [1] font
![Image](https://github.com/user-attachments/assets/bcf459c3-25bd-4390-be74-76281c1b5083)
    
- [2] header
![Image](https://github.com/user-attachments/assets/f04d6bdf-114c-4ecc-bea2-f5961581b205)
    
- [3] bord, italic, underline, strike
![Image](https://github.com/user-attachments/assets/47a22a1f-30bd-4604-b9cb-4f913c5e871c)
    
- [4] color, background
![Image](https://github.com/user-attachments/assets/53f1d8fe-7619-4c79-8f2a-bef6456b887f)
    
- [5] align
![Image](https://github.com/user-attachments/assets/350de3e6-efd3-4f57-b599-9030ff302f81)
    
- [6] list: ordered, bullet
![Image](https://github.com/user-attachments/assets/2679d1c1-3f39-40e0-a701-3963acb71648)
    
- [7] blockquote
![Image](https://github.com/user-attachments/assets/6f44605d-1fa6-492a-bf51-6eddad2f8bf8)
    
- [8] link : url 저장한 뒤 클릭 시 방문 및 수정 삭제 가능
![Image](https://github.com/user-attachments/assets/00f53123-d84f-44c3-9f17-6e92f0096647)
![Image](https://github.com/user-attachments/assets/db3ca31c-9b35-4cc2-84e2-f15ae3e795d1)
    
- [9] image : 크기조절 및 align가능
![Image](https://github.com/user-attachments/assets/0bbccebd-f391-4f0a-9741-ed0404bb4833)
    
- [10] clean : 텍스트 설정 지우기
