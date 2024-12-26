import { bookmarkFunc } from "../post/postBookmark.js";
import { getDateDiff } from "../common.js";
import { participate } from "../modal/participateModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));

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

  //크루 현황 관리
  const crewBox = document.querySelectorAll(".CrewBox");
  const waitingData = JSON.parse(localStorage.getItem("waitingData")).filter((e) => e.state === "waiting");
  crewBox[0].querySelector(".Num span").innerText = waitingData.length;
  crewBox[0].querySelector(".study").innerText = waitingData.filter((e) => e.category === "Study").length;
  crewBox[0].querySelector(".hobby").innerText = waitingData.filter((e) => e.category === "Hobby").length;
  const recruitingData = JSON.parse(localStorage.getItem("recruitingData"));
  crewBox[1].querySelector(".Num span").innerText = recruitingData.length;
  crewBox[1].querySelector(".study").innerText = recruitingData.filter((e) => e.category === "Study").length;
  crewBox[1].querySelector(".hobby").innerText = recruitingData.filter((e) => e.category === "Hobby").length;

  //타임라인 렌더링
  const timeline = document.querySelector(".TimeLine");
  let timelineList = "";
  const timelineData = JSON.parse(localStorage.getItem("timelineData"));
  const setTimelineText = (data) => {
    if (data.type === "참여요청") {
      return /* html */ `
        <p><span class="Name">${data.reqName}</span> 크루에 <span class="${data.story}">참여요청</span> 하였습니다.</p>
        <a href="/mypage/waiting/" class="timelineBtn">상세보기</a>
      `;
    }
    if (data.type === "참여취소") {
      return /* html */ `
        <p><span class="Name">${data.reqName}</span> 크루에 <span class="${data.story}">참여취소</span> 하였습니다.</p>
        <a href="/mypage/waiting/" class="timelineBtn">상세보기</a>
      `;
    }
    if (data.type === "크루모집") {
      return /* html */ `
        <p><span class="Name">${data.reqName}</span> 크루를 <span class="${data.story}">모집</span> 하였습니다.</p>
        <a href="/mypage/recruiting/" class="timelineBtn">상세보기</a>
      `;
    }
    if (data.type === "크루신청") {
      return /* html */ `
        <p><span class="Name">${data.reqName}</span> 님이 모집중인 크루에 <span class="${data.story}">참여신청</span> 하였습니다.</p>
        <a href="/mypage/recruiting/" class="timelineBtn">상세보기</a>
      `;
    }
    if (data.type === "모집취소") {
      return /* html */ `
        <p><span class="Name">${data.reqName}</span> 크루를 <span class="${data.story}">모집취소</span> 하였습니다.</p>
        <a href="/mypage/recruiting/" class="timelineBtn">상세보기</a>
      `;
    }
  };
  if (timelineData.length) {
    timelineData.filter((e, i) => i <= 3).forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const timeDate = `${e.date.split("-")[0]}/${e.date.split("-")[1]}/${e.date.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const timeDay = days[new Date(e.date).getDay()];
      timelineList += /* html */ `
      <div class="Content ${e.story}">
        <div class="ContentTop">
          <h5 class="${e.category}">${categoryName}</h5>
          <p>${timeDate} (${timeDay})</p>
        </div>
        <div class="ContentBottom">
          ${setTimelineText(e)}
        </div>
      </div>
      `;
    });
  } else {
    timeline.classList.add("noContent");
    timelineList = /* html */ `
        <p>
          <em>현재 활동내역이 없습니다.</em><br>
          모집크루들을 둘러보고 활동 이력을 남겨 보세요!
        </p>
        <a href="/post/" class="ButtonFull3 ButtonSmall">크루참여하러 가기</a>
    `;
  }
  timeline.innerHTML = timelineList;

  //하단 게시글목록 렌더링
  const postWrapper = document.querySelector(".PostWrapper ul");
  const renderBookmark = () => {
    const postData = JSON.parse(localStorage.getItem("postData"));
    const memberData = JSON.parse(localStorage.getItem("memberData"));
    const bookmarkedData = postData.filter((e) => e.bookmarked).sort((a, b) => b.bookmarked - a.bookmarked);
    let postList = "";
    if (bookmarkedData.length) {
      bookmarkedData.forEach((e) => {
        const member = memberData.find((el) => el.uid === Number(e.uid));
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
              ${member ? /* html */ `
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
        const uid = e.getAttribute("data-uid");
        if (target.classList[0] === "Star") {
          bookmarkFunc(id, evt);
          return;
        }
        if (target.classList[0] === "Participate") {
          if(target.closest(".PostCard").classList.contains("Disable")) return;
          participate(id, uid);
          return;
        };
        if (target.classList.contains("ProfileImg")) {
          if (!e.querySelector(".ProfileToolTip")) return;
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
  };

  const renderRecentView = () => {
    const postData = JSON.parse(localStorage.getItem("postData"));
    const memberData = JSON.parse(localStorage.getItem("memberData"));
    const recentViewData = postData.filter((e) => e.viewindex).sort((a, b) => b.bookmarked - a.bookmarked).filter((e, i) => i <= 4);
    let postList = "";
    if (recentViewData.length) {
      recentViewData.forEach((e) => {
        const member = memberData.find((el) => el.uid === Number(e.uid));
        const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
        const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
        const days = ["월", "화", "수", "목", "금", "토", "일"];
        const endDay = days[new Date(e.endDate).getDay()];
        postList += /*html*/ `
          <li data-id="${e.id}">
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
                ${member ? /* html */ `
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
        const uid = e.getAttribute("data-uid");
        if (target.classList[0] === "Star") {
          bookmarkFunc(id, evt);
          return;
        }
        if (target.classList[0] === "Participate") {
          if(target.closest(".PostCard").classList.contains("Disable")) return;
          participate(id, uid);
          return;
        }
        if (target.classList.contains("ProfileImg")) {
          if (!e.querySelector(".ProfileToolTip")) return;
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
  };
  renderBookmark();

  const listBtns = document.querySelectorAll(".ListTap li");
  listBtns.forEach((e, i) => e.addEventListener("click", () => {
    listBtns.forEach((e) => e.querySelector("button").classList.remove("On"));
    e.querySelector("button").classList.add("On");
    i === 0 ? renderBookmark() : renderRecentView();
  }));
});