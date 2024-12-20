const setParticiateForm = (id) => {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const data = postData.find((e) => e.id === Number(id));
  const categoryName = (data.categoryName === "기타취미" || data.categoryName === "기타스터디") ? "기타" : data.categoryName;
  const participateForm = /* html */ `
    <div class="ModalBg"></div>
    <div class="ModalBox">
      <div class="ModalHeader">
        <ul class="ModalTop">
          <li></li> <!--이전 단계로 가는 버튼 있을 시 여기 생성-->
          <li>
            <span class="ModalClose"></span>
          </li>
        </ul>
        <div class="PartTitle">
            <h4>${data.title}</h4>
            <ul>
                <li class="${data.category}">${categoryName}</li>
                <li>${data.place}</li>
                <li>${data.nowPop}/${data.fullPop}명</li>
            </ul>
        </div>
      </div>
      <div class="ModalBody">
        <div class="ModalContents On">
          <h5>모집자에게 전달할 메세지를 남겨주세요!</h5>
          <textarea name="" id="" class="TxtAreaInput" placeholder="참여 메세지 입력 (선택)"></textarea>
          <button class="ButtonFull">크루 참여 요청하기</button>
          </div>
      </div>
    </div>
  `;
  return participateForm;
}

const removeModal = () => {
  console.log("remove")
  const body = document.querySelector("body");
  body.classList.remove("Modal");
  document.querySelector(".ModalWrapper2").classList.remove("Modal");
  setTimeout(() => {
    document.querySelector(".ModalWrapper2").style.display = "none";
  }, 500);
};

let isCreated = false;
const createModal = (id) => {
  const body = document.querySelector("body");
  if (!isCreated) {
    const ModalWrapper = document.createElement("div");
    ModalWrapper.classList.add("ModalWrapper2");
    ModalWrapper.classList.add("participateModal");
    ModalWrapper.innerHTML = setParticiateForm(id);
    body.append(ModalWrapper);
    body.classList.add("Modal");
    document.querySelector(".ModalWrapper2").style.display = "flex";
    setTimeout(() => {
      document.querySelector(".ModalWrapper2").classList.add("Modal");
    }, 10);
    isCreated = true;
    document.querySelector(".ModalWrapper2 .ModalBg").addEventListener("click", removeModal);
    document.querySelector(".ModalWrapper2 .ModalClose").addEventListener("click", removeModal);
    return;
  }
  document.querySelector(".ModalWrapper2").style.display = "flex";
  document.querySelector(".ModalWrapper2").innerHTML = setParticiateForm(id);
  document.querySelector(".ModalWrapper2 .ModalBg").addEventListener("click", removeModal);
  document.querySelector(".ModalWrapper2 .ModalClose").addEventListener("click", removeModal);
  body.classList.add("Modal");
  setTimeout(() => {
    document.querySelector(".ModalWrapper2").classList.add("Modal");
  }, 10);
}

export const participate = (id) => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인 후 참여할 수 있습니다.");
    return;
  }
  createModal(id);
}