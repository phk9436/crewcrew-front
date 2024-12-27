import { getDateDiff, setDateFormat } from "../common.js";

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

  document.querySelectorAll(".BtnMember").forEach((e) => {
    e.addEventListener("click", () => {
      const id = e.closest(".postItem").getAttribute("data-id");
      const uid = e.closest(".swiper-slide").getAttribute("data-uid");
      const reqId = e.closest(".postItem").getAttribute("data-reqid");
      let type = "";
      if (e.classList.contains("BtnDeny")) type = "deny";
      if (e.classList.contains("BtnAccept")) type = "accept";
      if (e.classList.contains("BtnExport")) type = "export";
      manageMember(id, uid, type, reqId);
      renderPost();
      cardEventFunc();
    });
  });

  document.querySelectorAll(".ClosePost").forEach((e) => {
    e.addEventListener("click", () => {
      const id = e.closest(".postItem").getAttribute("data-id");
      const reqId = e.closest(".postItem").getAttribute("data-reqid");
      deletePost(id, reqId);
      renderPost();
      cardEventFunc();
    });
  });

  document.querySelector(".ProfileImg")?.addEventListener("click", ({ target }) => {
    const uid = target.closest(".swiper-slide").getAttribute("data-uid");
    location.href = `/userInfo/?uid=${uid}`;
  });
};

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
      <li class="swiper-slide" data-uid="${e.uid}">
        <div class="SwiperCard">
          <div class="SwiperCardHead">
            <div class="CardProfile" style="background-color: ${e.profileBg}">
             <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
            </div>
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
            ${type === "waiting" ? `<button class="BtnColor Nega BtnDeny BtnMember">거절</button><button class="BtnColor Posi BtnAccept BtnMember">수락</button>` : `<button class="BtnColor Nega BtnExport BtnMember">내보내기</button>`}
          </div>
        </div>
      </li>
    `;
  });
  return memberList;
};

const renderPost = () => {
  const recruitingData = JSON.parse(localStorage.getItem("recruitingData"));
  document.querySelector(".postAll").innerText = recruitingData.length;
  document.querySelector(".postStudy").innerText = recruitingData.filter((e) => e.category === "Study").length;
  document.querySelector(".postHobby").innerText = recruitingData.filter((e) => e.category === "Hobby").length;
  let postList = "";
  const postCont = document.querySelector(".PostWrapper ul");
  postCont.innerHTML = "";
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
      <li data-id="${e.id}" data-reqId="${e.reqId}" class="postItem">
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

const manageMember = (id, uid, type, reqId) => {
  let recruitingData = JSON.parse(localStorage.getItem("recruitingData"));
  let recruitingPost = recruitingData.find((e) => e.id === Number(id));
  let postData = JSON.parse(localStorage.getItem("postData"));
  let managingPost = postData.find((e) => e.id === Number(reqId));
  let { waiting, accept } = recruitingPost;
  if (type === "accept") {
    accept.unshift(waiting.find((e) => e.uid === Number(uid)));
    waiting = waiting.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      waiting,
      accept
    }
    managingPost = {
      ...managingPost,
      waiting: waiting.map((e) => e.uid),
      accept: [0, ...accept.map((e) => e.uid)]
    }
  }
  if (type === "deny") {
    waiting = waiting.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      waiting
    }
    managingPost = {
      ...managingPost,
      waiting: waiting.map((e) => e.uid)
    }
  }
  if (type === "export") {
    accept = accept.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      accept
    }
    managingPost = {
      ...managingPost,
      accept: [0, ...accept.map((e) => e.uid)]
    }
  }
  recruitingData = recruitingData.map((e) => {
    if (e.id !== Number(id)) return e;
    return recruitingPost;
  });
  postData = postData.map((e) => {
    if (e.id !== Number(reqId)) return e;
    return managingPost;
  });
  localStorage.setItem("recruitingData", JSON.stringify(recruitingData));
  localStorage.setItem("postData", JSON.stringify(postData));
};

const deletePost = (id, reqId) => {
  //타임라인
  let recruitingData = JSON.parse(localStorage.getItem("recruitingData"));
  let timelineData = JSON.parse(localStorage.getItem("timelineData"));
  const timelinePost = recruitingData.find((e) => e.id === Number(id));
  const categoryName = (timelinePost.categoryName === "기타취미" || timelinePost.categoryName === "기타스터디") ? "기타" : timelinePost.categoryName;
  const newTimelineData = {
    id: timelineData.length ? timelineData.length + 1 : 1,
    reqId: timelinePost.reqId,
    reqName: timelinePost.title,
    type: "모집취소",
    story: "Nega",
    date: setDateFormat(0),
    categoryName,
    category: timelinePost.category,
  };
  timelineData.unshift(newTimelineData);
  localStorage.setItem("timelineData", JSON.stringify(timelineData));
  //크루목록
  recruitingData = recruitingData.filter((e) => e.id !== Number(id));
  localStorage.setItem("recruitingData", JSON.stringify(recruitingData));
  //게시글목록
  let postData = JSON.parse(localStorage.getItem("postData"));
  postData = postData.filter((e) => e.id !== Number(reqId));
  localStorage.setItem("postData", JSON.stringify(postData));
};