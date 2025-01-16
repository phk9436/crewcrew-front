import { getDateDiff } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) location.href = "/";
  const userData = JSON.parse(localStorage.getItem("userData"));
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const chatList = chatData
    .filter((e) => e.users.includes(userData.uid))
    .sort((a, b) => {
      const timeA = a.messages.at(-1).timeStamp.join('');
      const timeB = b.messages.at(-1).timeStamp.join('');
      return Number(timeB) - Number(timeA);
    });
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const postData = JSON.parse(localStorage.getItem("postData"));
  const chatBox = document.querySelector(".ChatBoxList");
  let chat = "";
  if (chatList.length === 0) {
    chat += /* html */ `
      <li class="noContent">
        <p>
          <em>채팅 내역이 없습니다.</em><br>
          크루에 참여하거나 크루원들에게 메세지를 보내보세요!
        </p>
        <a class="ButtonFull3 ButtonSmall" href="/post/">크루참여하러 가기</a>
      </li>
    `;
  } else {
    chatList.forEach((e) => {
      chat += e.type === "private"
        ? renderPrivateChat(e, memberData, userData)
        : renderCrewChat(e, postData);
    });
  }
  chatBox.innerHTML = chat;
});

const renderPrivateChat = (data, memberData, userData) => {
  const memberUid = data.users.filter((e) => e !== userData.uid)[0];
  const member = memberData.find((e) => e.uid === memberUid);
  const msg = data.messages.at(-1);
  const msgDateDiff = getDateDiff(`${msg.timeStamp[0]}-${msg.timeStamp[1]}-${msg.timeStamp[2]}`, new Date()) === 0;
  const msgDate = msgDateDiff
    ? getTimeFormat([msg.timeStamp[3], msg.timeStamp[4]])
    : `${Number(msg.timeStamp[1])}월 ${Number(msg.timeStamp[2])}일`;
  return /* html */ `
    <li class="ChatContent">
      <a href="/chat/detail/?id=${data.id}&uid=${memberUid}&type=private">
        <div class="ContentCard">
          <div class="ChatContentHead">
            <div class="HeadBox Profile" >
              <div class="ProfileImg" style="background-color: ${member.profileBg}">
                <img src="/assets/images/${member.profile}" alt="">
              </div>
              <p>${member.nickname}</p>
            </div>
          </div>
          <div class="ChatContentBody">
            <p>${msg.msg}</p>
          </div>
          <div class="ChatContentFooter">
            <p class="Date">${msgDate}</p>
          </div>
        </div>
      </a>
    </li>
  `;
};

const renderCrewChat = (data, postData) => {
  const post = postData.find((e) => e.id === data.reqId);
  const categoryName = (post.categoryName === "기타취미" || post.categoryName === "기타스터디") ? "기타" : post.categoryName;
  const msg = data.messages.at(-1);
  const msgDateDiff = getDateDiff(`${msg.timeStamp[0]}-${msg.timeStamp[1]}-${msg.timeStamp[2]}`, new Date()) === 0;
  const msgDate = msgDateDiff
    ? getTimeFormat([msg.timeStamp[3], msg.timeStamp[4]])
    : `${Number(msg.timeStamp[1])}월 ${Number(msg.timeStamp[2])}일`;
  return /* html */ `
    <li class="ChatContent">
      <a href="/chat/detail/?id=${data.id}&reqId=${data.reqId}&type=crew">
        <div class="ContentCard">
          <div class="ChatContentHead">
            <div class="HeadBox Post">
              <img src="/assets/images/IconFlag.png" alt="">
              <p>
                <span class="${post.category}">${categoryName}</span>
                ${post.title}
              </p>
            </div>
          </div>
          <div class="ChatContentBody">
            <p>${msg.msg}</p>
          </div>
          <div class="ChatContentFooter">
            <p class="Date">${msgDate}</p>
          </div>
        </div>
      </a>
    </li>
  `;
};

const getTimeFormat = (time) => {
  if (Number(time[0]) <= 12) {
    return `오전 ${Number(time[0])}:${Number(time[1])}`;
  }
  return `오후 ${Number(time[0]) - 12}:${Number(time[1])}`;
};