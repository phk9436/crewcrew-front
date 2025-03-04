import { lnbOpen, renderDefaultLnb, renderLoginLnb } from "./layout/lnb.js";
import { postData } from "./data/postData.js";
import { memberData } from "./data/memberData.js";

const commonFunc = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  window.addEventListener("resize", () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`));

  const body = document.querySelector("body");
  const buttonTop = document.querySelector(".ScrollTop");
  const buttonBottom = document.querySelector(".ScrollBottom");

  //스크롤 버튼 이벤트
  const scrollButton = () => {
    window.scrollY <= 100
      ? buttonTop?.classList.add("Disable")
      : buttonTop?.classList.remove("Disable");
    window.scrollY >= body.offsetHeight - screen.availHeight
      ? buttonBottom?.classList.add("Disable")
      : buttonBottom?.classList.remove("Disable");
  };
  scrollButton();
  window.addEventListener("scroll", scrollButton);

  buttonTop?.addEventListener("click", (e) => {
    e.target.classList.contains("Disable") || window.scrollTo(0, 0);
  });
  buttonBottom?.addEventListener("click", (e) => {
    e.target.classList.contains("Disable") || window.scrollTo(0, body.offsetHeight);
  });

  //데이터 로컬 저장
  const localPostData = JSON.parse(localStorage.getItem("postData"));
  if (!localPostData) localStorage.setItem("postData", JSON.stringify(postData));
  const localPostDataValid = localPostData?.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
  if (!localPostDataValid?.length) localStorage.setItem("postData", JSON.stringify(postData));
  const localMemberData = JSON.parse(localStorage.getItem("memberData"));
  if (!localMemberData) localStorage.setItem("memberData", JSON.stringify(memberData));
  const localChatData = JSON.parse(localStorage.getItem("chatData"));
  if (!localChatData) localStorage.setItem("chatData", JSON.stringify([]));
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) localStorage.setItem("userData", JSON.stringify({}));

  //lnb
  document.querySelector(".NavArrow").addEventListener("click", lnbOpen);
  document.querySelector(".NavHam").addEventListener("click", lnbOpen);
  isLogin ? renderLoginLnb() : renderDefaultLnb();

  //마이페이지
  const linkMypage = document.querySelectorAll(".linkMypage");
  linkMypage.forEach((e) => e.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    location.href = "/mypage";
  }));

  //검색클릭
  const searchFunc = (evt) => {
    evt.preventDefault();
    const { value } = document.querySelector(".InputSearch");
    if (!value.length) {
      alert("검색어를 입력해주세요.");
      return;
    }
    location.href = `/post/?search=${value}`;
  };
  document.querySelector(".ButtonSearch")?.addEventListener("click", searchFunc);
  document.querySelector(".formSearch")?.addEventListener("submit", searchFunc);

  //프로필 hide
  document.addEventListener("click", ({ target }) => {
    const ProfileToolTip = document.querySelectorAll(".ProfileToolTip");
    if (!ProfileToolTip || target.classList.contains("ProfileImg")) return;
    target.closest(".ProfileToolTip") || ProfileToolTip.forEach((e) => e.style.display = "none");
  });

  //채팅
  document.querySelector(".goChat").addEventListener("click", (e) => {
    e.preventDefault();
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    location.href = "/chat/";
  });
};

document.addEventListener("DOMContentLoaded", commonFunc);

export function setDateFormat(n) {
  const date = new Date();
  const endDate = date;
  endDate.setDate(date.getDate() + n);
  const year = endDate.getFullYear();
  const month = `${endDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${endDate.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDateDiff = (d1, d2) => {
  const date = [new Date(d1), new Date(d2)];
  const dateDiff = date[0].getTime() - date[1].getTime();
  return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
};

export const goPrivateChat = (uid) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return;
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
  const myuid = userData.uid;
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const activeChatRoom = chatData.find((e) => e.type === "private" && e.users.includes(uid) && e.users.includes(myuid));
  let chatRoomId;
  if (activeChatRoom) chatRoomId = activeChatRoom.id;
  if (!activeChatRoom) chatRoomId = chatData.length ? chatData.at(-1).id + 1 : 1;
  location.href = `/chat/detail/?id=${chatRoomId}&uid=${uid}&type=private`;
};

export const goCrewChat = (reqId) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { uid } = userData;
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const activeChatRoom = chatData.find((e) => e.type === "crew" && e.reqId === reqId && e.users.includes(uid));
  let chatRoomId;
  if (activeChatRoom) chatRoomId = activeChatRoom.id;
  if (!activeChatRoom) chatRoomId = chatData.length ? chatData.at(-1).id + 1 : 1;
  location.href = `/chat/detail/?id=${chatRoomId}&reqId=${reqId}&type=crew`;
};

export const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return [year, month, day, hour, minute];
};