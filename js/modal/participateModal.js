import { setDateFormat } from "../common.js";

const setParticiateForm = (id) => {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const data = postData.find((e) => e.id === Number(id));
  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const participateForm = /* html */ `
    <div class="ModalBg"></div>
    <div class="ModalBox">
      <div class="ModalHeader">
        <ul class="ModalTop">
          <li></li> <!--이전 단계로 가는 버튼 있을 시 여기 생성-->
          <li>
            <span class="ModalClose"></span>
          </li>
        </ul>
        <div class="PartTitle">
            <h4>${data.title}</h4>
            <ul>
                <li class="${data.category}">${categoryName}</li>
                <li>${data.place}</li>
                <li>${data.nowPop}/${data.fullPop}명</li>
            </ul>
        </div>
      </div>
      <div class="ModalBody">
        <div class="ModalContents On">
          <h5>모집자에게 전달할 메세지를 남겨주세요!</h5>
          <textarea name="" id="" class="TxtAreaInput" placeholder="참여 메세지 입력 (선택)"></textarea>
          <button class="ButtonFull buttonParticipate">크루 참여 요청하기</button>
          </div>
      </div>
    </div>
  `;
  return participateForm;
};

const removeModal = () => {
  const body = document.querySelector("body");
  body.classList.remove("Modal");
  document.querySelector(".ModalWrapper2").classList.remove("Modal");
  setTimeout(() => {
    document.querySelector(".ModalWrapper2").style.display = "none";
  }, 500);
};

const postParticipate = (id, uid) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let { timelineData, waitingData } = userData;
  waitingData = waitingData.filter((e) => e.reqId !== Number(id));
  let postDataList = JSON.parse(localStorage.getItem("postData"))
  let postData = postDataList.find((e) => e.id === Number(id));
  const categoryName = (postData.categoryName === "기타취미" || postData.categoryName === "기타스터디") ? "기타" : postData.categoryName;

  const newWaitingData = {
    id: waitingData.length ? waitingData.length + 1 : 1,
    reqId: Number(id),
    uid: Number(uid),
    endDate: postData.endDate,
    title: postData.title,
    category: postData.category,
    categoryName,
    nowPop: postData.nowPop,
    fullPop: postData.fullPop,
    read: postData.read,
    profile: postData.profile,
    profileBg: postData.profileBg,
    nickname: postData.nickname,
    place: postData.place,
    reqDate: setDateFormat(0),
    state: "waiting"
  };
  waitingData.unshift(newWaitingData);

  const newTimelineData = {
    id: timelineData.length ? timelineData.length + 1 : 1,
    reqId: Number(id),
    reqName: postData.title,
    type: "참여요청",
    story: "Posi",
    date: setDateFormat(0),
    categoryName,
    category: postData.category
  };
  timelineData.unshift(newTimelineData);
  let memberData = JSON.parse(localStorage.getItem("memberData"));
  let member = memberData.find((e) => Number(e.uid) === Number(userData.uid));
  member = { ...member, timelineData, waitingData };
  memberData = memberData.map((e) => {
    if (Number(e.uid) !== Number(userData.uid)) return e;
    return member;
  });
  let poster = memberData.find((e) => Number(e.uid) === Number(uid));
  if (poster.recruitingData !== null) {
    let posterTimelineData = poster.timelineData;
    posterTimelineData = [
      {
        id: posterTimelineData.length ? posterTimelineData.length + 1 : 1,
        reqId: Number(id),
        reqName: userData.nickname,
        type: "크루신청",
        story: "Posi",
        date: setDateFormat(0),
        categoryName,
        category: postData.category
      },
      ...posterTimelineData
    ];
    let posterRecruitingData = poster.recruitingData;
    posterRecruitingData = posterRecruitingData.map((e) => {
      if (e.reqId !== Number(id)) return e;
      return {
        ...e,
        waiting: [
          ...e.waiting,
          {
            uid: userData.uid,
            name: userData.nickname,
            descript: userData.descript,
            profile: userData.profile,
            profileBg: userData.profileBg,
            message: document.querySelector(".TxtAreaInput").value,
            date: setDateFormat(0),
          }
        ]
      };
    });
    poster = { ...poster, timelineData: posterTimelineData, recruitingData: posterRecruitingData };
    memberData = memberData.map((e) => {
      if (Number(e.uid) !== Number(uid)) return e;
      return poster;
    });
  }
  localStorage.setItem("memberData", JSON.stringify(memberData));
  localStorage.setItem("userData", JSON.stringify(member));

  postData = {
    ...postData,
    waiting: [
      ...postData.waiting,
      Number(userData.uid)
    ]
  }
  postDataList = postDataList.map((e) => {
    if (e.id !== Number(id)) return e;
    return postData;
  });
  localStorage.setItem("postData", JSON.stringify(postDataList));

  location.href = "/mypage/waiting/";
};

let isCreated = false;
const createModal = (id, uid) => {
  const body = document.querySelector("body");
  if (!isCreated) {
    const ModalWrapper = document.createElement("div");
    ModalWrapper.classList.add("ModalWrapper2");
    ModalWrapper.classList.add("participateModal");
    ModalWrapper.innerHTML = setParticiateForm(id);
    body.append(ModalWrapper);
    body.classList.add("Modal");
    document.querySelector(".ModalWrapper2").style.display = "flex";
    setTimeout(() => {
      document.querySelector(".ModalWrapper2").classList.add("Modal");
    }, 10);
    isCreated = true;
    document.querySelector(".ModalWrapper2 .ModalBg").addEventListener("click", removeModal);
    document.querySelector(".ModalWrapper2 .ModalClose").addEventListener("click", removeModal);
    document.querySelector(".buttonParticipate").addEventListener("click", () => postParticipate(id, uid));
    return;
  }
  document.querySelector(".ModalWrapper2").style.display = "flex";
  document.querySelector(".ModalWrapper2").innerHTML = setParticiateForm(id);
  document.querySelector(".ModalWrapper2 .ModalBg").addEventListener("click", removeModal);
  document.querySelector(".ModalWrapper2 .ModalClose").addEventListener("click", removeModal);
  document.querySelector(".buttonParticipate").addEventListener("click", () => postParticipate(id, uid));
  body.classList.add("Modal");
  setTimeout(() => {
    document.querySelector(".ModalWrapper2").classList.add("Modal");
  }, 10);
};

export const participate = (id, uid) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!isLogin) {
    alert("로그인 후 참여할 수 있습니다.");
    return;
  }
  if (Number(userData.uid) === Number(uid)) {
    alert("자신이 모집한 크루에는 참여할 수 없습니다.");
    return;
  }
  const { waitingData, participatingData } = userData;
  if (waitingData.find((e) => e.reqId === Number(id))?.state === "waiting") {
    alert("이미 참여요청했습니다.");
    return;
  }
  if (participatingData.find((e) => e.reqId === Number(id))) {
    alert("참여중인 크루입니다.");
    return;
  }
  createModal(id, uid);
};