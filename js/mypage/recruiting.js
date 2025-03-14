import { getDateDiff, getTime, goCrewChat, goPrivateChat, setDateFormat } from "../common.js";
import { openPostmodal } from "../modal/postmodal.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }
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
  };
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
      const disabled = e.closest(".postItem").classList.contains("Disabled");
      let type = "";
      if (e.classList.contains("BtnDeny")) type = "deny";
      if (e.classList.contains("BtnAccept")) type = "accept";
      if (e.classList.contains("BtnExport")) type = "export";
      manageMember(id, uid, type, reqId, disabled);
      renderPost();
      cardEventFunc();
    });
  });

  document.querySelectorAll(".PostCardBody").forEach((e) => e.addEventListener("click", ({ target }) => {
    const reqId = e.closest(".postItem").getAttribute("data-reqid");
    const uid = JSON.parse(localStorage.getItem("userData")).uid;
    if (target.classList[0] === "ClosePost") return;
    location.href = `/post/detail/?id=${reqId}&uid=${uid}`;
  }));

  document.querySelectorAll(".ClosePost").forEach((e) => {
    e.addEventListener("click", () => {
      const id = e.closest(".postItem").getAttribute("data-id");
      const reqId = e.closest(".postItem").getAttribute("data-reqid");
      const disabled = e.closest(".postItem").classList.contains("Disabled");
      deletePost(id, reqId, disabled);
      renderPost();
      cardEventFunc();
    });
  });

  document.querySelectorAll(".ProfileImg").forEach((e) => e.addEventListener("click", ({ target }) => {
    const uid = target.closest(".swiper-slide").getAttribute("data-uid");
    location.href = `/userInfo/?uid=${uid}`;
  }));

  document.querySelectorAll(".BtnChat").forEach((e) => e.addEventListener("click", ({ target }) => {
    const uid = target.closest(".swiper-slide").getAttribute("data-uid");
    goPrivateChat(Number(uid));
  }));

  document.querySelectorAll(".btnChatCrew").forEach((e) => e.addEventListener("click", ({ target }) => {
    const reqId = target.closest(".postItem").getAttribute("data-reqid");
    goCrewChat(Number(reqId));
  }));
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
            <p>${e.message ? e.message : "참여메세지가 없습니다."}</p>
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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { recruitingData } = userData;
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
    document.querySelector(".MypageRecuitPost .createButton").addEventListener("click", (e) => openPostmodal("Study", e));
    return;
  }
  recruitingData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    postList += /* html */ `
      <li data-id="${e.id}" data-reqId="${e.reqId}" class="postItem ${getDateDiff(e.endDate, new Date()) >= 1 ? "" : "Disabled"}">
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
                    <button class="Detail btnChatCrew">크루채팅</button>
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
          <div class="ButtonPrev ButtonPrev swiper-button-disabled"></div>
          <div class="ButtonNext ButtonNext"></div>
        </div>
      </li>
    `;
    postCont.innerHTML = postList;
  });

  document.querySelectorAll(".ButtonPrev").forEach((e, i) => e.classList.add(`ButtonPrev${i}`));
  document.querySelectorAll(".ButtonNext").forEach((e, i) => e.classList.add(`ButtonNext${i}`));
  const swiperProperty = (num) => ({
    //스와이퍼 속성
    slidesPerView: 3,
    navigation: {
      nextEl: `.ButtonNext${Math.floor(num / 2)}`,
      prevEl: `.ButtonPrev${Math.floor(num / 2)}`,
    },
    spaceBetween: 10,
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  });
  document.querySelectorAll(".swiper1").forEach((e, i) => {
    if (!e.swiper) {
      new Swiper(e, swiperProperty(i));
      e.swiper = true;
    }
  });
};

