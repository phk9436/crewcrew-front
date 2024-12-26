document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
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
    if (data.type === "참여취소") {
      return /* html */ `
        <p class="Detail"><em>${data.reqName}</em> 크루에 <b>참여취소</b>하였습니다.</p>
      `;
    }
    if (data.type === "크루모집") {
      return /* html */ `
        <p class="Detail"><em>${data.reqName}</em> 크루를 <b>모집</b>하였습니다.</p>
      `;
    }
    if(data.type === "크루신청") {
      return /* html */ `
        <p class="Detail"><em>${data.reqName}</em> 님이 모집중인 크루에 <b>참여신청</b>하였습니다.</p>
      `;
    }
    if (data.type === "모집취소") {
      return /* html */ `
        <p class="Detail"><em>${data.reqName}</em> 크루를 <b>모집취소</b>하였습니다.</p>
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
            모집크루들을 둘러보고 활동 이력을 남겨 보세요!
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
          <a href="${e.type === "참여요청" || e.type === "참여취소" ? "/mypage/waiting/" : "/mypage/recruiting/"}">
            <div class="TLCard">
              <div class="TLCardBox ${e.category} ${e.story}">
                <p class="title"><em>${categoryName}</em>${timeDate} (${timeDay})</p>
                ${setTimelineText(e)}
              </div>
            </div>
          </a>
        </li>
      `;
    });
    timeline.innerHTML = timelineList;
  };
  renderTimeline();
});