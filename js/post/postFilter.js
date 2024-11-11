let filterList = ["", [], []];

export const saveFilterList = () => {
  const Filter1 = document.querySelectorAll(".FilterList")[0].querySelector("input:checked").id;
  filterList[0] = Filter1;
  const Filter2 = document.querySelectorAll(".FilterList")[1].querySelectorAll("input:checked");
  filterList[1] = [];
  Filter2.forEach((e) => filterList[1].push(e.id));
  const Filter3 = document.querySelectorAll(".FilterList")[2].querySelectorAll("input:checked");
  filterList[2] = [];
  Filter3.forEach((e) => filterList[2].push(e.id));

  let savedFilterList = "";
  const filterObj = {
    recent: "최신 글",
    popular: "많이 본 글",
    deadline: "마감임박 글"
  }
  savedFilterList += /*html*/ `
  <li>
    <span class="Common">
      ${filterObj[filterList[0]]}
    </span>
  </li>
  `;
  filterList[1].forEach((e) => {
    savedFilterList += /*html*/`
      <li>
        <span class="Common">
          ${e}
        </span>
      </li>
    `;
  });
  filterList[2].forEach((e) => {
    if (e === "CategoryAll") {
      savedFilterList += /*html*/ `
        <li>
          <span class="Common">
            전체
          </span>
        </li>
      `;
      return;
    }
    const category = e.split(",");
    savedFilterList += /*html*/ `
      <li>
        <span class="${category[0]}">
          ${category[1]}
        </span>
      </li>
    `;
  });
  
  const filterSaver = document.querySelector(".FilterChecked");
  const filterSaverMobile = document.querySelector(".FilterCheckedMobile");
  filterSaver.innerHTML = savedFilterList;
  filterSaverMobile.innerHTML = savedFilterList;
  document.querySelector(".FliterListWrapper").classList.remove("On");
  document.querySelector(".FilterArrow").classList.remove("On");
};