document.addEventListener("DOMContentLoaded", () => {
  const viewWeeklyBtn = document.getElementById("view-weekly-btn");
  const viewMonthlyBtn = document.getElementById("view-monthly-btn");
  // URL에서 저장소 ID 가져오기
  function getStorageIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  const storageID = getStorageIdFromURL();
  if (!storageID) {
    alert("잘못된 접근입니다. 저장소 ID가 없습니다.");
    throw new Error("저장소 ID 없음");
  }

  // '주간 일정 보기' 버튼 클릭 시 storageID를 URL 쿼리 파라미터로 전달하여 weekly.html로 이동
  viewWeeklyBtn.addEventListener("click", () => {
    window.location.href = `weekly.html?id=${storageID}`; // storageID를 쿼리 파라미터로 전달
  });

  viewMonthlyBtn.addEventListener("click", () => {
    window.location.href = `monthly.html?id=${storageID}`; // storageID를 쿼리 파라미터로 전달
  });
});
