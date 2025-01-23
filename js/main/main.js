import { getDateDiff } from "../common.js";
import { postCard, postCardEvt } from "../components/postCard.js";

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

  document.querySelectorAll(".PostSlideWrapper li").forEach((e) => {
    e.addEventListener("click", (evt) => postCardEvt(e, evt));
  });
});