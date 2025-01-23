import { getDateDiff, goPrivateChat } from "../common.js";
import { postCard } from "../components/postCard.js";
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

  let postlist = "";
  const postData = JSON.parse(localStorage.getItem("postData"));
  const renderData = postData.filter((e) => getDateDiff(e.endDate, new Date()) > 0);
  renderData.forEach((e, i) => {
    if (i > 4) return;
    postlist += postCard(e, true);
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
    deadlineList += postCard(e, true);
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
      const { target } = evt;
      if (target.classList[0] === "Star") {
        onClickBookmark(id, evt);
        return;
      }
      if (target.classList.contains("ProfileImg")) {
        if (!e.querySelector(".ProfileToolTip")) {
          location.href = "/mypage/"
          return;
        }
        e.querySelector(".ProfileToolTip").style.display = "block";
        return;
      }
      if (target.classList.contains("Profile")) {
        evt.preventDefault();
        location.href = `/userInfo/?uid=${uid}`;
        return;
      }
      if (target.classList.contains("Chat")) {
        goPrivateChat(Number(uid));
        return;
      }
      location.href = `/post/detail/?id=${id}&uid=${uid}`;
    });
  });
});