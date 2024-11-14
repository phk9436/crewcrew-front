import { lnbOpen, renderDefaultLnb, renderLoginLnb } from "./layout/lnb.js";

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
  const isLogin = sessionStorage.getItem("isLogin");
  document.querySelector(".NavArrow").addEventListener("click", lnbOpen);
  document.querySelector(".NavHam").addEventListener("click", lnbOpen);
  isLogin ? renderLoginLnb() : renderDefaultLnb();

  //카드 즐겨찾기
  document.querySelectorAll(".CardPost .Star").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.classList.toggle("On");
    });
  });

  //로그인 체크
  const checkLogin = () => {
    console.log(isLogin);
  }
  checkLogin();
};

document.addEventListener("DOMContentLoaded", commonFunc);

export const setDateFormat = (n) => {
  //임의로 n일 뒤에 마감되는 데이터 세팅하기 위함
  const date = new Date();
  const endDate = date;
  endDate.setDate(date.getDate() + n);
  const year = endDate.getFullYear();
  const month = `${endDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${endDate.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getDateDiff = (d1, d2) => {
  const date = [new Date(d1), new Date(d2)];
  const dateDiff = date[0].getTime() - date[1].getTime();
  return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
}