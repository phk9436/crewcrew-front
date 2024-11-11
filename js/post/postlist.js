window.addEventListener('DOMContentLoaded', function () {

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
});