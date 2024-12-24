document.addEventListener("DOMContentLoaded", () => {
  cardEventFunc();
});

const cardEventFunc = () => {
  const SwiperCard = document.querySelector(".SwiperCardBottom");
  let SwiperCardHeight;
  function SwiperHeightFunc() {
    //스와이퍼카드 원래 높이 구하기
    if (SwiperCard) {
      SwiperCard.style.height = "auto";
      SwiperCardHeight = SwiperCard.clientHeight;
      SwiperCard.style.height = 0;
    }
  }
  SwiperHeightFunc();
  window.addEventListener("resize", SwiperHeightFunc);

  const SwiperBtn = document.querySelectorAll(".SwiperBtn");
  SwiperBtn.forEach((e) => {
    //스와이퍼카드 드롭다운
    e.addEventListener("click", () => {
      let ThisSwiperCard = e.closest(".SwiperCardWrapper").children[0];
      ThisSwiperCard.classList.toggle("On");
      if (ThisSwiperCard.classList.contains("On")) {
        ThisSwiperCard.children[1].style.height = `${SwiperCardHeight}px`;
      } else {
        ThisSwiperCard.children[1].style.height = 0;
      }
    });
  });

  const CardToggle = document.querySelectorAll(".CardToggle");
  const ToggleBtn = document.querySelectorAll(".ToggleBtn");
  const CardToggleText = document.querySelectorAll(".CardToggle p");
  ToggleBtn?.forEach((e, i) => {
    e.addEventListener("click", () => {
      CardToggle[i].classList.toggle("On");
      document.querySelectorAll(".Accept")[i].classList.toggle("On");
      document.querySelectorAll(".Waiting")[i].classList.toggle("On");
      CardToggle[i].children[0].inert = !CardToggle[i].children[0].inert;
      CardToggle[i].children[2].inert = !CardToggle[i].children[2].inert;
      e.closest(".PostCard.Swiper").classList.add("On");
      e.closest(".PostCard.Swiper").children[1].style.height = `${SwiperCardHeight}px`;
    });
  });

  CardToggleText?.forEach((e) => {
    e.addEventListener("click", function () {
      e.closest(".CardToggle").children[1].click();
    });
  });
}