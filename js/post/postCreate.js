import { setDateFormat } from "../common.js";

export const postInputFunc = () => {
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

  const CatBtn = document.querySelectorAll(".PostCategory input");
  const ListDrop = document.querySelectorAll('.PostListDrop');
  CatBtn.forEach((e, i) => {
    e.addEventListener("change", ({ target }) => {
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
        : People.value = pNum >= 4 ? pNum - 1 : 3;
    });
  });

  const InputPeople = document.querySelector(".InputPostPeople");
  InputPeople.addEventListener(("change"), ({ target }) => {
    if (target.value < 3) {
      alert("모집 인원수는 최소 3명 이상으로 해주세요.");
      target.value = 3;
    }
    if (target.value > 100) {
      alert("모집 인원수는 100명을 넘을 수 없습니다.");
      target.value = 100;
    }
  });

  const InputDate = document.querySelector(".InputDate");
  InputDate.addEventListener("change", ({ target }) => {
    if (new Date(setDateFormat(1)) > new Date(target.value)) {
      alert("오늘 날짜나 이전 날짜는 마감일자로 설정할 수 없습니다.");
      target.value = setDateFormat(1);
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

  const postTitle = document.querySelector(".InputPostTitle");
  postTitle.addEventListener("keyup", ({ target }) => {
    if (target.value.length > 30) {
      target.value = target.value.substr(0, 30);
    }
  });
};

export const createPost = () => {
  const category = document.querySelector(".PostCategory input:checked").id.split("Post")[1];
  const categoryName = category === "Study" ? document.querySelector(".PostListDrop.Study input").value : document.querySelector(".PostListDrop.Hobby input").value;
  if (!categoryName) {
    alert("상세 카테고리를 선택해주세요.");
    return;
  }
  const place = document.querySelector(".PostPlace input:checked").value;
  const fullPop = Number(document.querySelector(".InputPostPeople").value);
  const endDate = document.querySelector(".InputDate").value;
  const link = document.querySelector(".InputLink").value;
  if (!link) {
    alert("초대링크를 입력해주세요.");
    return;
  }
  const linkRegex = /(http[s]?):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g;
  const isLinkValid = linkRegex.test(link);
  if (!isLinkValid) {
    alert("초대링크가 올바른 형식이 아닙니다.");
    document.querySelector(".InputLink").value = "";
    return;
  }
  const title = document.querySelector(".InputPostTitle").value;
  if (!title) {
    alert("제목을 입력해주세요.");
    return;
  }
  const content = document.querySelector(".PostContent").value;
  if (!content) {
    alert("내용을 입력해주세요.");
    return;
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
  let postData = JSON.parse(localStorage.getItem("postData"));
  const postId = postData[0].id + 1;
  const newPostData = {
    id: postId,
    endDate, 
    title, 
    category, 
    categoryName,
    nowPop: 1, 
    fullPop,
    read: 0,
    profile: userData.profile,
    profileBg: userData.profileBg,
    nickname: userData.nickname,
    content,
    link,
    place
  };
  postData.unshift(newPostData);
  localStorage.setItem("postData", JSON.stringify(postData));
  location.reload(true);
}