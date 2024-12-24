import { getDateDiff } from "../common.js";

export const bookmarkFunc = (id, e) => {
  e.preventDefault();
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return;
  }
  const postData = JSON.parse(localStorage.getItem("postData"));
  const data = postData.find((e) => e.id === Number(id));
  const stars = document.querySelectorAll(".Star");
  stars.forEach((e) => {
    e.closest("li").getAttribute("data-id") === id && e.classList.toggle("On");
  });
  let updatedData;
  if (!data.bookmarked) { //북마크 체크할 때
    const bookmarkNum = Math.max(...postData.map(e => e.bookmarked));
    updatedData = postData.map((e) => {
      if (e.id !== Number(id)) return e;
      return { ...e, bookmarked: bookmarkNum + 1 };
    });
  } else { //북마크 체크 풀 때
    updatedData = postData.map((e) => {
      if (e.id !== Number(id)) return e;
      return { ...e, bookmarked: 0 };
    });
  }
  localStorage.setItem("postData", JSON.stringify(updatedData));

  //북마크할 때 lnb 북마크리스트 리렌더
  const navList = document.querySelector(".NavCardList");
  let lnbPost = "";
  const renderData = updatedData.filter((e) =>
    getDateDiff(e.endDate, new Date()) > 0)
    .filter((e) => e.bookmarked)
    .sort((a, b) => b.bookmarked - a.bookmarked);
  renderData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    lnbPost += /*html*/ `
      <li data-id="${e.id}">
        <div class="CardPost ${e.category}">
          <div class="CardHead">
            <h5>D-${getDateDiff(e.endDate, new Date())}</h5>
            <div class="CardHeadRight">
              <p>${endDate} (${endDay})</p>
              <p>조회수 <span>${e.read}</span></p>
              <div class="Star ${e.bookmarked && "On"}"></div>
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
      if (target.classList[0] === "Star") {
        bookmarkFunc(id, evt)
        return;
      }
      location.href = `/post/detail/?id=${id}`;
    });
  });
}