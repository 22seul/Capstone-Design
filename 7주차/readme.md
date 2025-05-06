# 📝 7주차 개발일지(04.23~05.06)

### ✅ 목표

**📌 반응형 UI 적용 및 최종 테스트 및 배포**

### ✅ 추가 목표

**📌 기능별 점검 및 수정**

## 메인페이지, 로그인, 회원가입 점검

### 1. 메인 (index.html)

- [x]  메인페이지에서 로그인페이지로 이동이 원할?
    
    → index.html에서 시작하기 클릭시 login.html로 이동 원할
    

### 2. 로그인 기능 (login.html, auth.js)

- [x]  유효하지 않은 이메일 형식 입력 시 에러 메시지 출력
- [x]  이메일 또는 비밀번호 오류 시 에러 메시지 출력
- [x]  password 보기(돋보기 아이콘) 기능 작동
- [x]  로그인 성공 시 workspace.html로 리디렉션
- [x]  Google 로그인 버튼 클릭 시 Firebase 팝업 로그인 처리
- [x]  로그인 성공 시 Local Storage에 nickname, profileImage 저장
- [x]  로그인 유지 감지 (onAuthStateChanged) → 사용자 정보 출력 및 로컬스토리지 갱신

### 3. 회원가입 기능 (signup.html, auth.js)

- [x]  닉네임 2자 미만 입력 시 에러 메시지 출력
- [x]  유효하지 않은 이메일 형식 입력 시 에러 메시지 출력
- [x]  비밀번호 6자 미만 입력 시 에러 메시지 출력
- [x]  이미 사용 중인 이메일로 가입 시 에러 메시지 출력 (auth/email-already-in-use)
- [x]  회원가입 시 password 보기 토글 기능 작동
- [x]  회원가입 성공 후 login.html로 이동
- [x]  회원가입 성공 시 Firebase 사용자 등록

### 4. 사용자 경험 & UI (login.css, signup.css)

- [x]  입력창 focus 시 스타일 강조
- [x]  버튼 hover 시 부드러운 효과 적용
- [x]  에러 메시지 빨간색으로 명확하게 표시
- [x]  Google 로그인 버튼 스타일 커스터마이징 및 로고 적용

## 사용자 공간 (workspace) 점검

### 1. 사용자 접근 제어 (workspace.html, workspace_store.js)

- [x]  로그인한 사용자만 접근 가능 (onAuthStateChanged로 감지 후 미로그인 시 처리)
    
    → 미로그인시 로그인페이지(login.html)로 이동되어 처리됨
    
- [x]  로그인된 사용자 UID 기반으로 개인 저장소만 쿼리
- [x]  로그인 상태 감지 후 저장소 자동 로드
    
    → 이전에 생성했던 저장소들 자동 로드됨
    

### 2. 저장소 표시 및 동작 (workspace.html, workspace_store.js)

- **메인 화면 카드 목록**
    - [x]  실시간으로 Firestore의 저장소 목록 반영 (onSnapshot)
    - [x]  카드 형태로 .storage-container에 렌더링
    - [x]  카드 클릭 시 해당 저장소 상세 페이지(storage.html?id=...)로 이동
    - [x]  저장소 정보(이름, 시작일, 종료일) 표시
    - [x]  카드 내 수정(⚙️), 삭제(🗑️) 버튼 동작
- **저장소 수정**
    - [x]  ⚙️ 버튼 클릭 시 prompt 입력창 노출
    - [x]  수정 값 입력 후 Firestore 문서(name, start, end) 업데이트
    - [x]  수정 후 UI 자동 반영
- **저장소 삭제**
    - [x]  🗑️ 버튼 클릭 시 삭제 확인창 표시
    - [x]  확인 시 해당 저장소 문서 Firestore에서 삭제
    - [x]  삭제 후 UI 자동 반영

### 3. 사이드바 연도별 정리 (workspace_store.js)

- [x]  저장소 시작일 기준으로 연도 추출 및 그룹화
- [x]  연도별 그룹 내 .storage-list에 저장소 추가
- [x]  연도 헤더 클릭 시 해당 연도의 저장소 목록 토글
- [x]  사이드바 저장소 클릭 시 상세 페이지로 이동

