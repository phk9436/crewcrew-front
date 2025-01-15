import { getTime } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  const reqId = urlParams.get("reqId");
  const type = urlParams.get("type");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const chatRoom = chatData.find((e) => e.id === Number(id));
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin || !id || !type) location.href = "/";
  if (type !== "private" && type !== "crew") location.href = "/";
  if (type === "private") {
    if (!uid || userData.uid === Number(uid)) location.href = "/";
    if (chatRoom && (!chatRoom.users.includes(Number(uid)) || !chatRoom.users.includes(userData.uid))) {
      location.href = "/";
    }
  }
  if (type === "crew") {
    if (!reqId) location.href = "/";
    if (chatRoom && !chatRoom.users.includes(userData.uid)) location.href = "/";
  }
  renderChat();
});

const renderChat = () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  const reqId = urlParams.get("reqId");
  const type = urlParams.get("type");
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const chatRoom = chatData.find((e) => e.id === Number(id));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const postData = JSON.parse(localStorage.getItem("postData"));

  const ChatBox = document.querySelector(".ChatBoxWrapper");
  let Chat = /* html */ `<div class="ChatBoxHead Dt">`;
  if (type === "private") {
    Chat += /* html */ `
      <div class="ProfileImg" style="background-color: ${member.profileBg}" data-uid=${member.uid}>
        <img src="/assets/images/${member.profile}" alt="">
      </div>
      <h3>${member.nickname}</h3>
    `;
  }
  Chat += /* html */ `</div><div class="ChatBoxBody Dt">`;
  Chat += type === "private" ? chatPrivate(chatRoom, userData, memberData) : chatCrew();
  Chat += /* html */ `
    </div>
    <div class="ChatBoxBottom">
      <form action="">
        <textarea name="" id="" cols="30" rows="10" class="ChatInput" placeholder="보낼 채팅 내용을 입력해주세요."></textarea>
        <button class="ChatPost">채팅보내기</button>
      </form>
    </div>
  `;
  ChatBox.innerHTML = Chat;
  const ChatTxt = document.querySelector(".ChatInput");
  const ChatBtn = document.querySelector(".ChatPost");
  ChatTxt.addEventListener("keyup", () => {
    ChatTxt.value ? ChatBtn.classList.add("On") : ChatBtn.classList.remove("On");
  });
  const ChatForm = document.querySelector(".ChatBoxBottom form");
  ChatForm.addEventListener("submit", (e) => submitChat(e, type));
  const profileImg = document.querySelectorAll(".ProfileImg");
  profileImg.forEach((e) => e.addEventListener("click", () => {
    const uid = e.getAttribute("data-uid");
    location.href = `/userInfo/?uid=${uid}`;
  }));
};

const chatMyMsg = ({ msg, timeStamp }) => {
  return /* html */ `
  <div class="ChatDt Me">
    <div class="ChatTxt">${msg}</div>
    <p class="Time">${timeStamp[3]}:${timeStamp[4]}</p>
  </div>
  `;
};

const chatOtherMsg = ({ msg, senderId, timeStamp }, memberData) => {
  const member = memberData.find((e) => e.uid === Number(senderId));
  return /* html */ `
    <div class="ChatDt Opponent">
      <div class="ChatProfile">
        <div class="ProfileImg" style="background-color: ${member.profileBg}" data-uid="${member.uid}">
          <img src="/assets/images/${member.profile}" alt="">
        </div>
        <h4>${member.nickname}</h4>
      </div>
      <div class="ChatTxt">${msg}</div>
      <p class="Time">${timeStamp[3]}:${timeStamp[4]}</p>
    </div>
  `;
};

const chatPrivate = (chatRoom, userData, memberData) => {
  if (!chatRoom) return "";
  let ChatList = "";
  const messages = groupMessages(chatRoom.messages);
  messages.forEach((e) => {
    ChatList += /* html */ `
      <div class="ChatDtWrapper">
        <p class="date">${e.date}</p>
    `;
    e.messages.forEach((e) => {
      ChatList += e.senderId === userData.uid ? chatMyMsg(e) : chatOtherMsg(e, memberData);
    });
    ChatList += "</div>";
  });
  return ChatList;
};

const chatCrew = () => {
  let ChatList = "";
  return ChatList;
};

const submitChat = (e, type) => {
  e.preventDefault();
  const msg = document.querySelector(".ChatInput").value;
  if (!msg) return;
  type === "private"
    ? generateChatPrivate(msg)
    : generateChatCrew();
};

const generateChatPrivate = (msg) => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  let chatData = JSON.parse(localStorage.getItem("chatData"));
  let chatRoom = chatData.find((e) => e.id === Number(id));

  let messages = [
    {
      senderId: userData.uid,
      msg,
      timeStamp: getTime(),
    }
  ];
  if (member.recruitingData === null) {
    messages = [
      ...messages,
      {
        senderId: Number(uid),
        msg: "크루크루를 이용해주셔서 감사합니다.\n이 채팅은 가상 유저와 채팅할 때 나타나는 채팅입니다.\n유저끼리의 상호작용을 원하신다면, 재가입 후 기존 가입계정과 상호작용하실 수 있습니다.",
        timeStamp: getTime(),
      }
    ];
  }

  if (!chatRoom) { //채팅룸 없을 시 생성
    chatData = [
      ...chatData,
      {
        id: chatData.length ? chatData.at(-1).id + 1 : 1,
        type: "private",
        users: [userData.uid, Number(uid)],
        messages
      }
    ];
    localStorage.setItem("chatData", JSON.stringify(chatData));
    renderChat();
    return;
  }
  chatRoom = { //채팅룸 있을 시 메세지만 추가
    ...chatRoom,
    messages: [
      ...chatRoom.messages,
      ...messages
    ]
  };
  chatData = chatData.map((e) => {
    if (e.id !== Number(id)) return e;
    return chatRoom;
  });
  localStorage.setItem("chatData", JSON.stringify(chatData));
  renderChat();
};

const generateChatCrew = () => {

};

const groupMessages = (messages) => {
  const groupedMessages = messages.reduce((acc, { senderId, msg, timeStamp }) => {
    // 시간 배열에서 년, 월, 일만 추출하여 날짜로 합침
    const dateKey = timeStamp.slice(0, 3).join('-');  // 예: '2025-01-09'
    // 날짜별로 메시지를 추가
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({ senderId, msg, timeStamp });
    return acc;
  }, {});
  // 그룹화된 결과를 배열로 반환
  return Object.entries(groupedMessages).map(([date, messages]) => ({
    date, messages
  }));
};