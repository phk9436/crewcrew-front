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
    const waitingData = JSON.parse(localStorage.getItem("waitingData"));
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
      waitingList += /* html */ `
        <li data-reqId="${e.reqId}" data-id="${e.id}">
          <div class="PostCard Cent ${e.state === "disable" && "Disable"}">
            <div class="PostCardHead">
              <div class="ProfileBox">
                <img src="/assets/images/${e.profile}" alt="" class="ProfileIMG">
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
                </div>
                <div class="TextList">
                  <p class="Category ${e.category}">${categoryName}</p>
                  <p>${e.place}</p>
                  <p>${e.nowPop}/${e.fullPop}명</p>
                  <p>조회수 ${e.read}</p>
                </div>
              </div>
              <div class="DetailBox">
                <p><span>(${reqDate})</span> ${e.state === "waiting" ? "요청완료" : "요청취소"}</p>
              </div>
              <div class="ButtonBox">
                ${e.state === "waiting"
          ? '<button class="Detail Cancle">요청취소</button>'
          : '<button class="Detail Delete">내역삭제</button>'
        }
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
        if (target.classList.contains("Cancle")) {
          cancelWaiting(id);
          return;
        }
        if (target.classList.contains("Delete")) {
          deleteWaiting(id);
          return;
        }
        location.href = `/post/detail/?id=${reqId}`;
      });
    });
  };
  renderWaiting();

  const cancelWaiting = (id) => {
    const waitingData = JSON.parse(localStorage.getItem("waitingData"));
    const newWaitingData = waitingData.map((e) => {
      if (e.id !== Number(id)) return e;
      return {
        ...e,
        state: "disable"
      }
    });
    localStorage.setItem("waitingData", JSON.stringify(newWaitingData));
    let timelineData = JSON.parse(localStorage.getItem("timelineData"));
    const postData = waitingData.find((e) => e.id === Number(id));
    const newTimelineData = {
      id: timelineData.length ? timelineData.length + 1 : 1,
      reqId: postData.reqId,
      reqName: postData.title,
      type: "참여취소",
      story: "Nega",
      date: setDateFormat(0),
      categoryName: postData.categoryName,
      category: postData.category
    }
    timelineData.unshift(newTimelineData);
    localStorage.setItem("timelineData", JSON.stringify(timelineData));
    alert("참여요청이 취소됐습니다.");
    renderWaiting();
  }

  const deleteWaiting = (id) => {
    const waitingData = JSON.parse(localStorage.getItem("waitingData"));
    const newWaitingData = waitingData.filter((e) => { e.id !== Number(id) });
    localStorage.setItem("waitingData", JSON.stringify(newWaitingData));
    renderWaiting();
  }
});