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
        target.closest("ul.ListFlex").parentNode.classList.add("Checked");
      } else {
        target.closest("ul.ListFlex").parentNode.classList.remove("Checked");
      }
      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
  });
};

export const saveSigndata1 = () => {
  const username = document.querySelector(".InputName").value;
  const emailValue1 = document.querySelector(".InputMail1").value;
  const emailValue2 = document.querySelector(".InputMail2").value;
  const email = `${emailValue1}@${emailValue2}`;
  const password = document.querySelector(".InputPassword").value;
  signInfo.username = username;
  signInfo.email = email;
  signInfo.password = password;
  signInfo.passwordAsk = document.querySelector(".InputPasswordAsk").value;
  signInfo.passwordAnswer = document.querySelector(".InputPasswordAnswer").value;
}