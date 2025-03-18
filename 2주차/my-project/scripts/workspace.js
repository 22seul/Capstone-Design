// 저장소 데이터 (임시)
let storages = {};

// 모달 열기
document.querySelector('.add-btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'flex';
});

// 모달 닫기
document.getElementById('close-modal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

// 저장소 추가
document.getElementById('save-storage').addEventListener('click', () => {
    let name = document.getElementById('storage-name').value;
    let start = document.getElementById('storage-start').value;
    let end = document.getElementById('storage-end').value;

    if (!name || !start || !end) {
        alert("모든 값을 입력해주세요!");
        return;
    }

    // 기간에서 연도만 추출
    let year = new Date(start).getFullYear();

    // 저장소 그룹화
    if (!storages[year]) {
        storages[year] = [];
    }
    storages[year].push({ name, start, end });

    // UI 업데이트
    updateStorageUI();

    // 모달 닫기
    document.querySelector('.modal').style.display = 'none';

    // 입력 필드 초기화
    document.getElementById('storage-name').value = '';
    document.getElementById('storage-start').value = '';
    document.getElementById('storage-end').value = '';
});

// 저장소 목록 업데이트
function updateStorageUI() {
    let storageList = document.querySelector('.storages');
    let storageContainer = document.querySelector('.storage-container'); // 메인 화면 카드 추가
    storageList.innerHTML = '';
    storageContainer.innerHTML = ''; // 기존 카드 초기화

    Object.keys(storages).forEach(year => {
        // 연도 그룹 (사이드바)
        let yearGroup = document.createElement('div');
        yearGroup.className = 'year-group';
        yearGroup.innerHTML = `<div>📅 ${year}년도</div>`;
        
        let ul = document.createElement('ul');
        storages[year].forEach(storage => {
            let li = document.createElement('li');
            li.textContent = `📌 ${storage.name}`;
            ul.appendChild(li);

            // 📌 메인 화면 카드 추가
            let card = document.createElement('div');
            card.className = 'storage-card';
            card.innerHTML = `
                <h4>${storage.name}</h4>
                <p>${storage.start} ~ ${storage.end}</p>
            `;
            storageContainer.appendChild(card);
        });

        yearGroup.appendChild(ul);
        storageList.appendChild(yearGroup);

        // 연도별 토글 기능
        yearGroup.addEventListener('click', function() {
            ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
        });
    });
}

function addStorageCard(title, startDate) {
    let storageContainer = document.querySelector('.storage-container');
    let newCard = document.createElement('div');
    
    newCard.classList.add('storage-card');
    newCard.dataset.start = startDate; // 시작 날짜를 dataset에 저장
    newCard.innerHTML = `<h3>${title}</h3><p>${startDate}</p>`;

    // 저장소 목록에 추가 후 정렬
    storageContainer.appendChild(newCard);
    sortStorageByDate();
}
