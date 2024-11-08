const commonFunc = () => {
  const body = document.querySelector('body');
  const buttonTop = document.querySelector('.ScrollTop');
  const buttonBottom = document.querySelector('.ScrollBottom');

  //스크롤 버튼 이벤트
  const scrollButton = () => {
    window.scrollY <= 100
      ? buttonTop?.classList.add('Disable')
      : buttonTop?.classList.remove('Disable');
    window.scrollY >= body.offsetHeight - screen.availHeight
      ? buttonBottom?.classList.add('Disable')
      : buttonBottom?.classList.remove('Disable');
  }
  scrollButton();
  window.addEventListener('scroll', scrollButton);

  buttonTop?.addEventListener('click', (e) => {
    e.target.classList.contains('Disable') || window.scrollTo(0, 0);
  });

  buttonBottom?.addEventListener('click', (e) => {
    e.target.classList.contains('Disable') || window.scrollTo(0, body.offsetHeight);
  });

  //lnb
  const lnbOpen = (e) => {
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
  document.querySelector(".NavArrow").addEventListener("click", lnbOpen);
  document.querySelector(".NavHam").addEventListener("click", lnbOpen);

  //카드 즐겨찾기
  document.querySelectorAll(".CardPost .Star").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.classList.toggle("On");
    });
  });

  //페이지네이션
  const pagination = document.querySelector('.PaginationWrapper');
  function paginationAppend() {
    //브라우저 사이즈에 따른 페이지네이션 생성

    if (pagination !== null) {
      let div, divLength, i, pageNum, paginationChild;
      i = 0;

      while (pagination.hasChildNodes()) {
        //페이지네이션 초기화
        pagination.removeChild(pagination.firstChild);
      }

      if (window.innerWidth > 768) {
        //페이지네이션 갯수 설정
        divLength = 14;
      } else if (window.innerWidth > 320) {
        divLength = 9;
      } else {
        divLength = 7;
      }

      for (i; i < divLength; i++) {
        //페이지네이션 생성
        div = document.createElement('div');
        if (i != 0 && i != 1 && i != divLength - 2 && i != divLength - 1) {
          pageNum = document.createTextNode(i - 1);
          div.appendChild(pageNum);
        }
        pagination.appendChild(div);
      }

      const { children } = pagination; //페이지네이션 Arrow 지정
      children[0].classList.add('Prev2');
      children[1].classList.add('Prev');
      children[2].classList.add('On');
      children[children.length - 2].classList.add('Next');
      children[children.length - 1].classList.add('Next2');
    }
  }
  paginationAppend();
  window.addEventListener('resize', paginationAppend);

  //로그인 체크
  const checkLogin = () => {
    console.log(sessionStorage.getItem("isLogin"))
  }
  checkLogin();
};

document.addEventListener("DOMContentLoaded", commonFunc);