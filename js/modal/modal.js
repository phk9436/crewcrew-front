import { inputFunc } from "./inputFunc.js";
import { signFunc, signStep, nextStepBtn } from "../sign/sign.js";
import { loginFunc } from "../login/login.js";

const loginForm = /* html */ `
<div class="ModalContents ContentLogin On">
  <ul class="InputList">
    <li>
      <input type="email" id="LogInEmail" class="InputFull InputLoginEmail" />
      <label for="LogInEmail" class="LabelFull">이메일</label>
      <div class="InputDel"></div>
      <p class="InputTxt">가입된 이메일 주소를 입력해 주세요</p>
    </li>
    <li>
      <input type="password" id="LogInPassword" class="InputFull Password InputLoginPassword" />
      <label for="LogInPassword" class="LabelFull">비밀번호</label>
      <div class="InputDel"></div>
      <div class="PasswordShow"></div>
      <p class="InputTxt">가입된 비밀번호를 입력해 주세요</p>
    </li>
  </ul>

  <button type="submit" class="ButtonFull ButtonLogin">로그인</button>

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
`;

const signForm1 = /* html */ `
<div class="ModalContents ContentSignStep1">
  <ul class="InputList Sign">
    <li>
      <input type="text" id="SignName" class="InputFull InputName" />
      <label for="SignName" class="LabelFull">이름</label>
      <div class="InputDel"></div>
      <p class="InputTxt">본명을 입력해 주세요</p>
    </li>
    <li>
      <ul class="ListFlex">
        <li>
          <input type="text" id="SignEmailID" class="InputFull CheckAllInput InputColumn InputMail1" />
          <label for="SignEmailID" class="LabelFull">이메일</label>
          <div class="InputDel"></div>
        </li>
        <li class="MailList">
          <input type="text" id="SignEmailDomain" class="InputFull InputMail CheckAllInput InputColumn InputMail2" autocomplete="off"
            placeholder="example.com" />
          <label for="SignEmailDomain" class="LabelMail">@</label>
          <div class="InputDel"></div>
        </li>
      </ul>
      <p class="InputTxt">가입할 이메일 주소를 입력해주세요.</p>
    </li>
    <li>
      <input type="password" id="SignPassword" class="InputFull Password InputPassword" />
      <label for="SignPassword" class="LabelFull">비밀번호</label>
      <div class="InputDel"></div>
      <div class="PasswordShow"></div>
      <p class="InputTxt">가입할 비밀번호를 입력해주세요.</p>
    </li>
  </ul>

  <button type="submit" class="ButtonFull SignStep SignStep1 Disable" disabled="disabled">다음 단계로!</button>
  <ul class="ListFlex SignStep1">
    <li>
      <div class="StepSlide StepSlide1">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide2">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide3">
        <div class="Stepbar"></div>
      </div>
    </li>
  </ul>
</div>
`;

