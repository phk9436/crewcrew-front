import { signInfo } from "./sign.js";

const saveSigndataLocal = () => {
  let memberData = JSON.parse(localStorage.getItem("memberData"));
  signInfo.uid = Number(memberData[0].uid) + 1
  localStorage.setItem("userData", JSON.stringify(signInfo));
  localStorage.setItem("recruitingData", JSON.stringify([]));
  localStorage.setItem("timelineData", JSON.stringify([]));
  localStorage.setItem("waitingData", JSON.stringify([]));
  memberData.unshift({
    uid: signInfo.uid,
    nickname: signInfo.nickname,
    profile: signInfo.profile,
    profileBg: signInfo.profileBg,
    descript: signInfo.descript,
    study: signInfo.study,
    hobby: signInfo.hobby
  });
  localStorage.setItem("memberData", JSON.stringify(memberData));
  location.reload();
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