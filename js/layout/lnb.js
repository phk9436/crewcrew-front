export const lnbOpen = (e) => {
  const { target } = e;
  const NavArrow = document.querySelector(".NavArrow");
  const NavContWrapper = document.querySelector(".NavContWrapper");
  if (target.classList.contains('NavArrow')) {
    target.classList.toggle('On');
    NavContWrapper.classList.toggle('On');
    return;
  }
  NavArrow.classList.toggle('On');
  NavContWrapper.classList.toggle('On');
  target.classList.toggle('On');
}

const logoutFunc = () => {
  sessionStorage.clear("isLogin");
  location.reload(true);
}

export const renderLoginLnb = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loginLnb = /*html*/ `
    <p><span>${userData.nickname}</span>님,<br>크루크루에 오신 것을 환영합니다!</p>
      <ul class="NavButtonList">
        <li>
          <button type="button" class="ButtonFull2">마이페이지<span></span></button>
        </li>
        <li>
          <button type="button" class="ButtonFull2Ghost ButtonLogout">로그아웃<span></span></button>
        </li>
      </ul>
      <h2>내가 스크랩한 모집글</h2>
      <p>내가 스크랩한 글의 현황을 확인하세요!</p>
      <ul class="NavCardList">
        <li>
          <div class="CardPost Study">
            <div class="CardHead">
              <h5><span>2/14 (월)</span> 마감</h5>
              <div class="CardHeadRight">
                <p>2/3 (목)</p>
                <p>조회수 <span>50</span></p>
                <div class="Star"></div>
              </div>
            </div>
            <div class="CardBody">
              <div class="CardProfile"><img src="/assets/images/Profile4.png" alt=""></div>
              <div class="CardTxt">
                <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                <p>재영재영유재영</p>
              </div>
            </div>
            <div class="CardFooter">
              <div class="CardTag Color">프로젝트</div>
              <div class="CardTag Color">오프라인</div>
              <div class="CardTag"><span>10</span>/<span>10</span>명 모집됨</div>
            </div>
          </div>
        </li>
        <li>
          <div class="CardPost Hobby">
            <div class="CardHead">
              <h5><span>2/14 (월)</span> 마감</h5>
              <div class="CardHeadRight">
                <p>2/3 (목)</p>
                <p>조회수 <span>50</span></p>
                <div class="Star On"></div>
              </div>
            </div>
            <div class="CardBody">
              <div class="CardProfile"><img src="/assets/images/Profile4.png" alt=""></div>
              <div class="CardTxt">
                <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                <p>재영재영유재영</p>
              </div>
            </div>
            <div class="CardFooter">
              <div class="CardTag Color">프로젝트</div>
              <div class="CardTag Color">오프라인</div>
              <div class="CardTag"><span>10</span>/<span>10</span>명 모집됨</div>
            </div>
          </div>
        </li>
        <li>
          <div class="CardEmpty">
            <img src="/assets/images/CardAdd.png" alt="" class="CardAdd">
            <p>모집글 둘러보러 가기</p>
          </div>
        </li>
      </ul>
    `
  const NavContInner = document.querySelector(".NavContInner");
  NavContInner.innerHTML = loginLnb;
  const Profile = document.querySelector(".NavPC .ProfileWrapper a");
  Profile.style.background = userData.profileBg;
  Profile.querySelector("img").src = `/assets/images/${userData.profile}`;
  const ProfileMobile = document.querySelector(".MobileGnb .ProfileWrapper a");
  ProfileMobile.style.background = userData.profileBg;
  document.querySelector(".ButtonLogout").addEventListener("click", logoutFunc);
  ProfileMobile.querySelector("img").src = `/assets/images/${userData.profile}`;
}

export const renderDefaultLnb = () => {
  const defaultLnb = /*html*/`
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
          <h3>속전속결 <br class="m">간편 모집글 작성</h3>
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