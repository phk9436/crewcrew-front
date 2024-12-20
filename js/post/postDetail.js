import { getDateDiff } from "../common.js";
import { participate } from "../modal/participateModal.js";
import { bookmarkFunc } from "./postBookmark.js";

document.addEventListener(("DOMContentLoaded"), () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
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

  //최근 본 게시글목록에 추가
  const viewindex = Math.max(...postData.map((e) => e.viewindex));
  const updatedData = postData.map((e) => {
    if (e.id !== Number(id)) return e;
    return { ...e, viewindex: viewindex + 1 };
  });
  localStorage.setItem("postData", JSON.stringify(updatedData));

  const isLogin = sessionStorage.getItem("isLogin");
  const data = postData.find((e) => e.id === Number(id));
  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const endDate = `${data.endDate.split("-")[1]}/${data.endDate.split("-")[2]}`;
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const endDay = days[new Date(data.endDate).getDay()];
  const postSection = document.querySelector(".PostDetail .SectionWrap850");
  const postDetail = /*html*/ `
    <ul>
      <li>
        <div class="ProfileWrapper" style="background-color: ${data.profileBg}">
          <img src="/assets/images/${data.profile}" alt="">
        </div>
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
      <li data-id="${data.id}"><button type="button" class="ButtonFullGhost ButtonStar Star ${isLogin && data.bookmarked && "On"}"></button></li>
      ${isLogin ? `<li><button type="button" class="Participate ButtonFull3 ${getDateDiff(data.endDate, new Date()) < 1 ? "Disabled" : ""}">참여하기</button></li>` : ''}
    </ul>
    <ul>
      <li class="${data.category}">${categoryName}</li>
      <li>${data.place}</li>
      <li>${data.nowPop}/${data.fullPop}명</li>
      <li>조회수 ${data.read}</li>
    </ul>
    <div class="textarea">
      <textarea name="" id="" class="TxtAreaInput" readonly>${data.content}</textarea>
    </div>
  `;
  postSection.innerHTML = postDetail;

  document.querySelector(".ButtonStar").addEventListener("click", (e) => bookmarkFunc(id, e));
  document.querySelector(".Participate").addEventListener("click", () => participate(id));
});