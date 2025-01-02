import { getDateDiff } from "../common.js";
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
}

const logoutFunc = () => {
  sessionStorage.setItem("isLogin", false);
  localStorage.setItem("isLogin", false);
  location.reload();
}

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
  const renderData = postData.filter((e) => e.bookmarked)
    .sort((a, b) => b.bookmarked - a.bookmarked);
  renderData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    loginLnb += /*html*/ `
      <li data-id="${e.id}" data-uid="${e.uid}">
        <div class="CardPost ${e.category}">
          <div class="CardHead">
            <h5 class="${getDateDiff(e.endDate, new Date()) >= 1 ? "" : "disable"}">${getDateDiff(e.endDate, new Date()) >= 1 ? "D-" + getDateDiff(e.endDate, new Date()) : "마감"}</h5>
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
}

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
          <h3>속전속결 <br class="m">간편하게 크루 개설</h3>
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
}