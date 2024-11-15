import { getDateDiff } from "../common.js";
import { saveFilterList } from "./postFilter.js";

window.addEventListener('DOMContentLoaded', function () {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const FilterWrap = document.querySelector('.FilterWrapper');
  window.addEventListener('scroll', () => { //스크롤 시 필터 sticky기능
    if (window.innerWidth >= 768) {
      window.scrollY >= 358
        ? FilterWrap.classList.add('Fixed')
        : FilterWrap.classList.remove('Fixed');
      return;
    }
    window.scrollY >= 240
      ? FilterWrap.classList.add('Fixed')
      : FilterWrap.classList.remove('Fixed');
  });

  const filterButton = document.querySelector('.FilterButton');
  const filterDown = document.querySelector('.FliterListWrapper');
  const filterArrow = document.querySelector('.FilterArrow');
  filterButton?.addEventListener('click', () => { //모바일 필터 펼치기
    filterDown.classList.toggle('On');
    filterArrow.classList.toggle('On');
  });

  const filterAll = document.querySelector('#CategoryAll');
  const filterCat = document.querySelectorAll('.FilterCategory');
  filterAll.addEventListener('click', ({ target }) => {
    //전체 체크 시 카테고리 체크 해제
    filterCat.forEach((e) => {
      if (target.checked) {
        e.checked = false;
      }
    });
  });
  filterCat.forEach((e) => {
    e.addEventListener('click', () => {
      //카테고리 체크 시 전체 체크 해제
      if (e.checked) {
        filterAll.checked = false;
      }
    });
  });

  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = ``;
  const renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
  renderData.forEach((e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const endDay = days[new Date(e.endDate).getDay()];
    postList += /*html*/ `
    <li data-id="${e.id}">
      <div class="PostCard">
        <div class="PostCardHead">
          <div class="ProfileBox" style="background-color:${e.profileBg}">
            <img src="/assets/images/${e.profile}" alt="">
          </div>
          <div class="TextBox">
            <p class="Dday">D-${getDateDiff(e.endDate, new Date())}</p>
            <p class="Date">${endDate} (${endDay})</p>
            <p class="Name">${e.nickname}</p>
          </div>
        </div>
        <div class="PostCardBody">
          <div class="TextBox">
            <div class="TitleBox">
              <h5>${e.title}</h5>
              <div class="Star"></div>
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

  document.querySelector(".ButtonFillter").addEventListener("click", saveFilterList);
  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", ({ target }) => {
      if (target.classList[0] === "Star" || target.classList[0] === "Participate") return;
      location.href = `/post/detail/?id=${e.getAttribute("data-id")}`;
    });
  });
});