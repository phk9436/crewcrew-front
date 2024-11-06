import { signStep1 } from "./signStep1.js";
import { signStep2 } from "./signStep2.js";
import { signStep3 } from "./signStep3.js";

export let signStep = 1;

export const signFunc = () => {
  signStep === 1 && signStep1(signStep);
  signStep === 2 && signStep2();
  signStep === 3 && signStep3(signStep);
  console.log(signStep)
}

export const nextStepBtn = () => {
  document.querySelectorAll("button.SignStep").forEach((e) => {
    e.addEventListener("click", () => {
      signStep++;
      signFunc();
      const ModalContents = document.querySelectorAll(".ModalContents");
      ModalContents.forEach((e) => e.classList.remove("On"));
      ModalContents[signStep].classList.add("On");
    });
  });
}
