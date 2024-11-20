document.addEventListener("DOMContentLoaded", () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    location.href = "/";
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData)
  const myInfoBox = document.querySelector(".myInfoBox");
  let myData = /*html*/ `
    <div class="myInfoTop">
      <h3>내 정보</h3>
    </div>
    <div class="myInfoBody">
      <div class="myInfoInputList">
        <div class="InputTop">
          <div class="Profile" style="background-color: ${userData.profileBg}">
            <img src="/assets/images/${userData.profile}" alt="">
          </div>
          <div class="InputWrap">
            <input type="text" class="InputFull InputSetting" readonly value="${userData.nickname}">
          </div>
        </div>
        <div class="InputBottom InputWrap">
          <textarea class="TxtAreaInput InputSetting" readonly>${userData.message}</textarea>
        </div>
      </div>
      <div class="myInfoCat">
        <div class="CatBox">
          <h5>관심분야(스터디)</h5>
          <ul class="CatList">
  `;
  userData.study.forEach((e) => {
    myData += /*html*/ `
      <li>
        <p class="FilterLabel Study">${e}</p>
      </li>
    `;
  });
  myData += /*html*/ `
    </ul>
    </div>
    <div class="CatBox">
      <h5>관심분야(취미)</h5>
      <ul class="CatList">
  `;
  userData.hobby.forEach((e) => {
    myData += /*html*/ `
      <li>
        <p class="FilterLabel Hobby">${e}</p>
      </li>
    `;
  });
  myData += /*html*/ `
          </ul>
        </div>
      </div>
    </div>
  `;

  myInfoBox.innerHTML = myData;
});