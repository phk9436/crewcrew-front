
import { signStep } from "./sign/sign.js";

export const inputFunc = () => {
  //인풋
  const loginInput = document.querySelectorAll('.InputFull');
  loginInput?.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', function ({ target }) {
      const { children } = this.parentNode;
      this.classList.add('On'); // input에 포커스효과, error상태시 On 대신 Error 클래스 추가
      children[1].classList.add('On'); // label에 포커스효과, error상태시 On 대신 Error 클래스 추가

      if (this.value) {
        children[2].classList.add('On');

        if (this.classList.contains('Password')) {
          children[3].classList.add('Over');
        }
      }

      if (!this.classList.contains('InputColumn')) {
        //1단그리드일 떄
        children[children.length - 1].classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
        target.parentNode.classList.remove('Checked');
      } else {
        //2단그리드일 때
        this.closest('ul.ListFlex').parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
        target.closest('ul.ListFlex').parentNode.classList.remove('Checked');
      }
      ProgressTransition();
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

      if (!target.classList.contains('InputColumn')) {
        children[children.length - 1].classList.remove('On'); // InputTxt hide
      } else {
        target.closest('ul.ListFlex').parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
      }

      if (target.value) {
        //ProgressTransition 함수 관련
        if (!target.classList.contains('InputNick')) {
          if (!target.classList.contains('InputColumn')) {
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
          return;
        }
        if (target.classList.contains('InputNick')) {
          //중복확인 필요할 때
          children[3].classList.add('On');
        }
        return;
      }
      children[2].classList.remove('On');
      if (target.classList.contains('Password')) {
        children[3].classList.remove('Over');
        return;
      }
      if (target.classList.contains('InputNick')) {
        children[3].classList.remove('On');
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
      const { children } = target.parentNode;
      children[0].value = '';
      target.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거

      if (children[0].classList.contains('InputNick')) {
        //중복확인 input일 때
        inputDouble?.classList.remove('On');
        children[0].disabled = false;
        children[4].classList.remove('On');
        children[5].innerText = '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)';
      }

      children[0].blur();
      children[0].focus(); // input 지운 후 바로 포커스되도록
      if (children[0].classList.contains('Password')) {
        passwordShow?.classList.remove('Over');
      }
    });
  });

  const passwordShow = document.querySelectorAll('.PasswordShow');
  const password = document.querySelectorAll('.Password');

  passwordShow.forEach((e, i) => {
    e.addEventListener('mousedown', (e) => {
      // password보기 버튼 클릭 이벤트
      e.preventDefault();
      const { target } = e;
      const { children } = target.parentNode;
      children[0].blur();
      children[0].focus(); // 버튼 누르면 바로 포커스되도록
      target.classList.toggle('On'); // error상태시 On 대신 Error 클래스로
      const passwordType = password[i].getAttribute('type')
      passwordType === "password" ? password[i].setAttribute('type', 'text') : password[i].setAttribute('type', 'password');
    });
  });

};



export const ProgressTransition = () => {
  //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  const SignLength = document.querySelectorAll('.ModalContents.On .InputList>li')?.length;
  const Signwidth = 100 / SignLength; //회원가입 진행도 1개당 올라가는 width
  let SignProgress = 0; //회원가입 진행도
  if (document.querySelector('.StepSlide') !== null) {
    SignProgress = document.querySelectorAll('.ModalContents.On .Checked').length;
    console.log(SignProgress, SignLength);
    const stepbar1 = document.querySelectorAll(".StepSlide1 .Stepbar");
    const stepbar2 = document.querySelectorAll(".StepSlide2 .Stepbar");
    if (signStep === 1) {
      //회원가입 1단계일떄
      stepbar1.forEach((e) => e.style.width = `${SignProgress * Signwidth}%`);
    } else {
      //회원가입 2단계일떄
      stepbar2.forEach((e) => e.style.width = `${SignProgress * Signwidth}%`);
    }

    const signStepBtn = document.querySelectorAll('button.SignStep');
    if (SignProgress >= SignLength) {
      signStepBtn[signStep - 1].classList.remove('Disable');
      signStepBtn[signStep - 1].disabled = false;
    } else {
      signStepBtn[signStep - 1].classList.add('Disable');
      signStepBtn[signStep - 1].disabled = 'disabled';
    }
  }
};