import { ProgressTransition } from "./signInputFunc.js";
import { signInfo } from "./sign.js";

let isMailIdChecked = false;
let isMailDomainChecked = false;
export const signStep1 = (signStep) => {
  const checkAllInput = document.querySelectorAll(".ModalContents")[signStep].querySelectorAll(".CheckAllInput");
  checkAllInput.forEach((e) => {
    e.addEventListener("blur", ({ target }) => {
      //ProgressTransition 함수 관련
      if (!target.classList.contains("InputMail")) {
        isMailIdChecked = target.value ? true : false;
      }
      if (target.classList.contains("InputMail")) {
        const domainRegex = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const domainTest = domainRegex.test(target.value);
        isMailDomainChecked = domainTest ? true : false;
        if (target.value) {
          const msg = target.closest(".ListFlex").nextElementSibling;
          if (!domainTest) {
            target.classList.add("Error");
            msg.innerText = "이메일 도메인 양식이 잘못됐습니다.";
            msg.classList.add("Error");
          } else {
            target.classList.remove("Error");
            msg.innerText = "가입할 이메일 주소를 입력해주세요.";
            msg.classList.remove("Error");
          }
        }
      }
      if (isMailIdChecked && isMailDomainChecked) {
        const memberData = JSON.parse(localStorage.getItem("memberData"));
        const member = memberData.find((e) => e.email === `${checkAllInput[0].value}@${checkAllInput[1].value}`);
        if (member) {
          checkAllInput.forEach((e) => e.classList.add("Error"));
          const msg = checkAllInput[0].closest(".ListFlex").nextElementSibling;
          msg.innerText = "이미 가입된 이메일입니다.";
          msg.classList.add("Error");
          target.closest("ul.ListFlex").parentNode.classList.remove("Checked");
        } else {
          checkAllInput.forEach((e) => e.classList.remove("Error"));
          const msg = checkAllInput[0].closest(".ListFlex").nextElementSibling;
          msg.innerText = "가입할 이메일 주소를 입력해주세요.";
          msg.classList.remove("Error");
          target.closest("ul.ListFlex").parentNode.classList.add("Checked");
        }
      } else {
        target.closest("ul.ListFlex").parentNode.classList.remove("Checked");
      }
      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
  });


  const AskList = document.querySelector(".AskList");
  const InputPasswordAsk = document.querySelector(".InputPasswordAsk");
  InputPasswordAsk.addEventListener("focus", ({ target }) => {
    target.closest(".AskList").classList.add("On");
    setTimeout(() => target.placeholder = "비밀번호 찾기 질문을 선택해주세요", 300);
    AskList.classList.add("On");
  });

  const toggleAsk = (isValid) => {
    if (isValid) {
      AskList.classList.add("valid");
      AskList.querySelector("li").classList.add("Checked");
      AskList.querySelector(".LabelFull").classList.add("On");
      ProgressTransition();
      return;
    }
    AskList.classList.remove("valid");
    AskList.querySelector("li").classList.remove("Checked");
    AskList.querySelector(".LabelFull").classList.remove("On");
    ProgressTransition();
  };

  InputPasswordAsk.addEventListener("blur", ({ target }) => {
    target.closest(".AskList").classList.remove("On");
    target.placeholder = "";
    target.value ? toggleAsk(true) : toggleAsk(false);
  });

  const AskSelect = document.querySelectorAll(".AskList li");
  AskSelect.forEach((e, i) => e.addEventListener("click", () => {
    if (i === 0) return;
    if (i === AskSelect.length - 1) {
      InputPasswordAsk.value = "";
      InputPasswordAsk.readOnly = false;
      InputPasswordAsk.focus();
      return;
    }
    InputPasswordAsk.value = e.querySelector("p").innerText;
    InputPasswordAsk.readOnly = true;
    toggleAsk(true);
  }));
};

export const saveSigndata1 = () => {
  const emailValue1 = document.querySelector(".InputMail1").value;
  const emailValue2 = document.querySelector(".InputMail2").value;
  signInfo.username = document.querySelector(".InputName").value;
  signInfo.email = `${emailValue1}@${emailValue2}`;
  signInfo.password = document.querySelector(".InputPassword").value;
  signInfo.passwordAsk = document.querySelector(".InputPasswordAsk").value;
  signInfo.passwordAnswer = document.querySelector(".InputPasswordAnswer").value;
};