### 4. 저장소 추가 모달 (workspace.html, workspace_store.js)

- [x]  "추가" 버튼 클릭 시 모달 창 열림
- [x]  모달에서 저장소 이름, 시작일, 종료일 입력
- [x]  모든 필드 입력 안될 경우 경고(alert) 표시
- [x]  저장 클릭 시 Firestore에 저장소 문서 생성 (createdBy, createdAt 포함)
- [x]  저장 후 모달 닫힘 및 입력값 초기화

### 5. 사용자 경험 & UI (workspace.html, workspace.css)

- [x]  저장소 카드 hover 시 시각적 효과 적용
- [x]  연도 그룹 토글 시 부드러운 애니메이션 또는 transition
- [x]  수정/삭제 버튼이 잘 보이고 동작 직관적
- [x]  모달 UI가 모바일 환경에서도 자연스럽게 렌더링됨
- [x]  input[type=date] 등을 통해 날짜 입력 용이성 확보

## 저장소 공간 점검

### 1. 저장소 기본 정보 표시 (storage.js)

- [x]  URL 쿼리스트링을 통해 저장소 ID 정상 추출
- [x]  Firebase에서 해당 저장소 정보(doc) 불러오기
- [x]  저장소 이름(.storage-title) 및 기간(.storage-period)에 정보 렌더링
- [x]  잘못된 접근(저장소 ID 없음) 시 alert 및 에러 처리

### 2. 기록공간 미리보기 UI (storage.html, storage.css)

- [x]  기록공간 입력 필드(과목명, 속성, 추가 버튼) 렌더링
- [x]  과목 카드를 속성별로 그룹화해 .subject-group-container에 표시
- [x]  카드 내 수정/삭제 버튼 시각적 구성
- [x]  ✏️ 기록공간 타이틀 클릭 시 record.html로 이동 처리 (?id=... 포함)

→ 본 저장소 페이지에서는 일부 인터랙션만 구현되며, 실제 기록 추가/수정/삭제 등의 기능은 record.html에서 수행됨.

### 3. 일정관리공간 미리보기 UI (storage.html, storage.css)

- [x]  일정 입력 필드(제목, 날짜, 추가 버튼) 구성
- [x]  속성별 필터링 드롭다운 렌더링
- [x]  일정 리스트 테이블 구조화 (.schedule-list > table)
- [x]  일정 완료(체크박스), 삭제 버튼 표시
- [x]  "더 보기" 버튼 존재 (기본 숨김 상태)
- [x]  📆 일정관리공간 타이틀 클릭 시 schedule.html로 이동 처리 (?id=... 포함)

→ 본 저장소 페이지에서는 일부 레이아웃 및 표시만 포함되며, 실제 일정 관리 로직은 schedule.html에서 수행됨.

### 4. 사용자 경험 & UI (storage.css)

- [x]  기록공간과 일정관리공간을 좌우 병렬 배치 (.storage-container)
- [x]  각 공간별 타이틀, 입력 영역, 카드/리스트 간격 및 레이아웃 정리
- [x]  입력창 focus 시 테두리 강조
- [x]  버튼 hover 효과 및 일관된 스타일 적용
- [x]  카드 hover 및 편집 시 UI 변경 명확
- [x]  일정 항목 완료 시 취소선 및 색상 처리로 구분

## 기록공간 점검

### 1. 기본 UI 구성 (record.html, record.css)

- [x]  과목명 입력 필드 및 속성 입력 필드 구성
- [x]  속성 선택을 위한 datalist 및 버튼(과목 추가) 정상 구현
- [x]  제목(✏️ 기록공간) 및 레이아웃 디자인 반영
- [x]  과목 그룹 컨테이너(.subject-group-container) 정상 표시
- [x]  버튼 및 입력 필드에 대한 focus, hover 스타일 구현
- [x]  과목 그룹 UI, 편집/삭제 버튼 등 시각적 구성
- [x]  과목 목록을 그리드로 구성하여 반응형 디자인 처리

### 2. 과목 추가 (storage_record.js)

