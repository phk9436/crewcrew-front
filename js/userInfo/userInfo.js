import { goPrivateChat } from "../common.js";
import { postItem, postItemEvt } from "../components/postItem.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const uid = urlParams.get("uid");
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const member = memberData.find((e) => e.uid === Number(uid));
  renderMemberData(member);
  renderRecruiting(uid);
  const chatBtn = document.querySelector(".BtnChat");
  chatBtn.addEventListener("click", () => goPrivateChat(Number(uid)));
  document.title = `크루원/${member.nickname} - 크루크루`;
});

const renderCategory = (data) => {
  let categoryList = "";
  data.forEach((e) => {
    const categoryName = (e === "기타취미" || e === "기타스터디") ? "기타" : e;
    categoryList += /* html */ `<span>${categoryName}</span>`;
  });
  return categoryList;
};

const renderMemberData = (member) => {
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

  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => postItemEvt(e, evt));
  });

  document.querySelector(".ButtonRecruit").addEventListener("click", ({ target }) => {
    if (target.classList.contains("On")) return;
    target.classList.add("On");
    document.querySelector(".ButtonParticipate").classList.remove("On");
    renderRecruiting(uid);
  });
  document.querySelector(".ButtonParticipate").addEventListener("click", ({ target }) => {
    if (target.classList.contains("On")) return;
    target.classList.add("On");
    document.querySelector(".ButtonRecruit").classList.remove("On");
    renderParticipating(uid);
  });
};

const renderRecruiting = (uid) => {
  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  const postData = JSON.parse(localStorage.getItem("postData")).filter((e) => e.uid === Number(uid));
  postData.forEach((e) => postList += postItem(e));
  PostCont.innerHTML = postList;
  postEventFunc();
};

const renderParticipating = (uid) => {
  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  const postData = JSON.parse(localStorage.getItem("postData")).filter((e) => e.accept.includes(Number(uid)) && e.uid !== Number(uid));
  postData.forEach((e) => postList += postItem(e));
  PostCont.innerHTML = postList;
  postEventFunc();
};