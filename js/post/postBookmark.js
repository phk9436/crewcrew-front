import { getDateDiff } from "../common.js";

export const bookmarkFunc = (id, e) => {
  e.preventDefault();
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return;
  }
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const stars = document.querySelectorAll(".Star");
  stars.forEach((e) => {
    e.closest("li").getAttribute("data-id") === id && e.classList.toggle("On");
  });
  const { bookmarked } = userData;
  userData.bookmarked = bookmarked.filter((e) => e !== Number(id));
  if (!bookmarked.includes(Number(id))) { //북마크 체크할 때
    userData.bookmarked = [Number(id), ...bookmarked];
  }
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("memberData", JSON.stringify(memberData.map((e) => {
    if (e.uid !== userData.uid) return e;
    return userData;
  })));

  //북마크할 때 lnb 북마크리스트 리렌더
  const navList = document.querySelector(".NavCardList");
  let lnbPost = "";
  const postData = JSON.parse(localStorage.getItem("postData"));
  const renderData = userData.bookmarked.map((data) => postData.find((e) => e.id === data));
  renderData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    lnbPost += /*html*/ `
      <li data-id="${e.id}" data-uid="${e.uid}">
        <div class="CardPost ${e.category}">
          <div class="CardHead">
          <h5 class="${getDateDiff(e.endDate, new Date()) >= 1 ? "" : "disable"}">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</h5>
            <div class="CardHeadRight">
              <p>${endDate} (${endDay})</p>
              <p>조회수 <span>${e.read}</span></p>
              <div class="Star On"></div>
            </div>
          </div>
          <div class="CardBody">
            <div class="CardProfile" style="background-color:${e.profileBg}">
              <img src="/assets/images/${e.profile}" alt="">
            </div>
            <div class="CardTxt">
              <h4>${e.title}</h4>
              <p>${e.nickname}</p>
            </div>
          </div>
          <div class="CardFooter">
            <div class="CardTag Color">${categoryName}</div>
            <div class="CardTag Color">${e.place}</div>
            <div class="CardTag">${e.nowPop}/${e.fullPop}명 모집됨</div>
          </div>
        </div>
      </li>
    `;
  });
  lnbPost += /*html*/ `
    <li>
      <div class="CardEmpty">
        <a href="/post/">
          <img src="/assets/images/CardAdd.png" alt="" class="CardAdd">
          <p>모집크루 둘러보러 가기</p>
        </a>
      </div>
    </li>
  `;
  navList.innerHTML = lnbPost;
  navList.querySelectorAll("li").forEach((e) => { //리렌더한 게시글에 북마크 이벤트 다시 추가
    e.addEventListener("click", (evt) => {
      const { target } = evt;
      const id = e.getAttribute("data-id");
      const uid = e.getAttribute("data-uid");
      if (target.classList[0] === "Star") {
        bookmarkFunc(id, evt)
        return;
      }
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
  });
}