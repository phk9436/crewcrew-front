import { getDateDiff, goCrewChat, goPrivateChat } from "../common.js";
import { participate } from "../modal/participateModal.js";
import { bookmarkFunc } from "./postBookmark.js";

document.addEventListener(("DOMContentLoaded"), () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const uid = urlParams.get("uid");
  if (!id) {
    location.href = "/post";
  }
  let postData = JSON.parse(localStorage.getItem("postData"));

  //조회수 증가
  postData = postData.map((e) => {
    if (e.id !== Number(id)) return e;
    return { ...e, read: e.read + 1 };
  });
  localStorage.setItem("postData", JSON.stringify(postData));

  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((el) => el.uid === Number(uid));
  let userData = JSON.parse(localStorage.getItem("userData"));
  const data = postData.find((e) => e.id === Number(id));
  document.title = `${data.title} - 크루크루`;
  if (!data) {
    alert("존재하지 않는 크루입니다.");
    location.href = "/";
  }

  //최근 본 게시글목록에 추가
  if (isLogin) {
    userData.view = userData.view.filter((e) => e !== Number(id));
    userData.view = [Number(id), ...userData.view];
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("memberData", JSON.stringify(memberData.map((e) => {
      if (e.uid !== userData.uid) return e;
      return userData;
    })));
  }

  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const endDate = `${data.endDate.split("-")[1]}/${data.endDate.split("-")[2]}`;
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const endDay = days[new Date(data.endDate).getDay()];
  const postSection = document.querySelector(".PostDetail .SectionWrap850");
  const postDetail = /*html*/ `
    <ul>
      <li>
        <div class="ProfileWrapper" style="background-color: ${data.profileBg}">
          <img src="/assets/images/${data.profile}" alt="" class="ProfileImg">
        </div>
        ${Number(uid) !== userData?.uid ? /* html */ `
          <div class="ProfileToolTip">
            <p class="ToolTipName">${member.nickname}</p>
            <div class="ToolTipBtn">
              <button class="Chat"></button>
              <button class="Profile">프로필 확인</button>
            </div>
          </div>` : ""}
      </li>
      <li>${data.nickname}</li>
      <li class="${getDateDiff(data.endDate, new Date()) < 1 ? "Disabled" : ""}">${getDateDiff(data.endDate, new Date()) >= 1 ? "D-" + getDateDiff(data.endDate, new Date()) : "마감"}</li>
      <li>${endDate} (${endDay})</li>
    </ul>
    <h4 class="TitleMobile">${data.title}</h4> <!--모바일에서만 노출-->
    <ul>
      <li>
        <h4>${data.title}</h4>
      </li> <!--pc에서만 노출-->
      <li data-id="${data.id}"><button type="button" class="ButtonFullGhost ButtonStar Star ${isLogin && userData.bookmarked.includes(data.id) && "On"}"></button></li>
      ${renderPostButton(isLogin, id, userData, data)}
    </ul>
    <ul>
      <li class="${data.category}">${categoryName}</li>
      <li>${data.place}</li>
      <li>${data.nowPop}/${data.fullPop}명</li>
      <li>조회수 ${data.read}</li>
    </ul>
    <div class="textarea">
      <textarea name="" id="" class="TxtAreaDesc" readonly>${data.content}</textarea>
    </div>
  `;
  postSection.innerHTML = postDetail;

  //참여자 명단
  const memberCont = document.querySelector(".PostMember .SectionWrap850");
  let memberList = "";
  if (data.accept.length) {
    memberList += /* html */ `
      <h5 class="accept">참여 멤버</h5>
      <h6>이 멤버들과 함께해요!</h6>
      <ul class="acceptList">
    `;
    data.accept.forEach((uid) => {
      let member = memberData.find((el) => el.uid === uid);
      if (!member) member = JSON.parse(localStorage.getItem("userData"));
      memberList += /* html */ `
        <li class="memberList ${data.uid === uid && "leader"}" data-uid="${uid}">
          <div class="ProfileWrapper" style="background-color: ${member.profileBg}">
            <img src="/assets/images/${member.profile}" alt="" class="ProfileImg ProfileMember">
          </div>
          <div class="InfoWrapper">
            <p class="name">${member.nickname}</p>
            <p class="desc">${member.descript}</p>
          </div>
        </li>
      `;
    });
    memberList += /* html */ `</ul>`;
  }
  if (data.waiting.length) {
    memberList += /* html */ `
      <h5 class="accept">대기 멤버</h5>
      <h6>이 멤버들이 기다리고 있어요!</h6>
      <ul class="waitingList">
    `;
    data.waiting.forEach((uid) => {
      let member = memberData.find((el) => el.uid === uid);
      if (!member) member = JSON.parse(localStorage.getItem("userData"));
      memberList += /* html */ `
        <li class="memberList" data-uid="${uid}">
          <div class="ProfileWrapper" style="background-color: ${member.profileBg}">
            <img src="/assets/images/${member.profile}" alt="" class="ProfileImg ProfileMember">
          </div>
          <div class="InfoWrapper">
            <p class="name">${member.nickname}</p>
            <p class="desc">${member.descript}</p>
          </div>
        </li>
      `;
    });
    memberList += /* html */ `</ul>`;
  }
  memberCont.innerHTML = memberList;

  document.querySelector(".ButtonStar").addEventListener("click", (e) => bookmarkFunc(id, e));
  document.querySelector(".Participate")?.addEventListener("click", () => participate(id, uid));
  document.querySelector(".ProfileImg").addEventListener("click", () => {
    const ProfileToolTip = document.querySelector(".ProfileToolTip");
    if (!ProfileToolTip) {
      location.href = "/mypage/";
      return;
    }
    ProfileToolTip.style.display = "block";
  });
  document.querySelector(".Profile")?.addEventListener("click", () => {
    location.href = `/userInfo/?uid=${uid}`;
  });
  document.querySelector(".Chat")?.addEventListener("click", () => goPrivateChat(Number(uid)));
  document.querySelector(".btnChatCrew")?.addEventListener("click", () => goCrewChat(Number(id)));
  document.querySelectorAll(".ProfileMember").forEach((e) => e.addEventListener("click", () => {
    const uid = e.closest(".memberList").getAttribute("data-uid");
    location.href = Number(uid) === userData.uid ? `/mypage/` : `/userInfo/?uid=${uid}`;
  }));
});

const renderPostButton = (isLogin, id, userData, data) => {
  if (!isLogin) return /* html */ `<li><button type="button" class="Participate ButtonFull3 Disabled" disabled>참여하기</button></li>`;
  const chatData = JSON.parse(localStorage.getItem("chatData"));
  const chatRoom = chatData.find((e) => e.type === "crew" && e.reqId === Number(id) && e.users.includes(userData.uid));
  if (chatRoom) {
    return /* html */ `<li><button class="btnChatCrew ButtonFull3">채팅하기</button></li>`;
  }
  if (getDateDiff(data.endDate, new Date()) >= 1) {
    return /* html */ `<li><button type="button" class="Participate ButtonFull3">참여하기</button></li>`;
  }
  return /* html */ `<li><button type="button" class="Participate ButtonFull3 Disabled" disabled>참여하기</button></li>`;
};