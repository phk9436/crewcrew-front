import { toggleModalForm } from "../modal/modal.js";

export const findPassword = () => {
  document.querySelectorAll(".ModalContents").forEach((e) => e.classList.remove("On"));
  document.querySelector(".ContentPassword").classList.add("On");
  document.querySelector(".ModalTitle").innerHTML = `<li class="On">비밀번호 찾기</li>`;
  document.querySelector(".ModalTop li").innerHTML = /* html */ `
    <p class="ModalArrow">
      <img src="/assets/images/Arrow.png">로그인
    </p>
  `;
  document.querySelector(".ModalArrow").addEventListener("click", backLogin);
};

const backLogin = () => {
  document.querySelector(".ContentPassword").classList.remove("On");
  document.querySelector(".ModalContents").classList.add("On");
  document.querySelector(".ModalTop li").innerHTML = "";
  document.querySelector(".ModalTitle").innerHTML = /* html */ `
    <li class="LogIn On">로그인</li>
    <li class="Sign">회원가입</li>
  `;
  toggleModalForm();
}