- [x]  과목명과 속성 입력 후 추가 버튼 클릭 시 과목 정상 추가
- [x]  추가된 과목은 속성 그룹별로 나누어 표시
- [x]  과목 추가 시 Firestore에 데이터 추가 및 UI 반영
- [x]  속성 목록 업데이트 및 datalist에 반영
- [x]  입력 필드 초기화 처리

### 3. 과목 카드 편집 (storage_record.js)

- [x]  편집 버튼 클릭 시 카드 내용 수정 가능 (과목명 및 속성)
- [x]  수정 후 "💾" 버튼 클릭 시 Firestore에서 해당 과목 업데이트
- [x]  수정된 과목명과 속성은 기존 카드에 반영
- [x]  속성 그룹에 따라 과목이 재정렬 및 반영
- [x]  수정 후 record.html 페이지로 리디렉션 처리

### 4. 과목 삭제 (storage_record.js)

- [x]  삭제 버튼 클릭 시 과목 삭제 확인 메시지 표시
- [x]  삭제 후 해당 과목 UI에서 제거 및 Firestore 데이터 삭제
- [x]  속성 그룹에서 과목 삭제 후 그룹 비었을 경우 그룹 삭제
- [x]  삭제 후 속성 목록 업데이트

### 5. 과목 목록 불러오기 (storage_record.js)

- [x]  DOMContentLoaded 시 Firestore에서 저장소에 속한 과목 불러오기
- [x]  attribute와 createdAt 기준으로 과목 정렬하여 UI에 표시
- [x]  과목 목록이 속성별로 그룹화되어 표시되며, 그룹 토글 가능

### 6. 그룹화 및 속성 관리 (storage_record.js)

- [x]  속성별 과목을 그룹화하여 UI에 표시
- [x]  속성 그룹 클릭 시 해당 그룹 내용 토글 가능
- [x]  attributes Set을 사용하여 속성 목록 관리
- [x]  속성 그룹이 비었을 경우 해당 그룹 제거 및 속성 목록 업데이트

### 7. Firestore 연동 및 오류 처리 (storage_record.js)

- [x]  Firestore에서 과목 추가, 수정, 삭제 시 오류 처리 (예: 네트워크 문제 시 alert)
- [x]  잘못된 접근 시 저장소 ID가 없으면 alert로 오류 메시지 출력
- [x]  Firebase Firestore 연동을 위한 addDoc, updateDoc, deleteDoc 정상 작동

## 과목 페이지 기능 점검

### 1. 과목 정보 표시 (subject_page.js)

- [x]  URL 쿼리스트링을 통해 storageId, subjectId 정상 추출
- [x]  Firebase에서 해당 과목 정보(doc) 불러오기
- [x]  과목명(.subject-title)에 과목 이름 렌더링
- [x]  잘못된 접근(과목 정보 없음) 시 alert 및 에러 처리

### 2. 노트 추가 기능 (subject_page.html, subject_page.css)

- [x]  노트 제목 입력 필드 및 색상 선택 드롭다운 렌더링
- [x]  "➕" 버튼 클릭 시 새로운 노트 추가 기능 수행
- [x]  노트 색상에 따른 배경색 적용 (기본, 연한 회색, 기본 회색, 중간 회색, 진한 회색)
- [x]  노트 제목 입력란에 입력되지 않으면 경고 메시지 표시

### 3. 노트 카드 UI (subject_page.html, subject_page.css)

- [x]  노트 카드 생성 후 제목 및 생성일 표시
- [x]  노트 카드 클릭 시 해당 노트의 상세 페이지(note_page.html)로 이동
- [x]  노트 제목 클릭 시 수정 모드로 전환 (입력 필드로 변경)
- [x]  노트 수정 후 변경 사항 Firebase에 반영
- [x]  노트 삭제 버튼 클릭 시 삭제 여부 확인 후 삭제
- [x]  노트 생성일 날짜 포맷 처리 (YYYY.MM.DD)

### 4. 노트 목록 및 레이아웃 (subject_page.css)

