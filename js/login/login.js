export const loginFunc = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) return;
  const email = document.querySelector(".InputLoginEmail");
  const emailValue = email.value;
  const password = document.querySelector(".InputLoginPassword");
  const passwordValue = password.value;
  if (emailValue !== userData.email) {
    email.classList.add("Error");
    email.closest("li").querySelector(".InputTxt").innerText = "이메일 주소가 맞지 않습니다";
    email.closest("li").querySelector(".InputTxt").classList.add("Error");
    email.addEventListener("blur", () => {
      email.classList.remove("Error");
      email.closest("li").querySelector(".InputTxt").innerText = "가입된 이메일 주소를 입력해주세요";
      email.closest("li").querySelector(".InputTxt").classList.remove("Error");
    });
  }
  if (passwordValue !== userData.password) {
    password.classList.add("Error");
    password.closest("li").querySelector(".InputTxt").innerText = "비밀번호가 맞지 않습니다";
    password.closest("li").querySelector(".InputTxt").classList.add("Error");
    password.addEventListener("blur", () => {
      password.classList.remove("Error");
      password.closest("li").querySelector(".InputTxt").innerText = "가입된 비밀번호를 입력해 주세요";
      password.closest("li").querySelector(".InputTxt").classList.remove("Error");
    });
  }
  if (emailValue === userData.email && passwordValue === userData.password) {
    sessionStorage.setItem("isLogin", true);
    location.reload();
  }
}