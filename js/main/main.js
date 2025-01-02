import { getDateDiff } from "../common.js";
import { bookmarkFunc } from "../post/postBookmark.js";

window.addEventListener("DOMContentLoaded", function () {
  const swiperProperty = (num) => (
    {
      slidesPerView: 3,
      navigation: {
        nextEl: `.ButtonNext${num}`,
        prevEl: `.ButtonPrev${num}`,
      },
      spaceBetween: 10,
      slidesPerView: "auto",
      observer: true,
      observeParents: true,
      breakpoints: {
        768: {
          spaceBetween: 30,
        },
      },
    }
  );

  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || JSON.parse(sessionStorage.getItem("isLogin"));
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const renderSlide = (e) => {
    const categoryName = (e.categoryName === "기타취미" || e.categoryName === "기타스터디") ? "기타" : e.categoryName;
    const endDate = `${e.endDate.split("-")[1]}/${e.endDate.split("-")[2]}`;
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const endDay = days[new Date(e.endDate).getDay()];
    const member = memberData.find((el) => el.uid === Number(e.uid));
    const userData = JSON.parse(localStorage.getItem("userData"));
    return /*html*/ `
      <li class="swiper-slide" data-id="${e.id}" data-uid="${e.uid}">
        <div class="CardPost ${e.category}"> <!--카드-->
          <div class="CardHead">
            <h5><span>D-${getDateDiff(e.endDate, new Date())}</span></h5>
            <div class="CardHeadRight">
              <p>${endDate} (${endDay})</p>
              <p>조회수 <span>${e.read}</span></p>
              <div class="Star ${isLogin && userData.bookmarked.includes(e.id) && "On"}"></div>
            </div>
          </div>
          <div class="CardBody">
            <div class="CardProfile" style="background-color:${e.profileBg}">
              <img src="/assets/images/${e.profile}" alt="" class="ProfileImg">
            </div>
            ${Number(e.uid) !== userData?.uid ? /* html */ `
              <div class="ProfileToolTip">
                <p class="ToolTipName">${member.nickname}</p>
                <div class="ToolTipBtn">
                  <button class="Chat"></button>
                  <a class="Profile">프로필 확인</a>
                </div>
              </div>` : ""}
            <div class="CardTxt">
              <h4>${e.title}</h4>
              <p>${e.nickname}</p>
            </div>
          </div>
          <div class="CardFooter">
            <div class="CardTag Color">${categoryName}</div>
            <div class="CardTag Color">${e.place}</div>
            <div class="CardTag"><span>${e.nowPop}</span>/<span>${e.fullPop}</span>명 모집됨</div>
          </div>
        </div>
      </li>
    `;
  };

  let postlist = "";
  const postData = JSON.parse(localStorage.getItem("postData"));
  const renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
  renderData.forEach((e, i) => {
    if (i > 4) return;
    postlist += renderSlide(e);
  });
  const postSlideWrapper = document.querySelectorAll(".PostSlideWrapper");
  postSlideWrapper[0].innerHTML = postlist;
  const swiper1 = new Swiper(".swiper1", swiperProperty(1));

  let deadlineList = "";
  const deadlineData = renderData.sort((a, b) => {
    const dateDiffA = getDateDiff(a.endDate, new Date());
    const dateDiffB = getDateDiff(b.endDate, new Date());
    return dateDiffA - dateDiffB;
  });
  deadlineData.forEach((e, i) => {
    if (i > 4) return;
    deadlineList += renderSlide(e);
  });
  postSlideWrapper[1].innerHTML = deadlineList;
  const swiper2 = new Swiper(".swiper2", swiperProperty(2));

  //즐겨찾기
  const onClickBookmark = (id, evt) => {
    bookmarkFunc(id, evt);
  };

  document.querySelectorAll(".PostSlideWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => {
      const id = e.getAttribute("data-id");
      const uid = e.getAttribute("data-uid");
      if (evt.target.classList[0] === "Star") {
        onClickBookmark(id, evt);
        return;
      }
      if (evt.target.classList.contains("ProfileImg")) {
        if (!e.querySelector(".ProfileToolTip")) {
          location.href = "/mypage/"
          return;
        }
        e.querySelector(".ProfileToolTip").style.display = "block";
        return;
      }
      if (evt.target.classList.contains("Profile")) {
        evt.preventDefault();
        location.href = `/userInfo/?uid=${uid}`;
        return;
      }
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
  });
});