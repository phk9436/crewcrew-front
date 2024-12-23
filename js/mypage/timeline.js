document.addEventListener("DOMContentLoaded", () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const timelineData = JSON.parse(localStorage.getItem("timelineData"));
  let timelineList = "";
  const timeline = document.querySelector(".TLCardList");
  const setTimelineText = (data) => {
    if (data.type === "참여요청") {
      return /* html */ `
        <p class="Detail"><em>${data.reqName}</em> 크루에 <b>참여요청</b>하였습니다.</p>
      `;
    }
  };
  const renderTimeline = () => {
    if (timelineData.length === 0) {
      timeline.classList.add("noContent");
      timelineList += /* html */ `
        <li>
          <p>
            <em>현재 활동내역이 없습니다.</em><br>
            모집크루들을 둘러보고 관심가는 크루에<br class="m"> 참여해 보세요!
          </p>
          <a class="ButtonFull3" href="/post/">크루참여하러 가기</a>
        </li> 
      `;
      timeline.innerHTML = timelineList;
      return;
    }
    timelineData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const timeDate = `${e.date.split("-")[0]}/${e.date.split("-")[1]}/${e.date.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const timeDay = days[new Date(e.date).getDay()];
      timelineList += /* html */ `
        <li>
          <div class="TLCard">
            <div class="TLCardBox ${e.category} ${e.story}">
              <p class="title"><em>${categoryName}</em>${timeDate} (${timeDay})</p>
              ${setTimelineText(e)}
            </div>
          </div>
        </li>
      `;
    });
    timeline.innerHTML = timelineList;
  };
  renderTimeline();
  console.log(timelineData)
});