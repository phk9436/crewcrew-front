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
  document.querySelector(".FindPassword").addEventListener("click", findPasswordFunc);
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
};

const inputError = (el, msg, msg2) => {
  el.classList.add("Error");
  el.closest("li").querySelector(".InputTxt").innerText = msg;
  el.closest("li").querySelector(".InputTxt").classList.add("Error");
  el.addEventListener("blur", () => {
    el.classList.remove("Error");
    el.closest("li").querySelector(".InputTxt").innerText = msg2;
    el.closest("li").querySelector(".InputTxt").classList.remove("Error");
  });
};

let findStep = 1;

const findPasswordFunc = () => {
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const email = document.querySelector(".InputSignedEmail");
  const userData = memberData.find((e) => e.email === email.value);
  if (findStep === 1) {
    confirmEmail(memberData);
    return;
  }
  if (findStep === 2) {
    confirmAnswer(userData);
    return;
  }
  if (findStep === 3) {
    resetPassword(memberData, userData);
    return;
  }
};

const confirmEmail = (memberData) => {
  const email = document.querySelector(".InputSignedEmail");
  if (!email.value) {
    inputError(email, "이메일 주소가 입력되지 않았습니다.", "가입했던 이메일 주소를 입력해주세요.");
    return;
  }
  const userData = memberData.find((e) => e.email === email.value);
  if (!userData) {
    inputError(email, "가입되지 않은 이메일입니다.", "가입했던 이메일 주소를 입력해주세요.");
    return;
  }
  email.disabled = true;
  email.closest("li").querySelector(".InputDel").classList.remove("On");
  document.querySelector(".passwordDesc").classList.add("On");
  document.querySelector(".passwordAsk").classList.add("On");
  document.querySelector(".passwordAnswer").classList.add("On");
  document.querySelector(".passwordAsk").innerText = userData.passwordAsk;
  findStep++;
};

const confirmAnswer = (userData) => {
  const inputAnswer = document.querySelector(".InputFindPasswordAnswer");
  if (!inputAnswer.value) {
    inputError(inputAnswer, "비밀번호 찾기 답변이 입력되지 않았습니다.", "비밀번호 찾기 답변을 입력해주세요.");
    return;
  }
  if (inputAnswer.value !== userData.passwordAnswer) {
    inputError(inputAnswer, "비밀번호 찾기 답변이 맞지 않습니다.", "비밀번호 찾기 답변을 입력해주세요.");
    return;
  }
  document.querySelectorAll(".passwordDesc")[0].classList.remove("On");
  document.querySelectorAll(".passwordDesc")[1].classList.add("On");
  document.querySelector(".passwordAsk").classList.remove("On");
  document.querySelector(".passwordAnswer").classList.remove("On");
  document.querySelectorAll(".passwordConfirm").forEach((e) => e.classList.add("On"));
  document.querySelector(".FindPassword").innerText = "비밀번호 재설정";
  findStep++;
};

const resetPassword = (memberData, userData) => {
  const newPassword = document.querySelector(".InputNewPassword");
  const newPasswordConfirm = document.querySelector(".InputNewPasswordConfirm");
  if (!newPassword.value || !newPasswordConfirm.value) {
    if (!newPassword.value) inputError(newPassword, "새 비밀번호가 입력되지 않았습니다.", "새 비밀번호를 입력해주세요.");
    if (!newPasswordConfirm.value) inputError(newPasswordConfirm, "새 비밀번호가 입력되지 않았습니다.", "새 비밀번호를 다시 입력해주세요.");
    return;
  }
  if (newPassword.value !== newPasswordConfirm.value) {
    inputError(newPasswordConfirm, "새 비밀번호가 서로 다릅니다.", "새 비밀번호를 다시 입력해주세요.");
    return;
  }
  memberData = memberData.map((e) => {
    if (e.email !== userData.email) return e;
    return {
      ...e,
      password: newPassword.value
    }
  });
  localStorage.setItem("memberData", JSON.stringify(memberData));
  alert("비밀번호가 재설정됐습니다.");
  location.href = "/";
};