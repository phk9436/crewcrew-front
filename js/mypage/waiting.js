import { getDateDiff } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const waitingData = JSON.parse(localStorage.getItem("waitingData"));
  let waitingList = "";
  const postWrapper = document.querySelector(".PostWrapper ul");
  const renderWaiting = () => {
    if(waitingData.length === 0) {
    }
    waitingData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const endDay = days[new Date(e.endDate).getDay()];
      const reqDate = `${e.reqDate.split("-")[1]}/${e.reqDate.split("-")[2]}`;
      waitingList += /* html */ `
        <li>
          <div class="PostCard Cent ${e.state === "disable" && "Disable"}">
            <div class="PostCardHead">
              <div class="ProfileBox">
                <img src="/assets/images/${e.profile}" alt="" class="ProfileIMG">
              </div>
              <div class="TextBox">
                <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
            </div>
            <div class="PostCardBody">
              <div class="TextBox">
                <div class="TitleBox">
                  <h5>${e.title}</h5>
                </div>
                <div class="TextList">
                  <p class="Category Study">${categoryName}</p>
                  <p>${e.place}</p>
                  <p>${e.nowPop}/${e.fullPop}명</p>
                  <p>조회수 ${e.read}</p>
                </div>
              </div>
              <div class="DetailBox">
                <p><span>(${reqDate})</span> ${e.state === "waiting" ? "요청완료" : "요청취소"}</p>
              </div>
              <div class="ButtonBox">
                ${e.state === "waiting" 
                  ? '<button class="Detail Cancle">요청취소</button>'
                  : '<button class="Detail Delete">내역삭제</button>'
                }
              </div>
            </div>
          </div>
        </li>
      `;
    });
    postWrapper.innerHTML = waitingList;
  };
  renderWaiting();
});