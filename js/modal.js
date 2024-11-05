const modalLogin = `
    <div class="ModalBg"></div>
    
    <div class="ModalBox">
      <div class="ModalHeader">
        <ul class="ModalTop">
          <li></li> <!--이전 단계로 가는 버튼 있을 시 여기 생성-->
          <li>
            <span class="ModalClose"></span>
          </li>
        </ul>
       
        <ul class="ModalTitle">
          <li class="LogIn On">로그인</li>
          <li class="Sign">회원가입</li>
        </ul>
      </div>

      <div class="ModalBody">
        <div class="ModalContents ContentLogin On">
            <ul class="InputList">
              <li>
                <input type="email" id="LogInEmail" class="InputFull" />
                <label for="LogInEmail" class="LabelFull">이메일</label>
                <div class="InputDel"></div>
                <p class="InputTxt">가입된 이메일 주소를 입력해 주세요</p>
              </li>
              <li>
                <input type="password" id="LogInPassword" class="InputFull Password" />
                <label for="LogInPassword" class="LabelFull">비밀번호</label>
                <div class="InputDel"></div>
                <div class="PasswordShow"></div>
                <p class="InputTxt">숫자/영문/특수문자 포함 8~20글자</p>
              </li>
            </ul>

            <button type="submit" class="ButtonFull">로그인</button>

            <ul class="SubList">
              <li>
                <input type="checkbox" id="LogInCheck" class="InputHide" />
                <label for="LogInCheck" class="LabelCheck"><span></span>로그인상태유지</label>
              </li>
              <li>
                <p>비밀번호 찾기</p>
              </li>
            </ul>

          <p class="SnsTitle">또는 간편하게</p>

          <ul class="SnsList">
            <li>
              <button type="button" class="ButtonSns Naver">
                <img src="/assets/images/Naver.png" alt="네이버" />네이버 로그인
              </button>
            </li>
            <li>
              <button type="button" class="ButtonSns Kakao">
                <img src="/assets/images/Kakao.png" alt="카카오" />카카오 로그인
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let isCreated = false;
  const createModal = () => {
    if (!isCreated) {
      const ModalWrapper = document.createElement("div");
      ModalWrapper.classList.add("ModalWrapper");
      ModalWrapper.innerHTML = modalLogin;
      body.append(ModalWrapper);
      setTimeout(() => {
        body.classList.add("Modal");
        document.querySelector(".ModalWrapper").classList.add("Modal");
      }, 10);
      isCreated = true;
      document.querySelector(".ModalBg").addEventListener("click", removeModal);
      document.querySelector(".ModalClose").addEventListener("click", removeModal);
      return;
    }
    body.classList.add("Modal");
    document.querySelector(".ModalWrapper").classList.add("Modal");
  };
  const removeModal = () => {
    body.classList.remove("Modal");
    document.querySelector(".ModalWrapper").classList.remove("Modal");
  };
  document.querySelector(".btnLogin").addEventListener("click", createModal);

});
