import { getDateDiff } from "../common.js";
import { participate } from "../modal/participateModal.js";
import { openPostmodal } from "../modal/postmodal.js";
import { bookmarkFunc } from "./postBookmark.js";
import { saveFilterList } from "./postFilter.js";

window.addEventListener("DOMContentLoaded", function () {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const FilterWrap = document.querySelector(".FilterWrapper");
  window.addEventListener("scroll", () => { //스크롤 시 필터 sticky기능
    if (window.innerWidth >= 768) {
      window.scrollY >= 358
        ? FilterWrap.classList.add("Fixed")
        : FilterWrap.classList.remove("Fixed");
      return;
    }
    window.scrollY >= 240
      ? FilterWrap.classList.add("Fixed")
      : FilterWrap.classList.remove("Fixed");
  });

  const filterButton = document.querySelector(".FilterButton");
  const filterDown = document.querySelector(".FliterListWrapper");
  const filterArrow = document.querySelector(".FilterArrow");
  filterButton?.addEventListener("click", () => { //모바일 필터 펼치기
    filterDown.classList.toggle("On");
    filterArrow.classList.toggle("On");
  });

  const filterAll = document.querySelector("#CategoryAll");
  const filterCat = document.querySelectorAll(".FilterCategory");
  filterAll.addEventListener("click", ({ target }) => {
    filterCat.forEach((e) => { //전체 체크 시 카테고리 체크 해제
      if (target.checked) e.checked = false;
    });
  });
  filterCat.forEach((e) => {
    e.addEventListener("click", () => { //카테고리 체크 시 전체 체크 해제
      if (e.checked) filterAll.checked = false;
    });
  });

  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  let renderData;
  const renderPost = () => {
    renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
    renderData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const endDay = days[new Date(e.endDate).getDay()];
      const member = memberData.find((el) => el.uid === Number(e.uid));
      postList += /*html*/ `
        <li data-id="${e.id}" data-uid="${e.uid}">
          <div class="PostCard">
            <div class="PostCardHead">
              <div class="ProfileBox" style="background-color:${e.profileBg}">
                <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
              </div>
              <div class="TextBox">
                <p class="Dday">D-${getDateDiff(e.endDate, new Date())}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
              ${Number(e.uid) !== userData?.uid ? /* html */ `
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
                  <h5>${e.title}</h5>
                  <div class="Star ${isLogin && userData.bookmarked.includes(e.id) && "On"}"></div>
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
  }

  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("search");
  const renderSearchPost = () => {
    renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0).filter((e) => e.title.indexOf(search) !== -1);
    if (renderData.length === 0) {
      PostCont.innerHTML = /* html */ `
        <li class="noContent">
          <p>
            <em>검색결과가 없습니다.</em><br>
            원하는 크루를 직접 모집해보세요!
          </p>
          <button class="ButtonFull3 createButton">크루 모집하기</button>
        </li>
      `;
      return;
    }
    renderData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const endDay = days[new Date(e.endDate).getDay()];
      const member = memberData.find((el) => el.uid === Number(e.uid));
      postList += /*html*/ `
        <li data-id="${e.id}" data-uid="${e.uid}">
          <div class="PostCard">
            <div class="PostCardHead">
              <div class="ProfileBox" style="background-color:${e.profileBg}">
                <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
              </div>
              <div class="TextBox">
                <p class="Dday">D-${getDateDiff(e.endDate, new Date())}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
              ${Number(e.uid) !== userData?.uid ? /* html */ `
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
                  <h5>${e.title}</h5>
                  <div class="Star ${isLogin && userData.bookmarked.includes(e.id) && "On"}"></div>
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
  }

  search ? renderSearchPost() : renderPost();

  document.querySelector(".ButtonFillter").addEventListener("click", () => saveFilterList(renderData));
  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => {
      const { target } = evt;
      const id = e.getAttribute("data-id");
      const uid = e.getAttribute("data-uid");
      if (target.classList[0] === "noContent" || target.closest(".noContent")) {
        if (target.classList.contains("createButton")) {
          openPostmodal("Study", evt);
        }
        return;
      };
      if (target.classList[0] === "Star") {
        bookmarkFunc(id, evt)
        return;
      }
      if (target.classList[0] === "Participate") {
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


});