import { postCard, postCardEvt } from "../components/postCard.js";

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
  renderData.forEach((e) => lnbPost += postCard(e));
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
    e.addEventListener("click", (evt) => postCardEvt(e, evt));
  });
};