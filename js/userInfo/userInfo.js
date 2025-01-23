import { goPrivateChat } from "../common.js";
import { bookmarkFunc } from "../post/postBookmark.js";
import { participate } from "../modal/participateModal.js";
import { postItem } from "../components/postItem.js";

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
      if (target.classList.contains("Chat")) {
        goPrivateChat(Number(uid));
        return;
      }
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
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