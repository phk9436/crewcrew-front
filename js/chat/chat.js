document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  const type = urlParams.get("type");
  console.log(id, uid, type === "private")
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin || !id || !uid || !type) {
    location.href = "/";
  }
  renderChat();
});

const renderChat = () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  const type = urlParams.get("type");
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const chatRoom = chatData.find((e) => e.id === Number(id));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  const userData = JSON.parse(localStorage.getItem("userData"));

  const ChatBox = document.querySelector(".ChatBoxWrapper");
  let Chat = /* html */ `
    <div class="ChatBoxHead Dt">
      <div class="ProfileImg" style="background-color: ${member.profileBg}"><img src="/assets/images/${member.profile}" alt=""></div>
      <h3>${member.nickname}</h3>
    </div>
    <div class="ChatBoxBody Dt">
  `;
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
  ChatForm.addEventListener("submit", (e) => chatEvtFunc(e, id, uid, chatData, chatRoom));
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
        <div class="ProfileImg" style="background-color: ${member.profileBg}">
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
      if (e.senderId === userData.uid) {
        ChatList += chatMyMsg(e);
        return;
      }
      ChatList += chatOtherMsg(e, memberData);
    });
    ChatList += "</div>";
  });
  return ChatList;
};

const chatCrew = () => {
  let ChatList = "";
  return ChatList;
};

const chatEvtFunc = (e, id, uid, chatData, chatRoom) => {
  e.preventDefault();
  const msg = document.querySelector(".ChatInput").value;
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!msg) return;
  const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hour = `${date.getHours()}`.padStart(2, "0");
    const minute = `${date.getMinutes()}`.padStart(2, "0");
    return [year, month, day, hour, minute];
  };
  if (!chatRoom) {
    chatData = [
      ...chatData,
      {
        id: chatData.length ? chatData.length + 1 : 1,
        type: "private",
        users: [userData.uid, Number(uid)],
        messages: [
          {
            senderId: userData.uid,
            msg,
            timeStamp: getTime(),
          }
        ]
      }
    ];
    localStorage.setItem("chatData", JSON.stringify(chatData));
    renderChat();
    return;
  }
  chatRoom = {
    ...chatRoom,
    messages: [
      ...chatRoom.messages,
      {
        senderId: userData.uid,
        msg,
        timeStamp: getTime(),
      }
    ]
  };
  chatData = chatData.map((e) => {
    if (e.id !== Number(id)) return e;
    return chatRoom;
  });
  localStorage.setItem("chatData", JSON.stringify(chatData));
  renderChat();
};