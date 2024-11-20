import { bookmarkFunc } from "../post/postBookmark.js";
import { getDateDiff } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData)

  //내정보 렌더링
  const myInfoBox = document.querySelector(".myInfoBox");
  let myData = /*html*/ `
    <div class="myInfoTop">
      <h3>내 정보</h3>
    </div>
    <div class="myInfoBody">
      <div class="myInfoInputList">
        <div class="InputTop">
          <div class="Profile" style="background-color: ${userData.profileBg}">
            <img src="/assets/images/${userData.profile}" alt="">
          </div>
          <div class="InputWrap">
            <input type="text" class="InputFull InputSetting" readonly value="${userData.nickname}">
          </div>
        </div>
        <div class="InputBottom InputWrap">
          <textarea class="TxtAreaInput InputSetting" readonly>${userData.message}</textarea>
        </div>
      </div>
      <div class="myInfoCat">
        <div class="CatBox">
          <h5>관심분야(스터디)</h5>
          <ul class="CatList">
  `;
  userData.study.forEach((e) => {
    myData += /*html*/ `
      <li>
        <p class="FilterLabel Study">${e}</p>
      </li>
    `;
  });
  myData += /*html*/ `
    </ul>
    </div>
    <div class="CatBox">
      <h5>관심분야(취미)</h5>
      <ul class="CatList">
  `;
  userData.hobby.forEach((e) => {
    myData += /*html*/ `
      <li>
        <p class="FilterLabel Hobby">${e}</p>
      </li>
    `;
  });
  myData += /*html*/ `
          </ul>
        </div>
      </div>
    </div>
  `;
  myInfoBox.innerHTML = myData;

  //하단 게시글목록 렌더링
  const postWrapper = document.querySelector(".PostWrapper ul");
  const renderBookmark = () => {
    const postData = JSON.parse(localStorage.getItem("postData"));
    const bookmarkedData = postData.filter((e) => e.bookmarked).sort((a, b) => b.bookmarked - a.bookmarked);
    let postList = "";
    if (bookmarkedData.length) {
      bookmarkedData.forEach((e) => {
        const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
        const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
        const days = ['월', '화', '수', '목', '금', '토', '일'];
        const endDay = days[new Date(e.endDate).getDay()];
        postList += /*html*/ `
        <li data-id="${e.id}">
          <div class="PostCard ${getDateDiff(e.endDate, new Date()) < 1 ? "Disable" : ""}">
            <div class="PostCardHead">
              <div class="ProfileBox" style="background-color:${e.profileBg}">
                <img src="/assets/images/${e.profile}" alt="">
              </div>
              <div class="TextBox">
                <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
            </div>
            <div class="PostCardBody">
              <div class="TextBox">
                <div class="TitleBox">
                  <h5>${e.title}</h5>
                  <div class="Star ${e.bookmarked && "On"}"></div>
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
    } else {
      postList += /*html*/ `
        <li class="Nocontent">
          <p>
            <em>찜한 크루가 없습니다.</em><br>
            모집 크루들을 둘러보고 <br class="fold">관심가는 크루에 참여해보세요!
          </p>
          <a class="ButtonFull3 ButtonSmall" href="/post/">크루참여하러 가기</a>
        </li>
      `;
    }
    postWrapper.innerHTML = postList;
    document.querySelectorAll(".PostWrapper li").forEach((e) => {
      e.addEventListener("click", (evt) => {
        const { target } = evt;
        const id = e.getAttribute("data-id");
        if (target.classList[0] === "Star") {
          bookmarkFunc(id, evt);
          return;
        }
        if (target.classList[0] === "Participate") return;
        location.href = `/post/detail/?id=${id}`;
      });
    });
  };

  const renderRecentView = () => {
    const postData = JSON.parse(localStorage.getItem("postData"));
    const recentViewData = postData.filter((e) => e.viewindex).sort((a, b) => b.bookmarked - a.bookmarked).filter((e, i) => i <= 4);
    let postList = "";
    if (recentViewData.length) {
      recentViewData.forEach((e) => {
        const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
        const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
        const days = ['월', '화', '수', '목', '금', '토', '일'];
        const endDay = days[new Date(e.endDate).getDay()];
        postList += /*html*/ `
        <li data-id="${e.id}">
          <div class="PostCard ${getDateDiff(e.endDate, new Date()) < 1 ? "Disable" : ""}">
            <div class="PostCardHead">
              <div class="ProfileBox" style="background-color:${e.profileBg}">
                <img src="/assets/images/${e.profile}" alt="">
              </div>
              <div class="TextBox">
              <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
            </div>
            <div class="PostCardBody">
              <div class="TextBox">
                <div class="TitleBox">
                  <h5>${e.title}</h5>
                  <div class="Star ${e.bookmarked && "On"}"></div>
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
      postList += /*html*/`
        <li class="listLast">최근 본 크루 중 최대 5개까지만 노출됩니다.</li>
      `;
    } else {
      postList += /*html*/ `
        <li class="Nocontent">
          <p>
            <em>최근 본 크루가 없습니다.</em><br>
            모집 크루들을 둘러보고 <br class="fold">관심가는 크루에 참여해보세요!
          </p>
          <a class="ButtonFull3 ButtonSmall" href="/post/">크루참여하러 가기</a>
        </li>
      `;
    }
    postWrapper.innerHTML = postList;
    document.querySelectorAll(".PostWrapper li").forEach((e) => {
      e.addEventListener("click", (evt) => {
        const { target } = evt;
        const id = e.getAttribute("data-id");
        if (target.classList[0] === "Star") {
          bookmarkFunc(id, evt);
          return;
        }
        if (target.classList[0] === "Participate") return;
        location.href = `/post/detail/?id=${id}`;
      });
    });
  };
  renderBookmark();

  const listBtns = document.querySelectorAll(".ListTap li");
  listBtns.forEach((e, i) => e.addEventListener("click", () => {
    listBtns.forEach((e) => e.querySelector("button").classList.remove("On"));
    e.querySelector("button").classList.add("On");
    i === 0 ? renderBookmark() : renderRecentView();
  }));
});