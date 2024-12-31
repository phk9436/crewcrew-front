import { getDateDiff, setDateFormat } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const postWrapper = document.querySelector(".PostWrapper ul");
  const renderWaiting = () => {
    let waitingList = "";
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { waitingData } = userData;
    const memberData = JSON.parse(localStorage.getItem("memberData"));
    if (waitingData.length === 0) {
      waitingList = /* html */ `
        <li class="noContent">
          <p>
            <em>현재 참여요청 내역이 없습니다.</em><br>
            모집크루들을 둘러보고 관심가는 크루에 참여해보세요!
          </p>
          <a class="ButtonFull3" href="/post/">크루참여하러 가기</a>
        </li> 
      `;
    }
    document.querySelector(".postAll").innerText = waitingData.filter((e) => e.state === "waiting").length;
    document.querySelector(".postStudy").innerText = waitingData.filter((e) => e.category === "Study" && e.state === "waiting").length;
    document.querySelector(".postHobby").innerText = waitingData.filter((e) => e.category === "Hobby" && e.state === "waiting").length;
    waitingData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const endDay = days[new Date(e.endDate).getDay()];
      const reqDate = `${e.reqDate.split("-")[1]}/${e.reqDate.split("-")[2]}`;
      const member = memberData.find((el) => el.uid === Number(e.uid));
      waitingList += /* html */ `
        <li data-reqId="${e.reqId}" data-id="${e.id}" data-uid="${e.uid}">
          <div class="PostCard Cent ${e.state === "disable" || "deny" ? "Disable" : ""}">
            <div class="PostCardHead">
              <div class="ProfileBox" style="background-color: ${e.profileBg}">
                <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
              </div>
              <div class="TextBox">
                <p class="Dday">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</p>
                <p class="Date">${endDate} (${endDay})</p>
                <p class="Name">${e.nickname}</p>
              </div>
              <div class="ProfileToolTip">
                  <p class="ToolTipName">${member.nickname}</p>
                  <div class="ToolTipBtn">
                    <button class="Chat"></button>
                    <button class="Profile">프로필 확인</button>
                  </div>
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
                  <p>${e.nowPop}/${e.fullPop}명</p>
                  <p>조회수 ${e.read}</p>
                </div>
              </div>
              <div class="DetailBox">
                <p><span>(${reqDate})</span> <em class="${e.state === "deny" ? "Nega" : ""}">${e.state === "waiting" ? "요청완료" : e.state === "disable" ? "요청취소" : "참여거절"}</em></p>
              </div>
              <div class="ButtonBox">
                ${e.state === "waiting" ? '<button class="Detail Cancle">요청취소</button>' : '<button class="Detail Delete">내역삭제</button>'}
              </div>
            </div>
          </div>
        </li>
      `;
    });
    postWrapper.innerHTML = waitingList;
    document.querySelectorAll(".PostWrapper li").forEach((e) => {
      e.addEventListener("click", (evt) => {
        const { target } = evt;
        const id = e.getAttribute("data-id");
        const reqId = e.getAttribute("data-reqId");
        const uid = e.getAttribute("data-uid");
        if (target.classList.contains("Cancle")) {
          cancelWaiting(id, reqId, uid);
          return;
        }
        if (target.classList.contains("Delete")) {
          deleteWaiting(id);
          return;
        }
        if (target.classList.contains("ProfileImg")) {
          e.querySelector(".ProfileToolTip").style.display = "block";
          return;
        }
        if (target.classList.contains("Profile")) {
          location.href = `/userInfo/?uid=${uid}`;
          return;
        };
        location.href = `/post/detail/?id=${reqId}&uid=${uid}`;
      });
    });
  };
  renderWaiting();

  const cancelWaiting = (id, reqId, uid) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { timelineData, waitingData } = userData;
    //대기중데이터
    waitingData = waitingData.map((e) => {
      if (e.id !== Number(id)) return e;
      return {
        ...e,
        state: "disable"
      }
    });
    
    const waitingPost = waitingData.find((e) => e.id === Number(id));
    //타임라인
    const newTimelineData = {
      id: timelineData.length ? timelineData.length + 1 : 1,
      reqId: waitingPost.reqId,
      reqName: waitingPost.title,
      type: "참여취소",
      story: "Nega",
      date: setDateFormat(0),
      categoryName: waitingPost.categoryName,
      category: waitingPost.category
    }
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
          reqId: Number(reqId),
          reqName: userData.nickname,
          type: "크루신청취소",
          story: "Nega",
          date: setDateFormat(0),
          categoryName: waitingPost.categoryName,
          category: waitingPost.category
        },
        ...posterTimelineData
      ];
      let posterRecruitingData = poster.recruitingData;
      posterRecruitingData = posterRecruitingData.map((e) => {
        if (e.reqId !== Number(reqId)) return e;
        return {
          ...e,
          waiting: e.waiting.filter((e) => e.uid !== Number(userData.uid))
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

    let postDataList = JSON.parse(localStorage.getItem("postData"));
    let postData = postDataList.find((e) => e.id === Number(reqId));
    postData = {
      ...postData,
      waiting: postData.waiting.filter((e) => e !== Number(userData.uid))
    };
    postDataList = postDataList.map((e) => {
      if (e.id !== Number(reqId)) return e;
      return postData;
    });
    localStorage.setItem("postData", JSON.stringify(postDataList));

    alert("참여요청이 취소됐습니다.");
    renderWaiting();
  }

  const deleteWaiting = (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { waitingData } = userData;
    waitingData = waitingData.filter((e) => e.id !== Number(id));
    let memberData = JSON.parse(localStorage.getItem("memberData"));
    let member = memberData.find((e) => Number(e.uid) === Number(userData.uid));
    member = { ...member, waitingData };
    memberData = memberData.map((e) => {
      if (Number(e.uid) !== Number(userData.uid)) return e;
      return member;
    });
    localStorage.setItem("memberData", JSON.stringify(memberData));
    localStorage.setItem("userData", JSON.stringify(member));
    renderWaiting();
  }
});