- [x]  노트 카드들을 그리드 레이아웃으로 표시
- [x]  각 노트 카드에 대해 note-title, note-date, note-delete 등 항목들 시각적 구성
- [x]  노트 삭제 버튼 스타일링 및 hover 효과 적용
- [x]  노트 카드 클릭 시 cursor:pointer로 설정하여 클릭 가능함을 시각적으로 표시

### 5. 사용자 경험 & UI (subject_page.css)

- [x]  제목 입력란 및 색상 선택 드롭다운 레이아웃 정리
- [x]  버튼 hover 효과 및 일관된 스타일 적용
- [x]  입력 필드 focus 시 테두리 강조
- [x]  노트 카드 hover 시 UI 시각적 변화
- [x]  노트 제목 수정 후 변경 사항 정상 반영

## 노트 페이지 점검

### 1. 노트 기본 정보 표시 및 로딩 (note_page.js)

- [x]  URL 쿼리스트링에서 storageId, subjectId, noteId 정상 추출
- [x]  Firebase에서 해당 노트 정보(doc) 불러오기
- [x]  노트 제목(.note-title) 및 상태(.note-saved) 표시
- [x]  노트 제목 클릭 시 제목 수정 모드 전환 (입력창 표시 후 블러 시 저장)
- [x]  잘못된 접근(필수 파라미터 없음) 시 alert 및 에러 처리

### 2. Quill 에디터 UI (note_page.html, note_page.css)

- [x]  Quill 에디터 초기화 후 내용 로딩
- [x]  theme: 'snow' 및 툴바 설정 (글꼴, 헤딩, 리스트, 색상 등)
- [x]  이미지 삽입 버튼 구현 및 동작 확인 (이미지 업로드 후 에디터에 삽입)
- [x]  이미지 리사이즈 기능 정상 작동 (Quill의 이미지 리사이즈 모듈 사용)
- [x]  에디터에 기본 placeholder 텍스트 "여기에 노트를 작성하세요..." 추가

### 3. 저장 처리 (note_page.js)

- [x]  Quill 에디터에서 내용 수정 시 자동 저장 기능 (1초 후 자동 저장)
- [x]  저장 시 상태 메시지 변경 ("저장 중...", "저장됨")
- [x]  Firebase에 저장된 내용이 content 필드에 정상적으로 업데이트

### 4. 스타일링 및 UI (note_page.css)

- [x]  제목, 상태, 에디터 영역에 대한 레이아웃 구성
- [x]  제목 클릭 시 입력창으로 변환 시 스타일 정상 작동
- [x]  이미지가 에디터 내에서 리사이징 가능하도록 스타일링
- [x]  에디터 영역 및 툴바 영역에 적절한 마진과 패딩 적용

## 일정관리공간 점검

### 1. 저장소 정보 추출 및 URL 처리 (schedule.js)

- [x]  URL에서 저장소 ID 정상 추출
- [x]  잘못된 접근 시 alert 및 에러 처리
- [x]  주간/월간 보기 버튼 클릭 시 weekly.html, monthly.html로 이동 처리 (저장소 ID 포함)

### 2. 일정 추가 및 관리 (schedule.js, storage_schedule.js)

- [x]  일정 제목 및 날짜 입력 필드 정상 동작
- [x]  일정 제목 필드에서 속성 정보 추출([] 속성명) 및 기본값 처리
- [x]  추가 버튼 클릭 시 일정 추가 기능
- [x]  Firebase Firestore에 일정 데이터 저장
- [x]  일정 목록에서 완료 상태(체크박스) 토글 가능
- [x]  일정 삭제 버튼 정상 작동

### 3. 일정 목록 필터링 및 표시 (storage_schedule.js)

- [x]  속성별 필터링 드롭다운 정상 동작
- [x]  완료된 일정은 취소선 처리
- [x]  더 보기 버튼 클릭 시 일정 추가 로드
- [x]  일정 목록 최대 15개 항목 표시 (확장 가능)
- [x]  일정 항목 제목, 날짜, 속성, 완료 상태 등을 editable 셀로 표시

### 4. 일정 정렬 및 필터링 (storage_schedule.js)

