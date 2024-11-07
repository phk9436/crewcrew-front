import { signInfo } from "./sign.js";

const saveSigndataLocal = () => {
  localStorage.setItem("userData", JSON.stringify(signInfo));
  location.reload(true);
}

export const signStep4 = () => {
  const ModalTitle = document.querySelector(".ModalTitle");
  ModalTitle.innerHTML = "";
  document.querySelector(".ResultProfile img").src = `/assets/images/${signInfo.profile}`;
  document.querySelector(".ResultTitle span").innerText = signInfo.nickname;
  document.querySelector(".ResultProfile").style.backgroundColor = signInfo.profileBg;
  document.querySelector(".ModalBg").addEventListener("click", saveSigndataLocal);
  document.querySelector(".ModalClose").addEventListener("click", saveSigndataLocal);
  document.querySelector("button.Sign4").addEventListener("click", saveSigndataLocal);
}