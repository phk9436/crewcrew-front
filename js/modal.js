import { inputFunc } from "./inputFunc.js";
import { signFunc, signStep, nextStepBtn } from "./sign/sign.js";

const loginForm = /* html */ `
<div class="ModalContents ContentLogin On">
  <ul class="InputList">
    <li>
      <input type="email" id="LogInEmail" class="InputFull" />
      <label for="LogInEmail" class="LabelFull">이메일</label>
      <div class="InputDel"></div>
      <p class="InputTxt">가입된 이메일 주소를 입력해 주세요</p>
    </li>
    <li>
      <input type="password" id="LogInPassword" class="InputFull Password" />
      <label for="LogInPassword" class="LabelFull">비밀번호</label>
      <div class="InputDel"></div>
      <div class="PasswordShow"></div>
      <p class="InputTxt">숫자/영문/특수문자 포함 8~20글자</p>
    </li>
  </ul>

  <button type="submit" class="ButtonFull">로그인</button>

  <ul class="SubList">
    <li>
      <input type="checkbox" id="LogInCheck" class="InputHide" />
      <label for="LogInCheck" class="LabelCheck"><span></span>로그인상태유지</label>
    </li>
    <li>
      <p>비밀번호 찾기</p>
    </li>
  </ul>

  <p class="SnsTitle">또는 간편하게</p>

  <ul class="SnsList">
    <li>
      <button type="button" class="ButtonSns Naver">
        <img src="/assets/images/Naver.png" alt="네이버" />네이버 로그인
      </button>
    </li>
    <li>
      <button type="button" class="ButtonSns Kakao">
        <img src="/assets/images/Kakao.png" alt="카카오" />카카오 로그인
      </button>
    </li>
  </ul>
</div>
`

const signForm1 = /* html */ `
<div class="ModalContents ContentSignStep1">
  <ul class="InputList Sign">
    <li>
      <input type="text" id="SignName" class="InputFull" />
      <label for="SignName" class="LabelFull">이름</label>
      <div class="InputDel"></div>
      <p class="InputTxt">본명을 입력해 주세요</p>
    </li>
    <li>
      <ul class="ListFlex">
        <li>
          <input type="text" id="SignEmailID" class="InputFull CheckAllInput InputColumn" />
          <label for="SignEmailID" class="LabelFull">이메일</label>
          <div class="InputDel"></div>
        </li>
        <li class="MailList">
          <input type="text" id="SignEmailDomain" class="InputFull InputMail CheckAllInput InputColumn" autocomplete="off"
            placeholder="example.com" />
          <label for="SignEmailDomain" class="LabelMail">@</label>
          <div class="InputDel"></div>
        </li>
      </ul>
      <p class="InputTxt">가입할 이메일 주소를 입력해주세요.</p>
    </li>
    <li>
      <input type="password" id="SignPassword" class="InputFull Password" />
      <label for="SignPassword" class="LabelFull">비밀번호</label>
      <div class="InputDel"></div>
      <div class="PasswordShow"></div>
      <p class="InputTxt">숫자/영문/특수문자 포함 8~20글자</p>
    </li>
  </ul>

  <button type="submit" class="ButtonFull SignStep SignStep1 Disable" disabled="disabled">다음 단계로!</button>
  <ul class="ListFlex SignStep1">
    <li>
      <div class="StepSlide StepSlide1">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide2">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide3">
        <div class="Stepbar"></div>
      </div>
    </li>
  </ul>
</div>
`

const modalLogin = /* html */`
<div class="ModalBg"></div>

<div class="ModalBox">
  <div class="ModalHeader">
    <ul class="ModalTop">
      <li></li> <!--이전 단계로 가는 버튼 있을 시 여기 생성-->
      <li>
        <span class="ModalClose"></span>
      </li>
    </ul>

    <ul class="ModalTitle">
      <li class="LogIn On">로그인</li>
      <li class="Sign">회원가입</li>
    </ul>
  </div>

  <div class="ModalBody">
    ${loginForm}
    ${signForm1}
  </div>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let isCreated = false;

  const createModal = () => {
    if (!isCreated) {
      const ModalWrapper = document.createElement("div");
      ModalWrapper.classList.add("ModalWrapper");
      ModalWrapper.innerHTML = modalLogin;
      body.append(ModalWrapper);
      body.classList.add("Modal");
      document.querySelector(".ModalWrapper").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".ModalWrapper").classList.add("Modal");
      }, 10);
      isCreated = true;
      document.querySelector(".ModalBg").addEventListener("click", removeModal);
      document.querySelector(".ModalClose").addEventListener("click", removeModal);
      inputFunc(); //인풋 입력 관련 함수
      nextStepBtn(); //회원가입 스탭버튼 이벤트등록
      toggleModalForm(); //모달폼 렌더링 함수
      return;
    }

    document.querySelector(".ModalWrapper").style.display = "flex";
    body.classList.add("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").classList.add("Modal");
    }, 10);
  };
  const removeModal = () => {
    body.classList.remove("Modal");
    document.querySelector(".ModalWrapper").classList.remove("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").style.display = "none";
    }, 500);
  };
  document.querySelector(".btnLogin").addEventListener("click", createModal);

  const toggleModalForm = () => {
    const ModalList = document.querySelectorAll(".ModalTitle li");
    const ModalContents = document.querySelectorAll(".ModalContents");
    ModalList.forEach((e) => {
      e.addEventListener("click", ({ target }) => {
        if (target.classList.contains("On")) return;
        ModalList.forEach((e) => e.classList.toggle("On"));
        ModalContents.forEach((e) => e.classList.remove("On"));
        if (target.classList.contains("LogIn")) {
          ModalContents[0].classList.add("On");
        }
        if (target.classList.contains("Sign")) {
          ModalContents[signStep].classList.add("On");
          signFunc();
        }
      });
    });
  }
});