const signForm2 = /*html*/ `
<div class="ModalContents ContentSignStep2">
    <ul class="InputList Sign">

      <li>
        <input type="text" id="SignNickname" class="InputFull InputNick" />
        <label for="SignNickname" class="LabelFull">닉네임</label>
        <div class="InputDel"></div>
        <div class="InputDouble">중복확인</div>
        <div class="InputChecked"></div>
        <p class="InputTxt TxtNick">앞으로 사용할 닉네임을 입력해주세요. (10자 이내)</p>
      </li>

      <li class="ProfileSection">
        <div class="ProfileBox">
          <div class="ProfileShow">
            <p class="ProfileTitle">프로필 사진</p>
            <label for="ProfileUpload" class="ProfileChange">사진변경</label>
            <div class="ProfileImg Grayed">
              <img src="/assets/images/Profile1.png" alt="">
            </div>
            <div class="ProfileBg"></div>
          </div>
          <div class="ProfileSelect">
            <ul class="SelectWrapper">
              <li>
                <ul class="ProfileList">
                  <li>
                    <input type="radio" id="Profile1" class="InputHide ProfileSelectRadio" name="ProfileSelectRadio">
                    <label for="Profile1" class="OuterCircle">
                      <div class="InnerCircle">
                        <img src="/assets/images/Profile1.png" alt="">
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="Profile2" class="InputHide ProfileSelectRadio" name="ProfileSelectRadio">
                    <label for="Profile2" class="OuterCircle">
                      <div class="InnerCircle">
                        <img src="/assets/images/Profile2.png" alt="">
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="Profile3" class="InputHide ProfileSelectRadio" name="ProfileSelectRadio">
                    <label for="Profile3" class="OuterCircle">
                      <div class="InnerCircle">
                        <img src="/assets/images/Profile3.png" alt="">
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="Profile4" class="InputHide ProfileSelectRadio" name="ProfileSelectRadio">
                    <label for="Profile4" class="OuterCircle">
                      <div class="InnerCircle">
                        <img src="/assets/images/Profile4.png" alt="">
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="Profile5" class="InputHide ProfileSelectRadio" name="ProfileSelectRadio">
                    <label for="Profile5" class="OuterCircle">
                      <div class="InnerCircle">
                        <img src="/assets/images/Profile5.png" alt="">
                      </div>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <p class="ProfileDesc">프로필 캐릭터를 선택해주세요!</p>
      </li>

    </ul>

    <button type="submit" class="ButtonFull SignStep SignStep2 Disable" disabled="disabled">거의 다 왔어요!</button>
    <ul class="ListFlex SignStep1">
      <li>
        <div class="StepSlide StepSlide1">
          <div class="Stepbar"></div>
        </div>
      </li>
      <li>
        <div class="StepSlide StepSlide2">
          <div class="Stepbar"></div>
        </div>
      </li>
      <li>
        <div class="StepSlide StepSlide3">
          <div class="Stepbar"></div>
        </div>
      </li>
    </ul>

</div>
`;

const signForm3 = /*html*/ `
<div class="ModalContents ContentSignStep3">
  <ul class="InputList SignStep3 Sign">
    <li class="ChooseList study">
      <ul class="ChooseListDetail">
        <li>
          <input type="text" class="ChooseTitle" id="SignStudy" readonly>
          <label for="SignStudy" class="LabelAttached">어떤 스터디 크루원이 필요하세요?</label>
        </li>
        <li>
          <input type="checkbox" id="SignStudy1" class="InputHide InputChoose" name="SignStudy" value="어학">
          <label for="SignStudy1" class="LabelChoose">
            <p class="Choose">
              <em>어학</em>(토플/토익)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignStudy2" class="InputHide InputChoose" name="SignStudy" value="취업">
          <label for="SignStudy2" class="LabelChoose">
            <p class="Choose">
              <em>취업</em>(면접/자소서)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignStudy3" class="InputHide InputChoose" name="SignStudy" value="고시/공무원">
          <label for="SignStudy3" class="LabelChoose">
            <p class="Choose">
              <em>고시/공무원</em>
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignStudy4" class="InputHide InputChoose" name="SignStudy" value="사이드프로젝트">
          <label for="SignStudy4" class="LabelChoose">
            <p class="Choose">
              <em>사이드프로젝트</em>(디자인/개발)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignStudy5" class="InputHide InputChoose" name="SignStudy" value="기타">
          <label for="SignStudy5" class="LabelChoose">
            <p class="Choose">
              <em>기타</em>(이중에 없어요!)
              <span class="ChooseCancel"></span>
            </p>
          </label>
          <button class="ChooseComplete" disabled>완료</button>
        </li>
      </ul>

      <ul class="ChooseListUnder"></ul>
    </li>

    <li class="ChooseList hobby">
      <ul class="ChooseListDetail">
        <li>
          <input type="text" class="ChooseTitle" id="SignHobby" readonly>
          <label for="SignHobby" class="LabelAttached">어떤 취미를 가지고 계신가요?</label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby1" class="InputHide InputChoose" name="SignHobby" value="예술">
          <label for="SignHobby1" class="LabelChoose">
            <p class="Choose">
              <em>예술</em>(공예/회화)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby2" class="InputHide InputChoose" name="SignHobby" value="요리">
          <label for="SignHobby2" class="LabelChoose">
            <p class="Choose">
              <em>요리</em>(요리/맛집탐방/카페탐방)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby3" class="InputHide InputChoose" name="SignHobby" value="운동">
          <label for="SignHobby3" class="LabelChoose">
            <p class="Choose">
              <em>운동</em>(헬스/구기종목)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby4" class="InputHide InputChoose" name="SignHobby" value="게임">
          <label for="SignHobby4" class="LabelChoose">
            <p class="Choose">
              <em>게임</em>(보드게임/온라인게임)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby5" class="InputHide InputChoose" name="SignHobby" value="덕질">
          <label for="SignHobby5" class="LabelChoose">
            <p class="Choose">
              <em>덕질</em>(코스프레/콘서트/프라모델)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby6" class="InputHide InputChoose" name="SignHobby" value="트렌드">
          <label for="SignHobby6" class="LabelChoose">
            <p class="Choose">
              <em>트렌드</em>(뷰티/패션)
              <span class="ChooseCancel"></span>
            </p>
          </label>
        </li>
        <li>
          <input type="checkbox" id="SignHobby7" class="InputHide InputChoose" name="SignHobby" value="기타">
          <label for="SignHobby7" class="LabelChoose">
            <p class="Choose">
              <em>기타</em>(이중에 없어요!)
              <span class="ChooseCancel"></span>
            </p>
          </label>
          <button class="ChooseComplete" disabled>완료</button>
        </li>
      </ul>

      <ul class="ChooseListUnder"></ul>
    </li>

    <li class="ChooseLast">
      <input type="text" id="SignMessage" class="InputFull InputMessage" />
      <label for="SignMessage" class="LabelFull">한줄 메세지</label>
      <div class="InputDel"></div>
      <p class="InputTxt">나를 소개하는 한 줄 메세지를 입력해주세요.(30자 이내)</p>
    </li>
  </ul>

  <button type="submit" class="ButtonFull SignStep Disable" disabled="disabled">회원가입 완료!</button>
  <ul class="ListFlex SignStep1">
    <li>
      <div class="StepSlide StepSlide1">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide2">
        <div class="Stepbar"></div>
      </div>
    </li>
    <li>
      <div class="StepSlide StepSlide3">
        <div class="Stepbar"></div>
      </div>
    </li>
  </ul>

</div>
`;

