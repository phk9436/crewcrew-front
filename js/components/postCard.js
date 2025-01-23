import { getDateDiff } from "../common.js";

export const postCard = (data, swiper = false) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const endDate = `${data.endDate.split("-")[1]}/${data.endDate.split("-")[2]}`;
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const endDay = days[new Date(data.endDate).getDay()];
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((el) => el.uid === Number(data.uid));
  const userData = JSON.parse(localStorage.getItem("userData"));
  return /*html*/ `
    <li class="${swiper ? "swiper-slide" : ""}" data-id="${data.id}" data-uid="${data.uid}">
      <div class="CardPost ${data.category}"> <!--카드-->
        <div class="CardHead">
        <h5 class="${getDateDiff(data.endDate, new Date()) >= 1 ? "" : "disable"}">${getDateDiff(data.endDate, new Date()) >= 1 ? "D-" + getDateDiff(data.endDate, new Date()) : "마감"}</h5>
          <div class="CardHeadRight">
            <p>${endDate} (${endDay})</p>
            <p>조회수 <span>${data.read}</span></p>
            <div class="Star ${isLogin && userData.bookmarked.includes(data.id) && "On"}"></div>
          </div>
        </div>
        <div class="CardBody">
          <div class="CardProfile" style="background-color:${data.profileBg}">
            <img src="/assets/images/${data.profile}" alt="" class="ProfileImg">
          </div>
          ${Number(data.uid) !== userData?.uid ? /* html */ `
            <div class="ProfileToolTip">
              <p class="ToolTipName">${member.nickname}</p>
              <div class="ToolTipBtn">
                <button class="Chat"></button>
                <a class="Profile">프로필 확인</a>
              </div>
            </div>` : ""}
          <div class="CardTxt">
            <h4>${data.title}</h4>
            <p>${data.nickname}</p>
          </div>
        </div>
        <div class="CardFooter">
          <div class="CardTag Color">${categoryName}</div>
          <div class="CardTag Color">${data.place}</div>
          <div class="CardTag"><span>${data.nowPop}</span>/<span>${data.fullPop}</span>명 모집됨</div>
        </div>
      </div>
    </li>
  `;
};