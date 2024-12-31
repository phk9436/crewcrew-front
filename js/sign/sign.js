import { signStep1, saveSigndata1 } from "./signStep1.js";
import { signStep2, saveSigndata2 } from "./signStep2.js";
import { signStep3, saveSigndata3 } from "./signStep3.js";
import { signStep4 } from "./signStep4.js";

export let signStep = 1;

export let signInfo = {
  uid: 0,
  profile: "",
  profileBg: "",
  username: "",
  nickname: "",
  descript: "",
  study: [],
  hobby: [],
  email: "",
  password: "",
  passwordAsk: "",
  passwordAnswer: "",
  recruitingData: [],
  timelineData: [],
  waitingData: []
}

export const signFunc = () => {
  signStep === 1 && signStep1(signStep);
  signStep === 2 && signStep2();
  signStep === 3 && signStep3();
  signStep === 4 && signStep4();
  if (signStep > 1 && signStep < 4) createSignBack();
}

const SignBack = /*html*/ `
  <p class="ModalArrow">
    <img src="/assets/images/Arrow.png">이전 단계
  </p>
`

const removeSignBack = () => {
  document.querySelectorAll(".ModalTop li")[0].innerHTML = "";
}

const createSignBack = () => {
  document.querySelectorAll(".ModalTop li")[0].innerHTML = SignBack;
  document.querySelector(".ModalArrow").addEventListener("click", () => {
    signStep--;
    signFunc();
    const ModalContents = document.querySelectorAll(".ModalContents");
    ModalContents.forEach((e) => e.classList.remove("On"));
    ModalContents[signStep].classList.add("On");
    signStep === 1 && removeSignBack();
  });
}

export const nextStepBtn = () => {
  document.querySelectorAll("button.SignStep").forEach((e) => {
    e.addEventListener("click", () => {
      signStep === 1 && saveSigndata1();
      signStep === 2 && saveSigndata2();
      signStep === 3 && saveSigndata3();
      signStep++;
      signFunc();
      const ModalContents = document.querySelectorAll(".ModalContents");
      ModalContents.forEach((e) => e.classList.remove("On"));
      ModalContents[signStep].classList.add("On");
      signStep === 4 && removeSignBack();
    });
  });
}