const signForm4 = /*html*/ `
<div class="ModalContents ContentSignStep4">
  <div class="ResultProfileWrapper">
    <div class="ResultProfileCont">
      <img src="/assets/images/IconFlag.png" alt="" class="ResultFlag">
      <div class="ResultProfile">
        <img src="/assets/images/Profile1.png" alt="">
      </div>
    </div>
    <h2 class="ResultTitle"><b><span>닉네임</span>님,</b> 환영해요!</h2>
    <p class="ResultTxt">
      회원가입을 성공적으로 마쳤어요.<br>
      크루크루와 함께 힘차게 출발해봐요~!
    </p>
  </div>
  <button type="button" class="ButtonFull Sign4">확인</button>
</div>
`

const modalLogin = /* html */`
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
    ${loginForm}
    ${signForm1}
    ${signForm2}
    ${signForm3}
    ${signForm4}
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
      body.classList.add("Modal");
      document.querySelector(".ModalWrapper").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".ModalWrapper").classList.add("Modal");
      }, 10);
      isCreated = true;
      document.querySelector(".ModalBg").addEventListener("click", removeModal);
      document.querySelector(".ModalClose").addEventListener("click", removeModal);
      inputFunc(); //인풋 입력 관련 함수
      nextStepBtn(); //회원가입 스탭버튼 이벤트등록
      toggleModalForm(); //모달폼 렌더링 함수
      document.querySelector(".ButtonLogin").addEventListener("click", loginFunc);
      return;
    }

    document.querySelector(".ModalWrapper").style.display = "flex";
    body.classList.add("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").classList.add("Modal");
    }, 10);
  };
  const removeModal = () => {
    body.classList.remove("Modal");
    document.querySelector(".ModalWrapper").classList.remove("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").style.display = "none";
    }, 500);
  };
  document.querySelector(".btnLogin").addEventListener("click", createModal);

  const toggleModalForm = () => {
    const ModalList = document.querySelectorAll(".ModalTitle li");
    const ModalContents = document.querySelectorAll(".ModalContents");
    ModalList.forEach((e) => {
      e.addEventListener("click", ({ target }) => {
        if (target.classList.contains("On")) return;
        ModalList.forEach((e) => e.classList.toggle("On"));
        ModalContents.forEach((e) => e.classList.remove("On"));
        if (target.classList.contains("LogIn")) {
          ModalContents[0].classList.add("On");
        }
        if (target.classList.contains("Sign")) {
          ModalContents[signStep].classList.add("On");
          signFunc();
        }
      });
    });
  }
});
