import { signInfo } from "./sign.js";

export const signStep4 = () => {
  const ModalTitle = document.querySelector(".ModalTitle");
  ModalTitle.innerHTML = "";
  document.querySelector(".ResultProfile img").src= `/assets/images/${signInfo.profile}`;
  document.querySelector(".ResultTitle span").innerText = signInfo.nickname;
  document.querySelector(".ResultProfile").style.backgroundColor = signInfo.profileBg;
}