- [x]  일정 항목은 완료 여부 → 날짜 → 등록일 순으로 정렬
- [x]  필터링 시 해당 속성에 맞는 일정만 표시
- [x]  필터 옵션은 동적으로 업데이트 (속성별로 필터링)

### 5. 사용자 경험 & UI (schedule.css)

- [x]  주간/월간 보기 버튼 배치 및 hover 효과
- [x]  일정 추가 폼 및 입력창 디자인 정리 (입력 필드 포커스 시 스타일 변화)
- [x]  일정 리스트 테이블 디자인 (정렬, 입력창 focus 시 효과)
- [x]  삭제 버튼 및 완료 체크박스 스타일 정리
- [x]  '더 보기' 버튼 스타일 및 클릭 시 동작 구현

## 주간일정관리 기능 점검

### 1. 주간 일정 렌더링 (weekly.html, weekly.js)

- [x]  현재 주의 날짜 계산 및 화면에 요일별 날짜 표시
- [x]  오늘 날짜 강조 표시
- [x]  이전 주/다음 주 이동 버튼 작동
- [x]  주간 날짜 변경 시 해당 일정 자동 갱신

### 2. 일정 추가 기능

- [x]  요일별 "+" 버튼 클릭 시 모달 열림
- [x]  일정 제목 및 체크리스트 입력 필드 제공
- [x]  체크리스트 항목 추가 버튼 (+) 동작
- [x]  저장 시 Firebase에 일정 데이터 저장 (날짜 기준으로 정리)
- [x]  저장 후 모달 닫힘 및 화면에 일정 반영

### 3. 일정 수정 기능

- [x]  기존 일정 클릭 시 모달 열림
- [x]  기존 제목 및 체크리스트 자동 로드
- [x]  수정 후 저장 시 기존 Firebase 문서 업데이트
- [x]  수정 사항 화면에 즉시 반영

### 4. 일정 삭제 기능

- [x]  일정 수정 모달 내 “삭제” 버튼 동작
- [x]  클릭 시 Firebase에서 해당 일정 문서 삭제
- [x]  삭제 후 UI 자동 반영

### 5. 체크리스트 기능

- [x]  일정 생성/수정 시 체크리스트 항목 추가 가능
- [x]  개별 체크 항목 삭제 가능
- [x]  체크 상태(완료 여부) UI에 표시
- [x]  체크 상태가 Firebase에 실시간으로 저장됨

### 6. Firebase 연동 (weekly.js)

- [x]  로그인한 사용자 UID 기반으로 일정 필터링
- [x]  Firestore에 일정 저장 및 로드 기능 구현
- [x]  새로고침 시에도 일정 데이터 유지됨 (onSnapshot 또는 getDocs 활용)

### 7. 사용자 경험 & UI (weekly.css)

- [x]  요일별 일정 카드가 보기 쉽게 정리됨
- [x]  일정 hover 시 수정 가능하다는 시각적 피드백 제공
- [x]  체크리스트 항목 UI가 직관적으로 구성됨
- [x]  모달 UI가 모바일 환경에서도 자연스럽게 렌더링됨

## 월간일정관리 기능 점검

### 1. 월간 일정 렌더링 (monthly.html, monthly.js)

- [x]  저장소 생성 시 설정한 기간(startDate ~ endDate)에 해당하는 월 목록만 렌더링
- [x]  왼쪽 메뉴에 월별 리스트를 표시하며, 사용자가 클릭하여 월 선택
- [x]  선택된 월의 날짜를 달력 형태로 렌더링 (1일 시작 위치 및 요일 정렬 반영)
- [x]  다른 월 클릭 시 해당 월로 달력 및 일정 자동 갱신
- [x]  오늘 날짜는 달력에서 별도 강조
- [x]  해당 월이 아닌 날짜(빈칸)는 회색으로 구분 표시

### 2. 일정 추가 기능

- [x]  달력 내 날짜 클릭 시 일정 추가 모달 열림
- [x]  일정 제목 및 체크리스트 항목 입력 필드 제공
- [x]  체크리스트 항목 추가 버튼(+) 동작
- [x]  저장 시 Firebase에 일정 데이터 저장 (YYYY-MM-DD 형식으로 정리)
- [x]  저장 후 모달 자동 닫힘 및 달력에 일정 표시

