import { getDateDiff } from "../common.js";
import { postItem, postItemEvt } from "../components/postItem.js";
import { saveFilterList } from "./postFilter.js";

window.addEventListener("DOMContentLoaded", function () {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const FilterWrap = document.querySelector(".FilterWrapper");
  window.addEventListener("scroll", () => { //스크롤 시 필터 sticky기능
    if (window.innerWidth >= 768) {
      window.scrollY >= 480 - 72
        ? FilterWrap.classList.add("Fixed")
        : FilterWrap.classList.remove("Fixed");
      return;
    }
    window.scrollY >= 290
      ? FilterWrap.classList.add("Fixed")
      : FilterWrap.classList.remove("Fixed");
  });

  const filterButton = document.querySelector(".FilterButton");
  const filterDown = document.querySelector(".FliterListWrapper");
  const filterArrow = document.querySelector(".FilterArrow");
  filterButton?.addEventListener("click", () => { //모바일 필터 펼치기
    filterDown.classList.toggle("On");
    filterArrow.classList.toggle("On");
  });

  const filterAll = document.querySelector("#CategoryAll");
  const filterCat = document.querySelectorAll(".FilterCategory");
  filterAll.addEventListener("click", ({ target }) => {
    filterCat.forEach((e) => { //전체 체크 시 카테고리 체크 해제
      if (target.checked) e.checked = false;
    });
  });
  filterCat.forEach((e) => {
    e.addEventListener("click", () => { //카테고리 체크 시 전체 체크 해제
      if (e.checked) filterAll.checked = false;
    });
  });

  const PostCont = document.querySelector(".PostWrapper ul");
  let postList = "";
  let renderData;
  const renderPost = () => {
    renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
    renderData.forEach((e) => postList += postItem(e));
    PostCont.innerHTML = postList;
  };

  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("search");
  const renderSearchPost = () => {
    renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0).filter((e) => e.title.indexOf(search) !== -1);
    if (renderData.length === 0) {
      PostCont.innerHTML = /* html */ `
        <li class="noContent">
          <p>
            <em>검색결과가 없습니다.</em><br>
            원하는 크루를 직접 모집해보세요!
          </p>
          <button class="ButtonFull3 createButton">크루 모집하기</button>
        </li>
      `;
      return;
    }
    renderData.forEach((e) => postList += postItem(e));
    PostCont.innerHTML = postList;
  }

  search ? renderSearchPost() : renderPost();

  document.querySelector(".ButtonFillter").addEventListener("click", () => saveFilterList(renderData));
  document.querySelectorAll(".PostWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => postItemEvt(e, evt));
  });
});