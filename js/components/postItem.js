import { getDateDiff } from "../common.js";

export const postItem = (data) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const endDate = `${data.endDate.split("-")[1]}/${data.endDate.split("-")[2]}`;
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const endDay = days[new Date(data.endDate).getDay()];
  const member = memberData.find((el) => el.uid === Number(data.uid));
  const chatRoom = chatData.find((data) => data.type === "crew" && data.users.includes(userData.uid) && data.reqId === data.id);
  return /* html */ `
    <li data-id="${data.id}" data-uid="${data.uid}">
      <div class="PostCard">
        <div class="PostCardHead">
          <div class="ProfileBox" style="background-color:${data.profileBg}">
            <img src="/assets/images/${data.profile}" alt="" class="ProfileImg">
          </div>
          <div class="TextBox">
            <p class="Dday">D-${getDateDiff(data.endDate, new Date())}</p>
            <p class="Date">${endDate} (${endDay})</p>
            <p class="Name">${data.nickname}</p>
          </div>
          ${Number(data.uid) !== userData?.uid ? /* html */ `
            <div class="ProfileToolTip">
              <p class="ToolTipName">${member.nickname}</p>
              <div class="ToolTipBtn">
                <button class="Chat"></button>
                <button class="Profile">프로필 확인</button>
              </div>
            </div>` : ""}
        </div>
        <div class="PostCardBody">
          <div class="TextBox">
            <div class="TitleBox">
              <h5>${data.title}</h5>
              <div class="Star ${isLogin && userData.bookmarked.includes(data.id) && "On"}"></div>
            </div>
            <div class="TextList">
              <p class="Category ${data.category}">${categoryName}</p>
              <p>${data.place}</p>
              <p>${data.nowPop}/${data.fullPop}명</p>
              <p>조회수 ${data.read}</p>
            </div>
          </div>
          <div class="ButtonBox">
            <button class="Detail">상세보기</button>
            ${chatRoom ? '<button class="btnChatCrew">채팅하기</button>' : '<button class="Participate">참여하기</button>'}
          </div>
        </div>
      </div>
    </li>
  `;
};