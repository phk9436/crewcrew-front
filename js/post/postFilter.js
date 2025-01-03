import { getDateDiff } from "../common.js";
import { participate } from "../modal/participateModal.js";
import { bookmarkFunc } from "./postBookmark.js";
import { openPostmodal } from "../modal/postmodal.js";

let filterList = ["", [], []];

const filterPost = (postData) => {
  const renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
  let category = [];
  filterList[2].forEach((e) => {
    category.push(e.split(",")[1]);
  });
  let filteredData = renderData
    .filter((e) => {
      if (category[0] === undefined) { //전체카테고리일때
        return e;
      }
      return category.includes(e.categoryName);
    })
    .filter((e) => filterList[1].includes(e.place));
  if (filterList[0] === "recent") {
    filteredData = filteredData.sort((a, b) => b.id - a.id);
  }
  if (filterList[0] === "popular") {
    filteredData = filteredData.sort((a, b) => b.read - a.read);
  }
  if (filterList[0] === "deadline") {
    filteredData = filteredData.sort((a, b) => {
      const dateDiffA = getDateDiff(a.endDate, new Date());
      const dateDiffB = getDateDiff(b.endDate, new Date());
      return dateDiffA - dateDiffB;
    });
  }
  return filteredData;
}

export const saveFilterList = (postData) => {
  const Filter1 = document.querySelectorAll(".FilterList")[0].querySelector("input:checked").id;
  filterList[0] = Filter1;
  const Filter2 = document.querySelectorAll(".FilterList")[1].querySelectorAll("input:checked");
  filterList[1] = [...Filter2].map((e) => e.id);
  const Filter3 = document.querySelectorAll(".FilterList")[2].querySelectorAll("input:checked");
  filterList[2] = [...Filter3].map((e) => e.id);

  let savedFilterList = "";
  const filterObj = {
    recent: "최신 글",
    popular: "많이 본 글",
    deadline: "마감임박 글"
  }
  savedFilterList += /*html*/ `
    <li>
      <span class="Common">
        ${filterObj[filterList[0]]}
      </span>
    </li>
  `;
  filterList[1].forEach((e) => {
    savedFilterList += /*html*/ `
      <li>
        <span class="Common">
          ${e}
        </span>
      </li>
    `;
  });
  filterList[2].forEach((e) => {
    if (e === "CategoryAll") {
      savedFilterList += /*html*/ `
        <li>
          <span class="Common">
            전체
          </span>
        </li>
      `;
      return;
    }
    const category = e.split(",");
    const categoryName = (category[1] === "기타취미" || category[1] === "기타스터디")
      ? "기타" : category[1];
    savedFilterList += /*html*/ `
      <li>
        <span class="${category[0]}">
          ${categoryName}
        </span>
      </li>
    `;
  });

  const filterSaver = document.querySelector(".FilterChecked");
  const filterSaverMobile = document.querySelector(".FilterCheckedMobile");
  filterSaver.innerHTML = savedFilterList;
  filterSaverMobile.innerHTML = savedFilterList;
  document.querySelector(".FliterListWrapper").classList.remove("On");
  document.querySelector(".FilterArrow").classList.remove("On");

  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (filterPost(postData).length === 0) {
    PostCont.innerHTML = /* html */ `
      <li class="noContent">
        <p>
          <em>조건에 맞는 크루가 없습니다.</em><br>
          원하는 크루를 직접 모집해보세요!
        </p>
        <button class="ButtonFull3 createButton">크루 모집하기</button>
      </li>
    `;
  } else {
    filterPost(postData).forEach((e) => {
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

  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => {
      const { target } = evt;
      const id = e.getAttribute("data-id");
      const uid = e.getAttribute("data-uid");
      if (target.classList[0] === "Star") {
        bookmarkFunc(id, evt)
        return;
      }
      if (target.classList[0] === "Participate") {
        participate(id, uid);
        return;
      };
      if (target.classList.contains("createButton")) {
        openPostmodal("Study", evt);
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
      };
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
  });
};