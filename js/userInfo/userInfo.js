import { getDateDiff } from "../common.js";
import { bookmarkFunc } from "../post/postBookmark.js";
import { participate } from "../modal/participateModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const uid = urlParams.get("uid");
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  renderMemberData(uid, member);
  renderRecruiting(uid, member, isLogin);
});

const renderCategory = (data) => {
  let categoryList = "";
  data.forEach((e) => {
    const categoryName = (e === "기타취미" || e === "기타스터디") ? "기타" : e;
    categoryList += /* html */ `<span>${categoryName}</span>`;
  });
  return categoryList;
};

const renderMemberData = (uid, member) => {
  const ProfileSect = document.querySelector(".ProfileSect .SectionWrap850");
  ProfileSect.innerHTML = /* html */ `
    <div class="ProfileTop">
      <div class="ProfileImg" style="background-color: ${member.profileBg}">
        <img src="/assets/images/${member.profile}" alt="">
      </div>
      <div class="ProfileName">
        <p>${member.nickname}</p>
        <button class="BtnChat">채팅</button>
      </div>
      <div class="ProfileMessage">
        <p>${member.descript}</p>
      </div>
    </div>
    <div class="ProfileTag">
      <div class="Tags">
        <h3>관심분야(스터디)</h3>
        <div class="TagWrap Study">
          ${renderCategory(member.study)}
        </div>
      </div>
      <div class="Tags">
        <h3>관심분야(취미)</h3>
        <div class="TagWrap Hobby">
          ${renderCategory(member.hobby)}
        </div>
      </div>
    </div>
  `;
};

const postEventFunc = () => {
  const urlParams = new URLSearchParams(location.search);
  const uid = urlParams.get("uid");
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));

  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => {
      const { target } = evt;
      const id = e.getAttribute("data-id");
      const uid = e.getAttribute("data-uid");
      if (target.classList[0] === "Star") {
        bookmarkFunc(id, evt)
        return;
      }
      if (target.classList[0] === "Participate") {
        if (target.closest(".PostCard").classList.contains("Disable")) return;
        participate(id, uid);
        return;
      }
      if (target.classList.contains("ProfileImg")) {
        if (!e.querySelector(".ProfileToolTip")) {
          location.href = "/mypage/";
          return;
        }
        e.querySelector(".ProfileToolTip").style.display = "block";
        return;
      }
      if (target.classList.contains("Profile")) {
        location.href = `/userInfo/?uid=${uid}`;
        return;
      }
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
  });

  document.querySelector(".ButtonRecruit").addEventListener("click", ({ target }) => {
    if (target.classList.contains("On")) return;
    target.classList.add("On");
    document.querySelector(".ButtonParticipate").classList.remove("On");
    renderRecruiting(uid, member, isLogin);
  });
  document.querySelector(".ButtonParticipate").addEventListener("click", ({ target }) => {
    if (target.classList.contains("On")) return;
    target.classList.add("On");
    document.querySelector(".ButtonRecruit").classList.remove("On");
    renderParticipating(uid, member, isLogin);
  });
}

const renderRecruiting = (uid, member, isLogin) => {
  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  const postData = JSON.parse(localStorage.getItem("postData")).filter((e) => e.uid === Number(uid));
  postData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    postList += /*html*/ `
      <li data-id="${e.id}" data-uid="${e.uid}">
        <div class="PostCard ${getDateDiff(e.endDate, new Date()) < 1 ? "Disable" : ""}">
          <div class="PostCardHead">
            <div class="ProfileBox" style="background-color:${e.profileBg}">
              <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
            </div>
            <div class="TextBox">
              <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
              <p class="Date">${endDate} (${endDay})</p>
              <p class="Name">${e.nickname}</p>
            </div>
            <div class="ProfileToolTip">
              <p class="ToolTipName">${member.nickname}</p>
              <div class="ToolTipBtn">
                <button class="Chat"></button>
                <button class="Profile">프로필 확인</button>
              </div>
            </div>
          </div>
          <div class="PostCardBody">
            <div class="TextBox">
              <div class="TitleBox">
                <h5>${e.title}</h5>
                <div class="Star ${isLogin && e.bookmarked && "On"}"></div>
              </div>
              <div class="TextList">
                <p class="Category ${e.category}">${categoryName}</p>
                <p>${e.place}</p>
                <p>${e.nowPop}/${e.fullPop}명</p>
                <p>조회수 ${e.read}</p>
              </div>
            </div>
            <div class="ButtonBox">
              <button class="Detail">상세보기</button>
              <button class="Participate">참여하기</button>
            </div>
          </div>
        </div>
      </li>
    `;
  });
  PostCont.innerHTML = postList;
  postEventFunc();
};

const renderParticipating = (uid, member, isLogin) => {
  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  const postData = JSON.parse(localStorage.getItem("postData")).filter((e) => e.accept.includes(Number(uid)) && e.uid !== Number(uid));
  postData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    postList += /*html*/ `
      <li data-id="${e.id}" data-uid="${e.uid}">
        <div class="PostCard ${getDateDiff(e.endDate, new Date()) < 1 ? "Disable" : ""}">
          <div class="PostCardHead">
            <div class="ProfileBox" style="background-color:${e.profileBg}">
              <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
            </div>
            <div class="TextBox">
              <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
              <p class="Date">${endDate} (${endDay})</p>
              <p class="Name">${e.nickname}</p>
            </div>
            <div class="ProfileToolTip">
              <p class="ToolTipName">${member.nickname}</p>
              <div class="ToolTipBtn">
                <button class="Chat"></button>
                <button class="Profile">프로필 확인</button>
              </div>
            </div>
          </div>
          <div class="PostCardBody">
            <div class="TextBox">
              <div class="TitleBox">
                <h5>${e.title}</h5>
                <div class="Star ${isLogin && e.bookmarked && "On"}"></div>
              </div>
              <div class="TextList">
                <p class="Category ${e.category}">${categoryName}</p>
                <p>${e.place}</p>
                <p>${e.nowPop}/${e.fullPop}명</p>
                <p>조회수 ${e.read}</p>
              </div>
            </div>
            <div class="ButtonBox">
              <button class="Detail">상세보기</button>
              <button class="Participate">참여하기</button>
            </div>
          </div>
        </div>
      </li>
    `;
  });
  PostCont.innerHTML = postList;
  postEventFunc();
};