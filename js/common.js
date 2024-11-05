const commonFunc = () => {
  const body = document.querySelector('body');
  const buttonTop = document.querySelector('.ScrollTop');
  const buttonBottom = document.querySelector('.ScrollBottom');

  //스크롤 버튼 이벤트
  const scrollButton = () => {
    window.scrollY <= 100
      ? buttonTop?.classList.add('Disable')
      : buttonTop?.classList.remove('Disable');
    window.scrollY >= body.offsetHeight - screen.availHeight
      ? buttonBottom?.classList.add('Disable')
      : buttonBottom?.classList.remove('Disable');
  }
  scrollButton();
  window.addEventListener('scroll', scrollButton);

  buttonTop?.addEventListener('click', () => {
    this.classList.contains('Disable') || window.scrollTo(0, 0);
  });

  buttonBottom?.addEventListener('click', () => {
    this.classList.contains('Disable') || window.scrollTo(0, body.offsetHeight);
  });

  //lnb
  const lnbOpen = (e) => {
    const { target } = e;
    const NavArrow = document.querySelector(".NavArrow");
    const NavContWrapper = document.querySelector(".NavContWrapper");
    if (target.classList.contains('NavArrow')) {
      target.classList.toggle('On');
      NavContWrapper.classList.toggle('On');
      return;
    }
    NavArrow.classList.toggle('On');
    NavContWrapper.classList.toggle('On');
    target.classList.toggle('On');
  }
  document.querySelector(".NavArrow").addEventListener("click", lnbOpen);
  document.querySelector(".NavHam").addEventListener("click", lnbOpen);

  //페이지네이션
  const pagination = document.querySelector('.PaginationWrapper');
  function paginationAppend() {
    //브라우저 사이즈에 따른 페이지네이션 생성

    if (pagination !== null) {
      let div, divLength, i, pageNum, paginationChild;
      i = 0;

      while (pagination.hasChildNodes()) {
        //페이지네이션 초기화
        pagination.removeChild(pagination.firstChild);
      }

      if (window.innerWidth > 768) {
        //페이지네이션 갯수 설정
        divLength = 14;
      } else if (window.innerWidth > 320) {
        divLength = 9;
      } else {
        divLength = 7;
      }

      for (i; i < divLength; i++) {
        //페이지네이션 생성
        div = document.createElement('div');
        if (i != 0 && i != 1 && i != divLength - 2 && i != divLength - 1) {
          pageNum = document.createTextNode(i - 1);
          div.appendChild(pageNum);
        }
        pagination.appendChild(div);
      }

      const { children } = pagination; //페이지네이션 Arrow 지정
      children[0].classList.add('Prev2');
      children[1].classList.add('Prev');
      children[2].classList.add('On');
      children[children.length - 2].classList.add('Next');
      children[children.length - 1].classList.add('Next2');
    }
  }
  paginationAppend();
  window.addEventListener('resize', paginationAppend);

  //모달
  const modalClose = document.querySelector('.ModalClose');
  modalClose?.addEventListener('click', () => {
    // 닫기 버튼 클릭 시 모달창 이벤트
    document.querySelector('body').classList.remove('Modal');
    document.querySelector('.ModalWrapper').classList.remove('Modal'); // 사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
  });

  //인풋
  const loginInput = document.querySelectorAll('.InputFull');
  loginInput?.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', function () {
      const { children } = this.parentNode;
      this.classList.add('On'); // input에 포커스효과, error상태시 On 대신 Error 클래스 추가
      children[1].classList.add('On'); // label에 포커스효과, error상태시 On 대신 Error 클래스 추가

      if (this.value) {
        children[2].classList.add('On');

        if (this.classList.contains('Password')) {
          children[3].classList.add('Over');
        }
      }

      if (!this.classList.contains('ListFlex')) {
        //1단그리드일 떄
        this.parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
      } else {
        //2단그리드일 때
        this.closest('ul.ListFlex').parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
      }
    });
    e.addEventListener('blur', (e) => {
      const { target } = e;
      const { children } = target.parentNode;
      target.classList.remove('Over'); // input지우기버튼, password보기버튼 hide

      if (!target.value) {
        target.classList.remove('On'); // input, label에 포커스아웃효과, error상태시 On 대신 Error 클래스 제거
        children[1].classList.remove('On');
        children[2].classList.remove('On');

        if (target.classList.contains('Password')) {
          children[3].classList.remove('Over');
        } else if (target.classList.contains('InputNick')) {
          //중복확인 버튼 제거
          children[3].classList.remove('On');
        }
      }

      if (!target.classList.contains('ListFlex')) {
        target.parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
      } else {
        target.closest('ul.ListFlex').parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
      }

      if (target.value) {
        //ProgressTransition 함수 관련
        if (!target.classList.contains('InputNick')) {
          if (!target.classList.contains('ListFlex')) {
            //1단 그리드일때
            target.parentNode.classList.add('Checked');
          } else {
            //2단 그리드일떄
            if (!target.classList.contains('CheckAllInput')) {
              //input 하나만 체크할때
              target.closest('ul.ListFlex').parentNode.classList.add('Checked');
            }
          }
        }
      } else {
        if (!target.classList.contains('ListFlex')) {
          //1단 그리드일때
          target.parentNode.classList.remove('Checked');
        } else {
          //2단 그리드일떄
          if (!target.classList.contains('CheckAllInput')) {
            //input 하나만 체크할때
            target.closest('ul.ListFlex').parentNode.classList.remove('Checked');
          }
        }
      }
      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });

    e.addEventListener('keyup', (e) => {
      const { target } = e;
      const { children } = target.parentNode;

      if (target.value) {
        children[2].classList.add('On');
        if (target.classList.contains('Password')) {
          children[3].classList.add('Over');
        } else if (target.classList.contains('InputNick')) {
          //중복확인 필요할 때
          children[3].classList.add('On');
        }
      } else {
        children[2].classList.remove('On');
        if (target.classList.contains('Password')) {
          children[3].classList.remove('Over');
        } else if (target.classList.contains('InputNick')) {
          children[3].classList.remove('On');
        }
      }
    });
  });

  const inputDel = document.querySelectorAll('.InputDel');
  const inputDouble = document.querySelector('.InputDouble');
  inputDel?.forEach((e) => {
    // input 지우기 버튼 클릭 이벤트
    e.addEventListener('mousedown', function (e) {
      e.preventDefault();
      const { target } = e;
      target.parentNode.firstElementChild.value = '';
      target.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거

      if (target.parentNode.children[0].classList.contains('InputNick')) {
        //중복확인 input일 때
        inputDouble?.classList.remove('On');
        target.parentNode.children[0].disabled = false;
        target.parentNode.children[4].classList.remove('On');
        target.parentNode.children[5].innerText = '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)';
      }

      target.parentNode.firstElementChild.blur();
      target.parentNode.firstElementChild.focus(); // input 지운 후 바로 포커스되도록
      if (target.parentNode.children[0].classList.contains('Password')) {
        passwordShow?.classList.remove('Over');
      }
    });
  });

  const passwordShow = document.querySelector('.PasswordShow');
  const password = document.querySelector('.Password');
  let isOn = true;
  passwordShow?.addEventListener('mousedown', (e) => {
    // password보기 버튼 클릭 이벤트
    e.preventDefault();
    const { target } = e;
    target.parentNode.firstElementChild.blur();
    target.parentNode.firstElementChild.focus(); // 버튼 누르면 바로 포커스되도록

    if (isOn) {
      target.classList.add('On'); // error상태시 On 대신 Error 클래스 추가
      password.setAttribute('type', 'text');
    } else {
      target.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거
      password.setAttribute('type', 'password');
    }

    isOn = !isOn;
  });
};

const SignLength = document.querySelectorAll('.InputList>li')?.length;
const Signwidth = 100 / SignLength; //회원가입 진행도 1개당 올라가는 width
let SignProgress = 0; //회원가입 진행도
export const ProgressTransition = () => {
  //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  if (document.querySelector('.StepSlide') !== null) {
    SignProgress = document.querySelectorAll('.Checked').length;
    console.log(SignProgress);
    if (document.querySelector('.ModalContents').classList.contains('ContentSignStep1')) {
      //회원가입 1단계일떄
      document.querySelector('.StepSlide1').firstElementChild.style.width =
        `${SignProgress * Signwidth}%`;
    } else {
      //회원가입 2단계일떄
      document.querySelector('.StepSlide2').firstElementChild.style.width =
        `${SignProgress * Signwidth}%`;
    }

    if (SignProgress >= SignLength) {
      document.querySelector('button.SignStep').classList.remove('Disable');
      document.querySelector('button.SignStep').disabled = false;
    } else {
      document.querySelector('button.SignStep').classList.add('Disable');
      document.querySelector('button.SignStep').disabled = 'disabled';
    }
  }
};

document.addEventListener("DOMContentLoaded", commonFunc);