### 3. 일정 수정 기능

- [x]  기존 일정 클릭 시 수정 모달 열림
- [x]  기존 제목 및 체크리스트 자동 로드
- [x]  수정 후 저장 시 기존 Firebase 문서 업데이트
- [x]  수정 내용이 달력 UI에 즉시 반영됨

### 4. 일정 삭제 기능

- [x]  수정 모달 내 “삭제” 버튼 클릭 시 해당 일정 Firebase에서 삭제
- [x]  삭제 후 달력에서 해당 일정 자동 제거

### 5. 체크리스트 기능

- [x]  일정 생성/수정 시 체크리스트 항목 추가 및 개별 삭제 가능
- [x]  체크박스 클릭 시 완료 상태 토글 가능
- [x]  체크 상태는 Firebase에 실시간 저장됨
- [x]  UI에서도 체크 완료/미완료 상태 직관적으로 표시됨

### 6. Firebase 연동 (monthly.js)

- [x]  로그인한 사용자 UID를 기준으로 일정 필터링
- [x]  선택한 월에 해당하는 일정만 Firestore에서 불러옴
- [x]  일정 데이터는 저장소 ID + 날짜 기준으로 정리되어 있음
- [x]  새로고침 후에도 일정 데이터 유지됨 (getDocs 사용)

### 7. 사용자 경험 & UI (monthly.css)

- [x]  달력 그리드가 깔끔하게 정렬되어 있음 (7열 x 최대 6행)
- [x]  일정 있는 날짜에는 일정이 간단히 표시되어 있어 한눈에 보기 쉬움
- [x]  일정 hover 시 수정 가능하다는 시각적 피드백 제공
- [x]  체크리스트 항목이 UI 상에서 명확하게 표시됨
- [x]  모달 UI가 모바일 환경에서도 문제 없이 동작

## 배포 (firebase hosting)

### 1. Firebase CLI(**Command-Line Interface**) 설치

- npm install -g firebase-tools
    ![Image](https://github.com/user-attachments/assets/41251590-1c70-48bd-bf33-f88f20fd38f2)
    
- 설치 확인 : firebase --version
    ![Image](https://github.com/user-attachments/assets/2cd77041-a823-43da-bc72-484b5f384aca)
    

### 2. firebase 로그인

- firebase login
    ![Image](https://github.com/user-attachments/assets/786ed17a-bcca-4027-9571-1bb4748466ff)
    ![Image](https://github.com/user-attachments/assets/35297557-7ac3-42a7-89dc-82541d58cd40)
    ![Image](https://github.com/user-attachments/assets/0752d5a1-71dc-48ed-b921-b50df98c7465)
    

### 3. Firebase 초기화

- 프로젝트 폴더에서 터미널 열기 → firebase init
    ![Image](https://github.com/user-attachments/assets/99c3516a-2663-42e3-90ee-919aa1e6cf19)
    호스팅 기능 선택
    
- firebase 프로젝트 연결, public 폴더 설정, firebase가 github 저장소랑 연결해서 자동으로 빌드 및 배포 할 수 있도록 설정
    ![Image](https://github.com/user-attachments/assets/fb191521-9c57-42a5-b871-80bbbc3df0c1)
    ![Image](https://github.com/user-attachments/assets/e0e07ebd-4b47-4634-9172-88864e3c167b)
    ![Image](https://github.com/user-attachments/assets/347df8c3-c6a6-463f-b220-ad1059458d63)
    
- 깃허브 저장소, 브랜치 설정
    ![Image](https://github.com/user-attachments/assets/3d16b127-9e36-4983-8a19-ee37c17026a3)
    

### 4. 배포하기

- firebase deploy
    ![Image](https://github.com/user-attachments/assets/e62fe7ed-84eb-47e6-8d92-26f8fef02148)
    
- 성공한 뒤에 Hosting URL 클릭시 실제 웹사이트가 어떻게 보이는지 확인 가능
    ![Image](https://github.com/user-attachments/assets/9efa6364-3a63-4bc3-9bd7-e1a081316325)
