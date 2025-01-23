import { postCard } from "../components/postCard.js";
import { bookmarkFunc } from "../post/postBookmark.js";

export const lnbOpen = (e) => {
  const { target } = e;
  const NavArrow = document.querySelector(".NavArrow");
  const NavContWrapper = document.querySelector(".NavContWrapper");
  if (target.classList.contains("NavArrow")) {
    target.classList.toggle("On");
    NavContWrapper.classList.toggle("On");
    return;
  }
  NavArrow.classList.toggle("On");
  NavContWrapper.classList.toggle("On");
  target.classList.toggle("On");
};

const logoutFunc = () => {
  sessionStorage.setItem("isLogin", false);
  localStorage.setItem("isLogin", false);
  localStorage.setItem("userData", JSON.stringify({}));
  location.href = "/";
};

export const renderLoginLnb = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let loginLnb = /*html*/ `
    <p><span>${userData.nickname}</span>님,<br>크루크루에 오신 것을 환영합니다!</p>
    <ul class="NavButtonList">
      <li>
        <button type="button" class="ButtonFull2 linkMypage">마이페이지<span></span></button>
      </li>
      <li>
        <button type="button" class="ButtonFull2Ghost ButtonLogout">로그아웃<span></span></button>
      </li>
    </ul>
    <h2>내가 찜한 크루</h2>
    <p>내가 찜한 크루의 현황을 확인하세요!</p>
    <ul class="NavCardList">
  `;
  const postData = JSON.parse(localStorage.getItem("postData"));
  const renderData = userData.bookmarked.map((data) => postData.find((e) => e.id === data));
  renderData.forEach((e) => loginLnb += postCard(e));
  loginLnb += /*html*/ `
      <li>
        <div class="CardEmpty">
          <a href="/post/">
            <img src="/assets/images/CardAdd.png" alt="" class="CardAdd">
            <p>모집크루 둘러보러 가기</p>
          </a>
        </div>
      </li>
    </ul>
  `;
  const NavContInner = document.querySelector(".NavContInner");
  NavContInner.innerHTML = loginLnb;
  NavContInner.querySelectorAll(".NavCardList li").forEach((e) => {
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

  const Profile = document.querySelector(".NavPC .ProfileWrapper a");
  Profile.style.background = userData.profileBg;
  Profile.querySelector("img").src = `/assets/images/${userData.profile}`;
  const ProfileMobile = document.querySelector(".MobileGnb .ProfileWrapper a");
  ProfileMobile.style.background = userData.profileBg;
  document.querySelector(".ButtonLogout").addEventListener("click", logoutFunc);
  ProfileMobile.querySelector("img").src = `/assets/images/${userData.profile}`;
};

export const renderDefaultLnb = () => {
  const defaultLnb = /*html*/ `
    <p>목표를 향해 항해하는<br>크루크루에 오신 것을 환영합니다!</p>
    <ul class="NavButtonList">
      <li>
        <button type="button" class="ButtonFull2 btnLogin">로그인/회원가입<span></span></button>
      </li>
      <li>
        <a href="https://github.com/phk9436/crewcrew" target="_blank">
          <button type="button" class="ButtonFull2Ghost">서비스 소개<span></span></button>
        </a>
      </li>
    </ul>
    <h2>CREW 4 U</h2>
    <p>나에게 딱 맞는 크루원을 찾고 있었다면, 잘 찾아오셨어요!</p>
    <ul class="NavCardList">
      <li>
        <div class="CardIntro">
          <h3>14가지 분야 <br class="m">크루원 모집</h3>
          <p>스터디, 취미도<br>크루원과 함께!</p>
        </div>
      </li>
      <li>
        <div class="CardIntro">
          <h3>속전속결 <br class="m">간편한 크루 개설</h3>
          <p>크루원 모으기,<br>어렵지 않잖아?</p>
        </div>
      </li>
      <li>
        <div class="CardIntro">
          <h3>안전한 <br class="m">크루크루 채팅</h3>
          <p>따로 방파지 말고<br>여기서 떠들자~!</p>
        </div>
      </li>
      <li>
        <div class="CardIntro">
          <h3>간단한 <br class="m">간편 가입 신청</h3>
          <p>한번의 클릭으로<br>QUICK 가입신청!</p>
        </div>
      </li>
    </ul>
  `;
  const NavContInner = document.querySelector(".NavContInner");
  NavContInner.innerHTML = defaultLnb;
};