const manageMember = (id, uid, type, reqId, disabled) => {
  if (disabled) {
    alert("마감된 크루의 멤버는 관리할 수 없습니다.");
    return;
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
  let { recruitingData } = userData;
  let recruitingPost = recruitingData.find((e) => e.id === Number(id));
  let postData = JSON.parse(localStorage.getItem("postData"));
  let managingPost = postData.find((e) => e.id === Number(reqId));
  const categoryName = (managingPost.categoryName === "기타취미" || managingPost.categoryName === "기타스터디") ? "기타" : managingPost.categoryName;
  let { waiting, accept } = recruitingPost;
  let memberData = JSON.parse(localStorage.getItem("memberData"));
  let managingMember = memberData.find((e) => Number(e.uid) === Number(uid));
  let chatData = JSON.parse(localStorage.getItem("chatData"));
  let chatRoom = chatData.find((e) => e.reqId === Number(reqId));
  if (type === "accept") {
    accept.push(waiting.find((e) => e.uid === Number(uid)));
    waiting = waiting.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      waiting,
      accept
    };
    managingPost = {
      ...managingPost,
      nowPop: Number(managingPost.nowPop) + 1,
      waiting: waiting.map((e) => e.uid),
      accept: [userData.uid, ...accept.map((e) => e.uid)]
    };

    chatRoom.users = [...chatRoom.users, Number(uid)];

    if (managingMember.recruitingData !== null) { //상호작용 가능 유저일 때
      let managingMemberTimelineData = managingMember.timelineData;
      managingMemberTimelineData = [
        {
          id: managingMemberTimelineData.length ? managingMemberTimelineData.length + 1 : 1,
          reqId: Number(reqId),
          reqName: managingPost.title,
          type: "크루신청수락",
          story: "Posi",
          date: setDateFormat(0),
          categoryName,
          category: managingPost.category
        },
        ...managingMemberTimelineData
      ];

      let managingMemberWaitingData = managingMember.waitingData;
      managingMemberWaitingData = managingMemberWaitingData.filter((e) => e.reqId !== Number(reqId));

      let managingMemberParticipatingData = managingMember.participatingData;
      managingMemberParticipatingData = [
        {
          id: managingMemberParticipatingData.length ? managingMemberParticipatingData.length + 1 : 1,
          reqId: Number(reqId),
          uid: userData.uid,
          endDate: managingPost.endDate,
          title: managingPost.title,
          category: managingPost.category,
          categoryName,
          nowPop: managingPost.nowPop,
          fullPop: managingPost.fullPop,
          read: managingPost.read,
          profile: managingPost.profile,
          profileBg: managingPost.profileBg,
          nickname: managingPost.nickname,
          place: managingPost.place,
          reqDate: setDateFormat(0),
        },
        ...managingMemberParticipatingData
      ];

      managingMember = {
        ...managingMember,
        timelineData: managingMemberTimelineData,
        waitingData: managingMemberWaitingData,
        participatingData: managingMemberParticipatingData
      };
      memberData = memberData.map((e) => {
        if (Number(e.uid) !== Number(uid)) return e;
        return managingMember;
      });
    } else { //가상유저일 때
      chatRoom.messages = [
        ...chatRoom.messages,
        {
          senderId: Number(uid),
          msg: "크루 신청을 수락해주셔서 감사합니다.\n이 채팅은 가상 유저를 참여수락할 때 나타나는 채팅입니다.\n유저끼리의 상호작용을 원하신다면, 재가입 후 기존 가입계정과 상호작용하실 수 있습니다.",
          timeStamp: getTime(),
        }
      ];
    }
  }
  if (type === "deny") {
    waiting = waiting.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      waiting
    };
    managingPost = {
      ...managingPost,
      waiting: waiting.map((e) => e.uid)
    };
    if (managingMember.recruitingData !== null) {
      let managingMemberTimelineData = managingMember.timelineData;
      managingMemberTimelineData = [
        {
          id: managingMemberTimelineData.length ? managingMemberTimelineData.length + 1 : 1,
          reqId: Number(reqId),
          reqName: managingPost.title,
          type: "크루신청거절",
          story: "Nega",
          date: setDateFormat(0),
          categoryName,
          category: managingPost.category
        },
        ...managingMemberTimelineData
      ];
      let managingMemberWaitingData = managingMember.waitingData;
      managingMemberWaitingData = managingMemberWaitingData.map((e) => {
        if (e.reqId !== Number(reqId)) return e;
        return {
          ...e,
          state: "deny"
        };
      });
      managingMember = { ...managingMember, timelineData: managingMemberTimelineData, waitingData: managingMemberWaitingData };
      memberData = memberData.map((e) => {
        if (Number(e.uid) !== Number(uid)) return e;
        return managingMember;
      });
    }
  }
  if (type === "export") {
    accept = accept.filter((e) => e.uid !== Number(uid));
    recruitingPost = {
      ...recruitingPost,
      accept
    };
    managingPost = {
      ...managingPost,
      nowPop: Number(managingPost.nowPop) - 1,
      accept: [userData.uid, ...accept.map((e) => e.uid)]
    };

    chatRoom.users = chatRoom.users.filter((e) => e !== Number(uid));

    if (managingMember.recruitingData !== null) {
      let managingMemberTimelineData = managingMember.timelineData;
      managingMemberTimelineData = [
        {
          id: managingMemberTimelineData.length ? managingMemberTimelineData.length + 1 : 1,
          reqId: Number(reqId),
          reqName: managingPost.title,
          type: "내보내기",
          story: "Nega",
          date: setDateFormat(0),
          categoryName,
          category: managingPost.category
        },
        ...managingMemberTimelineData
      ];

      let managingMemberParticipatingData = managingMember.participatingData;
      managingMemberParticipatingData = managingMemberParticipatingData.filter((e) => e.reqId !== Number(reqId));

      managingMember = { ...managingMember, timelineData: managingMemberTimelineData, participatingData: managingMemberParticipatingData };
      memberData = memberData.map((e) => {
        if (Number(e.uid) !== Number(uid)) return e;
        return managingMember;
      });
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
  let member = memberData.find((e) => Number(e.uid) === Number(userData.uid));
  member = { ...member, recruitingData };
  memberData = memberData.map((e) => {
    if (Number(e.uid) !== Number(userData.uid)) return e;
    return member;
  });
  chatData = chatData.map((e) => {
    if (e.reqId !== Number(reqId)) return e;
    return chatRoom;
  });
  localStorage.setItem("memberData", JSON.stringify(memberData));
  localStorage.setItem("userData", JSON.stringify(member));
  localStorage.setItem("postData", JSON.stringify(postData));
  localStorage.setItem("chatData", JSON.stringify(chatData));
};

const deletePost = (id, reqId, disabled) => {
  if (disabled) {
    alert("마감된 크루는 취소할 수 없습니다.");
    return;
  }
  //타임라인
  const userData = JSON.parse(localStorage.getItem("userData"));
  let { recruitingData, timelineData } = userData;
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

  //크루신청자
  let memberData = JSON.parse(localStorage.getItem("memberData"));
  let postData = JSON.parse(localStorage.getItem("postData"));
  let managingPost = postData.find((e) => e.id === Number(reqId));
  const waitingMember = timelinePost.waiting;
  waitingMember.forEach((data) => {
    const managingMember = memberData.find((e) => Number(e.uid) === Number(data.uid));
    if (managingMember.recruitingData === null) return;
    let { timelineData, waitingData } = managingMember;
    managingMember.timelineData = [
      {
        id: timelineData.length ? timelineData.length + 1 : 1,
        reqId: Number(reqId),
        reqName: managingPost.title,
        type: "신청모집취소",
        story: "Nega",
        date: setDateFormat(0),
        categoryName,
        category: managingPost.category
      },
      ...timelineData
    ];
    managingMember.waitingData = waitingData.map((e) => {
      if (e.reqId !== Number(reqId)) return e;
      if (e.state !== "waiting") return e;
      return {
        ...e,
        state: "close"
      }
    });
    memberData = memberData.map((e) => {
      if (Number(e.uid) !== Number(data.uid)) return e;
      return managingMember;
    });
  });
  const acceptMember = timelinePost.accept;
  acceptMember.forEach((data) => {
    const managingMember = memberData.find((e) => Number(e.uid) === Number(data.uid));
    if (managingMember.recruitingData === null) return;
    let { timelineData, participatingData } = managingMember;
    managingMember.timelineData = [
      {
        id: timelineData.length ? timelineData.length + 1 : 1,
        reqId: Number(reqId),
        reqName: managingPost.title,
        type: "참여모집취소",
        story: "Nega",
        date: setDateFormat(0),
        categoryName,
        category: managingPost.category
      },
      ...timelineData
    ];
    managingMember.participatingData = participatingData.filter((e) => e.reqId !== Number(reqId));
    memberData = memberData.map((e) => {
      if (Number(e.uid) !== Number(data.uid)) return e;
      return managingMember;
    });
  });

  //크루목록
  recruitingData = recruitingData.filter((e) => e.id !== Number(id));
  let member = memberData.find((e) => Number(e.uid) === Number(userData.uid));
  member = {
    ...member,
    recruitingData,
    timelineData,
    bookmarked: member.bookmarked.filter((e) => e !== Number(reqId)),
    view: member.view.filter((e) => e !== Number(reqId))
  };
  memberData = memberData.map((e) => {
    if (Number(e.uid) !== Number(userData.uid)) {
      if (e.recruitingData === null) return e;
      return {
        ...e,
        bookmarked: e.bookmarked.filter((e) => e !== Number(reqId)),
        view: e.view.filter((e) => e !== Number(reqId))
      }
    };
    return member;
  });

  //게시글목록
  postData = postData.filter((e) => e.id !== Number(reqId));

  //채팅
  let chatData = JSON.parse(localStorage.getItem("chatData"));
  chatData = chatData.filter((e) => e.reqId !== Number(reqId));

  localStorage.setItem("memberData", JSON.stringify(memberData));
  localStorage.setItem("userData", JSON.stringify(member));
  localStorage.setItem("postData", JSON.stringify(postData));
  localStorage.setItem("chatData", JSON.stringify(chatData));
};

