import { setDateFormat } from "../common.js";

export const createFunc = () => {
  const postInput = document.querySelectorAll('.ModalWrapper .InputFull');
  postInput.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', () => {
      e.classList.add('On');
      const { children } = e.parentNode;
      e.value && children[1].classList.add('On');
    });
    e.addEventListener('blur', function () {
      e.classList.remove('On');
      const { children } = e.parentNode;
      e.value || children[1].classList.remove('On');
    });
    e.addEventListener('keyup', () => {
      const { children } = e.parentNode;
      e.value ? children[1].classList.add('On') : children[1].classList.remove('On');
    });
  });

  const inputDel = document.querySelectorAll('.ModalWrapper .InputDel');
  inputDel.forEach((e) => {
    // input 지우기 버튼 클릭 이벤트
    e.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const { children } = e.parentNode;
      children[0].value = '';
      e.classList.remove('On');
      children[0].blur();
      children[0].focus(); // input 지운 후 바로 포커스되도록
    });
  });

  let nowCategory = "Study";
  const CatBtn = document.querySelectorAll(".PostCategory input");
  const ListDrop = document.querySelectorAll('.PostListDrop');
  CatBtn.forEach((e, i) => {
    e.addEventListener("change", ({ target }) => {
      nowCategory = target.id.split("Post")[1];
      ListDrop.forEach((e) => e.style.display = "none");
      ListDrop[i].style.display = "block";
    });
  });

  const ListUp = () => {
    ListDrop.forEach((e) => {
      e.classList.remove('On');
      e.style.height = "50px";
    });
  };

  const ListDown = (target) => {
    const PostList = target.closest('.PostListDrop');
    PostList.classList.add('On');
    const { children } = PostList;
    const listLen = children.length;
    const listHeight = parseInt(window.getComputedStyle(children[2]).height) + parseInt(window.getComputedStyle(children[1]).paddingTop);
    PostList.style.height = `${listHeight * listLen + 14}px`;
  };

  const postBox = document.querySelector(".ModalBoxPost");
  postBox.addEventListener("mousedown", ({ target }) => {
    if (target.classList.contains("InputChoose")) {
      target.closest(".PostListDrop").classList.contains("On") ? ListUp() : ListDown(target);
      return;
    }
    ListUp();
  });

  const Radio = document.querySelectorAll('input[name=PostCatDet]');
  Radio.forEach((e) => {
    //상세카테고리 하위 메뉴 클릭 시
    e.addEventListener('change', ({ target }) => {
      e.closest('ul').querySelector(".InputPostCatDet").value = target.value;
    });
  });

  const ArrowNum = document.querySelectorAll('.ArrowNum');
  ArrowNum.forEach((e) => {
    //모집인원 증가/감소 화살표 클릭 시
    e.addEventListener('click', () => {
      const People = document.querySelector('.InputPostPeople');
      if (!People.value) return;
      let pNum = Number(People.value);
      e == ArrowNum[0]
        ? People.value = pNum <= 99 ? pNum + 1 : 100
        : People.value = pNum >= 2 ? pNum - 1 : 1;
    });
  });

  const InputPeople = document.querySelector(".InputPostPeople");
  InputPeople.addEventListener(("change"), ({ target }) => {
    if (target.value < 1) {
      alert("모집 인원수는 최소 1명 이상으로 해주세요.");
      target.value = 1;
    }
    if (target.value > 100) {
      alert("모집 인원수는 100명을 넘을 수 없습니다.");
      target.value = 100;
    }
  });

  const InputDate = document.querySelector(".InputDate");
  InputDate.addEventListener("change", ({ target }) => {
    const defaultDate = setDateFormat(1);
    if (new Date(defaultDate) > new Date(target.value)) {
      alert("오늘 날짜나 이전 날짜는 마감일자로 설정할 수 없습니다.");
      target.value = defaultDate;
    }
  });

  const ToolTipDt = document.querySelector('.ToolTipDt');
  let opacity = 0, Fade;
  const tipHide = () => {
    opacity = Number(window.getComputedStyle(ToolTipDt).getPropertyValue('opacity'));
    if (opacity > 0) {
      opacity = opacity - 0.1;
      ToolTipDt.style.opacity = opacity;
      return;
    }
    clearInterval(Fade);
    ToolTipDt.style.display = 'none';
  }

  const tipShow = () => {
    ToolTipDt.style.display = 'block';
    opacity = Number(window.getComputedStyle(ToolTipDt).getPropertyValue('opacity'));
    if (opacity < 1) {
      opacity = opacity + 0.1;
      ToolTipDt.style.opacity = opacity;
      return;
    }
    clearInterval(Fade);
  }

  document.querySelector('.ToolTip').addEventListener('mouseover', () => {
    clearInterval(Fade);
    Fade = setInterval(tipShow, 20);
  });
  document.querySelector('.ToolTip').addEventListener('mouseout', () => {
    clearInterval(Fade);
    Fade = setInterval(tipHide, 20);
  });
};