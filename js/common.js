import { lnbOpen, renderDefaultLnb, renderLoginLnb } from "./layout/lnb.js";
import { postData } from "./data/postData.js";

const commonFunc = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  window.addEventListener("resize", () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`));

  const body = document.querySelector("body");
  const buttonTop = document.querySelector(".ScrollTop");
  const buttonBottom = document.querySelector(".ScrollBottom");

  //스크롤 버튼 이벤트
  const scrollButton = () => {
    window.scrollY <= 100
      ? buttonTop?.classList.add("Disable")
      : buttonTop?.classList.remove("Disable");
    window.scrollY >= body.offsetHeight - screen.availHeight
      ? buttonBottom?.classList.add("Disable")
      : buttonBottom?.classList.remove("Disable");
  }
  scrollButton();
  window.addEventListener("scroll", scrollButton);

  buttonTop?.addEventListener("click", (e) => {
    e.target.classList.contains("Disable") || window.scrollTo(0, 0);
  });
  buttonBottom?.addEventListener("click", (e) => {
    e.target.classList.contains("Disable") || window.scrollTo(0, body.offsetHeight);
  });

  //게시글 데이터 로컬 저장
  const localData = JSON.parse(localStorage.getItem("postData"));
  if (!localData) localStorage.setItem("postData", JSON.stringify(postData));

  //lnb
  const isLogin = localStorage.getItem("isLogin") || sessionStorage.getItem("isLogin");
  document.querySelector(".NavArrow").addEventListener("click", lnbOpen);
  document.querySelector(".NavHam").addEventListener("click", lnbOpen);
  isLogin ? renderLoginLnb() : renderDefaultLnb();


  //마이페이지
  const linkMypage = document.querySelectorAll(".linkMypage");
  linkMypage.forEach((e) => e.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    location.href = "/mypage";
  }));

  //검색클릭
  const searchFunc = (evt) => {
    evt.preventDefault();
    const { value } = document.querySelector(".InputSearch");
    if (!value.length) {
      alert("검색어를 입력해주세요.");
      return;
    }
    location.href = `/post/?search=${value}`;
  }
  document.querySelector(".ButtonSearch")?.addEventListener("click", searchFunc);
  document.querySelector(".formSearch")?.addEventListener("submit", searchFunc);

  //최초 데이터 세팅
  const timelineData = JSON.parse(localStorage.getItem("timelineData"));
  timelineData || localStorage.setItem("timelineData", JSON.stringify([]));
  const waitingData = JSON.parse(localStorage.getItem("waitingData"));
  waitingData || localStorage.setItem("waitingData", JSON.stringify([]));
};

document.addEventListener("DOMContentLoaded", commonFunc);

export function setDateFormat(n) {
  const date = new Date();
  const endDate = date;
  endDate.setDate(date.getDate() + n);
  const year = endDate.getFullYear();
  const month = `${endDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${endDate.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const getDateDiff = (d1, d2) => {
  const date = [new Date(d1), new Date(d2)];
  const dateDiff = date[0].getTime() - date[1].getTime();
  return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
}