import { getDateDiff, goPrivateChat, setDateFormat } from "../common.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const postWrapper = document.querySelector(".PostWrapper ul");
  const renderWaiting = () => {
    let participatingList = "";
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { participatingData } = userData;
    const memberData = JSON.parse(localStorage.getItem("memberData"));
    if (participatingData.length === 0) {
      participatingList = /* html */ `
        <li class="noContent">
          <p>
            <em>현재 참여한 크루가 없습니다.</em><br>
            모집크루들을 둘러보고 관심가는 크루에 참여해보세요!
          </p>
          <a class="ButtonFull3" href="/post/">크루참여하러 가기</a>
        </li>
      `;
    }
    document.querySelector(".postAll").innerText = participatingData.length;
    document.querySelector(".postStudy").innerText = participatingData.filter((e) => e.category === "Study").length;
    document.querySelector(".postHobby").innerText = participatingData.filter((e) => e.category === "Hobby").length;
    participatingData.forEach((e) => {
      const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
      const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      const endDay = days[new Date(e.endDate).getDay()];
      const reqDate = `${e.reqDate.split("-")[1]}/${e.reqDate.split("-")[2]}`;
      const member = memberData.find((el) => el.uid === Number(e.uid));
      participatingList += /* html */ `
        <li data-reqId="${e.reqId}" data-id="${e.id}" data-uid="${e.uid}">
          <div class="PostCard Cent">
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
                <p><span>(${reqDate})</span> <em>참여중</em></p>
                <button class="btnChatCrew Posi" type="button">크루채팅</button>
              </div>
              <div class="ButtonBox">
              <button class="Detail Cancle">참여취소</button>
              </div>
            </div>
          </div>
        </li>
      `;
    });
    postWrapper.innerHTML = participatingList;
    document.querySelectorAll(".PostWrapper li").forEach((e) => {
      e.addEventListener("click", (evt) => {
        const { target } = evt;
        const id = e.getAttribute("data-id");
        const reqId = e.getAttribute("data-reqId");
        const uid = e.getAttribute("data-uid");
        if (target.classList.contains("Cancle")) {
          cancleParticipating(id, reqId, uid);
          return;
        }
        if (target.classList.contains("ProfileImg")) {
          e.querySelector(".ProfileToolTip").style.display = "block";
          return;
        }
        if (target.classList.contains("Profile")) {
          location.href = `/userInfo/?uid=${uid}`;
          return;
        }
        if (target.classList.contains("Chat")) {
          goPrivateChat(Number(uid));
          return;
        }
        location.href = `/post/detail/?id=${reqId}&uid=${uid}`;
      });
    });
  };
  renderWaiting();

  const cancleParticipating = (id, reqId, uid) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { participatingData, timelineData } = userData;

    const participatingPost = participatingData.find((e) => e.id === Number(id));
    //타임라인
    const newTimelineData = {
      id: timelineData.length ? timelineData.length + 1 : 1,
      reqId: participatingPost.reqId,
      reqName: participatingPost.title,
      type: "참여취소",
      story: "Nega",
      date: setDateFormat(0),
      categoryName: participatingPost.categoryName,
      category: participatingPost.category
    };
    timelineData.unshift(newTimelineData);

    //참여중데이터
    participatingData = participatingData.filter((e) => e.id !== Number(id));

    //멤버데이터 세팅
    let memberData = JSON.parse(localStorage.getItem("memberData"));
    let member = memberData.find((e) => Number(e.uid) === Number(userData.uid));
    member = { ...member, timelineData, participatingData };
    memberData = memberData.map((e) => {
      if (Number(e.uid) !== Number(userData.uid)) return e;
      return member;
    });
    let poster = memberData.find((e) => Number(e.uid) === Number(uid));
    if (poster.recruitingData !== null) { //상호작용 가능 유저
      let posterTimelineData = poster.timelineData;
      posterTimelineData = [
        {
          id: posterTimelineData.length ? posterTimelineData.length + 1 : 1,
          reqId: Number(reqId),
          reqName: userData.nickname,
          type: "크루참여취소",
          story: "Nega",
          date: setDateFormat(0),
          categoryName: participatingPost.categoryName,
          category: participatingPost.category
        },
        ...posterTimelineData
      ];

      let posterRecruitingData = poster.recruitingData;
      posterRecruitingData = posterRecruitingData.map((e) => {
        if (e.reqId !== Number(reqId)) return e;
        return {
          ...e,
          accept: e.accept.filter((e) => e.uid !== Number(userData.uid))
        };
      });
      poster = { ...poster, timelineData: posterTimelineData, recruitingData: posterRecruitingData };
      memberData = memberData.map((e) => {
        if (Number(e.uid) !== Number(uid)) return e;
        return poster;
      });
    };

    //게시글 데이터 세팅
    let postDataList = JSON.parse(localStorage.getItem("postData"));
    let postData = postDataList.find((e) => e.id === Number(reqId));
    postData = {
      ...postData,
      accept: postData.accept.filter((e) => e !== Number(userData.uid)),
      nowPop: postData.nowPop - 1
    };
    postDataList = postDataList.map((e) => {
      if (e.id !== Number(reqId)) return e;
      return postData;
    });

    //채팅 데이터
    let chatData = JSON.parse(localStorage.getItem("chatData"));
    let chatRoom = chatData.find((e) => e.reqId === Number(reqId));
    chatRoom.users = chatRoom.users.filter((e) => e !== Number(uid));
    chatData = chatData.map((e) => {
      if (e.reqId !== Number(reqId)) return e;
      return chatRoom;
    });

    localStorage.setItem("memberData", JSON.stringify(memberData));
    localStorage.setItem("userData", JSON.stringify(member));
    localStorage.setItem("postData", JSON.stringify(postDataList));
    localStorage.setItem("chatData", JSON.stringify(chatData));
    renderWaiting();
  };
});