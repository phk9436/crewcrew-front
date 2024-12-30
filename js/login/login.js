export const loginFunc = (e) => {
  e.preventDefault();
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const email = document.querySelector(".InputLoginEmail");
  const emailValue = email.value;
  const member = memberData.find((e) => e.email === email.value);
  const password = document.querySelector(".InputLoginPassword");
  const passwordValue = password.value;
  const stayLogin = document.querySelector("#LogInCheck").checked;
  if (!member) {
    email.classList.add("Error");
    email.closest("li").querySelector(".InputTxt").innerText = "이메일 주소가 맞지 않습니다";
    email.closest("li").querySelector(".InputTxt").classList.add("Error");
    email.addEventListener("blur", () => {
      email.classList.remove("Error");
      email.closest("li").querySelector(".InputTxt").innerText = "가입된 이메일 주소를 입력해주세요";
      email.closest("li").querySelector(".InputTxt").classList.remove("Error");
    });
  }
  if (!member || passwordValue !== member.password) {
    password.classList.add("Error");
    password.closest("li").querySelector(".InputTxt").innerText = "비밀번호가 맞지 않습니다";
    password.closest("li").querySelector(".InputTxt").classList.add("Error");
    password.addEventListener("blur", () => {
      password.classList.remove("Error");
      password.closest("li").querySelector(".InputTxt").innerText = "가입된 비밀번호를 입력해 주세요";
      password.closest("li").querySelector(".InputTxt").classList.remove("Error");
    });
  }
  if (emailValue === member.email && passwordValue === member.password) {
    stayLogin ? localStorage.setItem("isLogin", true) : sessionStorage.setItem("isLogin", true);
    localStorage.setItem("userData", JSON.stringify(member));
    location.reload();
  }
}