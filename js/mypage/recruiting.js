import { getDateDiff } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  renderPost();
  cardEventFunc();
});

const cardEventFunc = () => {
  const SwiperCard = document.querySelector(".SwiperCardBottom");
  let SwiperCardHeight;
  function SwiperHeightFunc() {
    //스와이퍼카드 원래 높이 구하기
    if (SwiperCard) {
      SwiperCard.style.height = "auto";
      SwiperCardHeight = SwiperCard.clientHeight;
      SwiperCard.style.height = 0;
    }
  }
  SwiperHeightFunc();
  window.addEventListener("resize", SwiperHeightFunc);

  const SwiperBtn = document.querySelectorAll(".SwiperBtn");
  SwiperBtn.forEach((e) => {
    //스와이퍼카드 드롭다운
    e.addEventListener("click", () => {
      let ThisSwiperCard = e.closest(".SwiperCardWrapper").children[0];
      ThisSwiperCard.classList.toggle("On");
      if (ThisSwiperCard.classList.contains("On")) {
        ThisSwiperCard.children[1].style.height = `${SwiperCardHeight}px`;
      } else {
        ThisSwiperCard.children[1].style.height = 0;
      }
    });
  });

  const CardToggle = document.querySelectorAll(".CardToggle");
  const ToggleBtn = document.querySelectorAll(".ToggleBtn");
  const CardToggleText = document.querySelectorAll(".CardToggle p");
  ToggleBtn?.forEach((e, i) => {
    e.addEventListener("click", () => {
      CardToggle[i].classList.toggle("On");
      document.querySelectorAll(".Accept")[i].classList.toggle("On");
      document.querySelectorAll(".Waiting")[i].classList.toggle("On");
      CardToggle[i].children[0].inert = !CardToggle[i].children[0].inert;
      CardToggle[i].children[2].inert = !CardToggle[i].children[2].inert;
      e.closest(".PostCard.Swiper").classList.add("On");
      e.closest(".PostCard.Swiper").children[1].style.height = `${SwiperCardHeight}px`;
    });
  });

  CardToggleText?.forEach((e) => {
    e.addEventListener("click", function () {
      e.closest(".CardToggle").children[1].click();
    });
  });
}

const renderMember = (member, type) => {
  if (member.length === 0) {
    const noContent = type === "waiting"
      ? /* html */ `
        <li class="noContent">
          <p>
            <em>대기자가 없습니다.</em><br>
            참여신청이 올 때까지 조금만 기다려주세요!
          </p>
        </li>
      `
      : /* html */ `
        <li class="noContent">
          <p>
            <em>참여자가 없습니다.</em><br>
            대기자들을 수락해주세요!
          </p>
        </li>
      `;
    return noContent;
  }
  let memberList = "";
  member.forEach((e) => {
    memberList += /* html */ `
      <li class="swiper-slide">
        <div class="SwiperCard">
          <div class="SwiperCardHead">
            <div class="CardProfile" style="background-color: ${e.profileBg}"><img src="/assets/images/${e.profile}" alt=""></div>
            <div class="CardTxt">
              <h4>${e.name}</h4>
              <p>${e.descript}</p>
            </div>
          </div>
          <div class="SwiperCardBody">
            <p>${e.message}</p>
          </div>
        </div>
        <div class="SwiperSlideBtn">
          <p>${e.date.split("-")[1]}/${e.date.split("-")[2]} 요청</p>
          <div class="BtnWrapper">
            <button class="BtnChat">채팅</button>
            ${type === "waiting" ? `<button class="BtnColor Nega BtnDeny">거절</button><button class="BtnColor Posi BtnAccept">수락</button>` : `<button class="BtnColor Posi BtnExport">내보내기</button>`}
          </div>
        </div>
      </li>
    `;
  });
  return memberList;
}

const renderPost = () => {
  const recruitingData = JSON.parse(localStorage.getItem("recruitingData"));
  let postList = "";
  const postCont = document.querySelector(".PostWrapper ul");
  if (recruitingData.length === 0) {
    postCont.innerHTML = /* html */ `
      <li class="noContent">
        <p>
          <em>모집한 크루가 없습니다.</em><br>
          원하는 크루를 직접 모집해보세요!
        </p>
        <button class="ButtonFull3 createButton">크루 모집하기</button>
      </li>
    `;
    return;
  }
  recruitingData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    postList += /* html */ `
      <li data-id="${e.id}" data-reqId="${e.reqId}">
        <div class="SwiperCardWrapper">
          <div class="PostCard Swiper">
            <div class="SwiperCardTop">
              <div class="CardTopHeader">
                <div class="PostCardHead">
                  <div class="TextBox">
                    <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
                  </div>
                  <div class="DetailBox">
                    <p><span>(${e.accept.length + 1}/10명)</span> ${getDateDiff(e.endDate, new Date()) >= 1 ? "모집중" : "모집마감"}</p>
                    <button class="Detail">크루채팅</button>
                  </div>
                </div>
                <div class="PostCardBody">
                  <div class="TextBox">
                    <div class="TitleBox">
                      <h5>${e.title}</h5>
                    </div>
                    <div class="TextList">
                      <p class="Category ${e.category}">${categoryName}</p>
                      <p>${e.place}</p>
                    </div>
                    <div class="RightBtnBox">
                      <button class="ClosePost">모집취소</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="CardTopFooter">
                <p>참여자 및 대기자 관리</p>
                <div class="CardToggle">
                  <p inert>참여자 ${e.accept.length}명</p>
                  <div class="ToggleBtn">
                    <div class="ToggleIndicator"></div>
                  </div>
                  <p>대기자 ${e.waiting.length}명</p>
                </div>
                <div class="SwiperBtn"></div>
              </div>
            </div>
            <div class="SwiperCardBottom">
              <div class="Accept On">
                <div class="CardSwiper swiper1">
                  <ul class="SlideWrapper swiper-wrapper">
                    ${renderMember(e.accept, "accept")}
                  </ul>
                </div>
              </div>
              <div class="Waiting">
                <div class="CardSwiper swiper1">
                  <ul class="SlideWrapper swiper-wrapper">
                    ${renderMember(e.waiting, "waiting")}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="ButtonPrev1 ButtonPrev swiper-button-disabled"></div>
          <div class="ButtonNext1 ButtonNext"></div>
        </div>
      </li>
    `;
    postCont.innerHTML = postList;
  });
};