import { createPost, postInputFunc } from "../post/postCreate.js";
import { setDateFormat } from "../common.js";

const postmodal = /*html*/ `
  <div class="ModalBg"></div>

  <div class="ModalBoxPost">
    <div class="ModalPostBody">
      <div class="HeaderContent">
        <div>
          <h4>카테고리</h4>
          <ul class="PostListFlex PostCategory">
            <li>
              <input type="radio" class="InputHide InputPostRadio" name="PostCat" id="PostStudy" checked>
              <label for="PostStudy" class="ButtonPost ButtonPostStudy">스터디</label>
            </li>
            <li>
              <input type="radio" class="InputHide InputPostRadio" name="PostCat" id="PostHobby">
              <label for="PostHobby" class="ButtonPost ButtonPostHobby">취미</label>
            </li>
          </ul>
        </div>
        <div>
          <h4>상세 카테고리</h4>
          <ul class="PostListDrop PostListCatDet Study">
            <li>
              <input type="text" class="InputPostCatDet InputChoose" autocomplete="off" readonly
                placeholder="어떤 스터디 크루원이 필요하세요?">
              <span class="Arrow"></span>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetStudy1" value="어학">
              <label for="DetStudy1" class="LabelChoose">
                <p class="Choose"><em>어학</em>(토플/토익)</p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetStudy2" value="취업">
              <label for="DetStudy2" class="LabelChoose">
                <p class="Choose"><em>취업</em>(면접/자소서)</p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetStudy3" value="고시/공무원">
              <label for="DetStudy3" class="LabelChoose">
                <p class="Choose"><em>고시/공무원</em></p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetStudy4" value="프로젝트">
              <label for="DetStudy4" class="LabelChoose">
                <p class="Choose"><em>프로젝트</em>(디자인/개발)</p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetStudy5" value="기타">
              <label for="DetStudy5" class="LabelChoose">
                <p class="Choose"><em>기타</em></p>
              </label>
            </li>
          </ul>
          <ul class="PostListDrop PostListCatDet Hobby" style="display: none;">
            <li>
              <input type="text" class="InputPostCatDet InputChoose" autocomplete="off" readonly
                placeholder="어떤 취미 크루원이 필요하세요?">
              <span class="Arrow"></span>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby1" value="요리">
              <label for="DetHobby1" class="LabelChoose">
                <p class="Choose"><em>요리</em></p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby2" value="운동">
              <label for="DetHobby2" class="LabelChoose">
                <p class="Choose"><em>운동</em></p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby3" value="게임">
              <label for="DetHobby3" class="LabelChoose">
                <p class="Choose"><em>게임</em></p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby4" value="덕질">
              <label for="DetHobby4" class="LabelChoose">
                <p class="Choose"><em>덕질</em>(아이돌/애니 등)</p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby5" value="트렌드">
              <label for="DetHobby5" class="LabelChoose">
                <p class="Choose"><em>트렌드</em></p>
              </label>
            </li>
            <li>
              <input type="radio" class="InputHide" name="PostCatDet" id="DetHobby6" value="기타">
              <label for="DetHobby6" class="LabelChoose">
                <p class="Choose"><em>기타</em></p>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="HeaderContent">
        <div>
          <h4>모임방식</h4>
          <ul class="PostListFlex PostPlace">
            <li>
              <input type="radio" class="InputHide InputPostRadio" name="PostOnline" id="PostOnline" checked value="온라인">
              <label for="PostOnline" class="ButtonPost">온라인</label>
            </li>
            <li>
              <input type="radio" class="InputHide InputPostRadio" name="PostOnline" id="PostOffline" value="오프라인">
              <label for="PostOffline" class="ButtonPost">오프라인</label>
            </li>
          </ul>
        </div>
        <div class="ContentFlex">
          <div>
            <h4>모집 인원수</h4>
            <div class="PostListPeople">
              <input type="number" class="InputPostPeople InputFull" value="3" max="100">
              <span class="ArrowNum Up"></span>
              <span class="ArrowNum Down"></span>
            </div>
          </div>
          <div>
            <h4>마감일자</h4>
            <input type="date" value="${setDateFormat(1)}" class="InputFull InputDate">
          </div>
        </div>
      </div>
      <div class="ToolTipWrapper">
        <h4>초대링크 <span class="ToolTip">?</span></h4>
        <div class="ToolTipDt">
          모집글에 참여한 지원자가 입장할 수 있는 채팅방의 링크를 생성 후 이곳에 기입해주세요! 링크는 참여자에게만 보여집니다.<br>예시) 카카오톡 오픈채팅방 링크
        </div>
        <div class="InputBox">
          <input type="text" class="InputFull InputTitle InputLink">
          <div class="InputDel"></div>
        </div>
      </div>

      <h4>제목</h4>
      <div class="InputBox">
        <input type="text" class="InputFull InputTitle InputPostTitle">
        <div class="InputDel"></div>
      </div>

      <h4>내용</h4>
      <div class="TextArea">
        <textarea name="" id="" class="PostContent"></textarea>
      </div>
    </div>

    <div class="ModalPostFooter">
      <ul class="PostListFlex">
        <li>
          <button type="button" class="ButtonPost ButtonPostCancle">취소</button>
        </li>
        <li>
          <button type="submit" class="ButtonPost ButtonPostUpload">업로드</button>
        </li>
      </ul>
    </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let isCreated = false;
  const createPostmodal = () => {
    if (!isCreated) {
      const ModalWrapper = document.createElement("div");
      ModalWrapper.classList.add("ModalWrapper");
      ModalWrapper.innerHTML = postmodal;
      body.append(ModalWrapper);
      body.classList.add("Modal");
      document.querySelector(".ModalWrapper").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".ModalWrapper").classList.add("Modal");
      }, 10);
      isCreated = true;
      document.querySelector(".ModalBg").addEventListener("click", removeModal);
      document.querySelector(".ButtonPostCancle").addEventListener("click", removeModal);
      document.querySelector(".ButtonPostUpload").addEventListener("click", createPost);
    }
    document.querySelector(".ModalWrapper").style.display = "flex";
    body.classList.add("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").classList.add("Modal");
    }, 10);
    postInputFunc();
  };
  const removeModal = () => {
    body.classList.remove("Modal");
    document.querySelector(".ModalWrapper").classList.remove("Modal");
    setTimeout(() => {
      document.querySelector(".ModalWrapper").style.display = "none";
    }, 500);
  };
  const openPostmodal = (e) => {
    const isLogin = sessionStorage.getItem("isLogin");
    e.preventDefault();
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    createPostmodal();
  };
  document.querySelectorAll(".createButton").forEach((e) => e.addEventListener("click", openPostmodal));
  document.querySelectorAll(".WriteButton").forEach((e) => e.addEventListener("click", openPostmodal));
});