import { signInfo } from "./sign.js";

const saveSigndataLocal = () => {
  let memberData = JSON.parse(localStorage.getItem("memberData"));
  signInfo.uid = Number(memberData[0].uid) + 1;
  localStorage.setItem("userData", JSON.stringify(signInfo));
  memberData.unshift(signInfo);
  localStorage.setItem("memberData", JSON.stringify(memberData));
  sessionStorage.setItem("isLogin", true);
  location.reload();
};

export const signStep4 = () => {
  const ModalTitle = document.querySelector(".ModalTitle");
  ModalTitle.innerHTML = "";
  document.querySelector(".ResultProfile img").src = `/assets/images/${signInfo.profile}`;
  document.querySelector(".ResultTitle span").innerText = signInfo.nickname;
  document.querySelector(".ResultProfile").style.backgroundColor = signInfo.profileBg;
  document.querySelector(".ModalBg").addEventListener("click", saveSigndataLocal);
  document.querySelector(".ModalClose").addEventListener("click", saveSigndataLocal);
  document.querySelector("button.Sign4").addEventListener("click", saveSigndataLocal);
};