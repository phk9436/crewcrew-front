import { ProgressTransition } from "../inputFunc.js";
import { signInfo } from "./sign.js";

let studyArr = [];
let hobbyArr = [];

export const signStep3 = () => {
  const chooseTitle = document.querySelectorAll('.ChooseTitle');
  const UnderList = document.querySelectorAll('.ChooseListUnder');
  chooseTitle.forEach((el, idx) => {
    //스터디,취미 클릭시 드롭다운
    el.addEventListener('click', () => {
      el.classList.add('Clicked');
      const ChooseListDetail = document.querySelectorAll('.ChooseListDetail');
      ChooseListDetail.forEach((e) => { //전체 드롭다운 on클래스해제
        e.classList.remove('On');
        e.style.height = '50px';
        e.querySelector("input").disabled = false;//선택된 것 외엔 disabled 풀기
      });
      UnderList.forEach((e) => {
        e.style.display = "flex"; //전체 ChooseListUnder hide처리
      });

      const children = ChooseListDetail[idx].children;
      ChooseListDetail[idx].classList.add('On'); //클릭한 드롭다운 on클래스
      el.disabled = true; //드롭다운이 열린 상태에서 다시 선택되지 않게
      UnderList[idx].style.display = "none";

      let ChooseListLength = children.length - 1;
      let ChooseListHeight =
        parseInt(window.getComputedStyle(children[1]).height) +
        parseInt(window.getComputedStyle(children[1]).paddingTop) * 2;
      ChooseListDetail[idx].style.height = 8 + 50 + ChooseListHeight * ChooseListLength + 'px';
    });
  });

  const chooseCompete = document.querySelectorAll('.ChooseComplete');
  chooseCompete.forEach((e) => {
    //완료 버튼 클릭 시
    e.addEventListener('click', () => {
      const ChooseListDetail = e.closest('.ChooseListDetail');
      const ChooseList = e.closest('.ChooseList');
      ChooseListDetail.classList.remove('On');
      ChooseListDetail.style.height = '50px';
      ChooseList.lastElementChild.style.display = 'flex';
      ChooseListDetail.querySelector("input").disabled = false; //닫을 때 disabled 풀기
    });
  });

  const inputChoose = document.querySelectorAll(".InputChoose");
  let studyLen = 0;
  let hobbyLen = 0;
  let studyObj = {};
  let hobbyObj = {};
  inputChoose.forEach((el) => {
    el.addEventListener("change", ({ target }) => {
      const ChooseList = el.closest(".ChooseList");
      if (ChooseList.classList.contains("study")) {
        target.checked ? studyLen++ : studyLen--;
        ChooseList.querySelector(".ChooseComplete").disabled = studyLen === 0 ? true : false;
        studyLen === 0
          ? ChooseList.classList.remove("Checked")
          : ChooseList.classList.add("Checked");
        ProgressTransition();
        return;
      }
      target.checked ? hobbyLen++ : hobbyLen--;
      ChooseList.querySelector(".ChooseComplete").disabled = hobbyLen === 0 ? true : false;
      hobbyLen === 0
        ? ChooseList.classList.remove("Checked")
        : ChooseList.classList.add("Checked");
      ProgressTransition();
    });
  });

  inputChoose.forEach((el) => {
    el.addEventListener('change', ({ target }) => {
      const ChooseList = el.closest(".ChooseList");
      const isStudy = ChooseList.classList.contains("study")

      if (target.checked) {
        //동적 생성
        let choosedOption = document.createElement('li');
        choosedOption.innerHTML = /*html*/ `
          <label for="${target.getAttribute('id')}" class="LabelChoose">
            <p class="ChooseUnder">
              <em>
                ${target.value}
              </em>
              <span class="ChooseCancel"></span>
            </p>
          </label>
        `;
        ChooseList.lastElementChild.appendChild(choosedOption);

        if (isStudy) {
          studyObj[target.value] = choosedOption;
          studyArr.push(target.value);
        } else {
          hobbyObj[target.value] = choosedOption;
          hobbyArr.push(target.value);
        }
        return;
      }
      //동적 제거
      if (isStudy) {
        ChooseList.lastElementChild.removeChild(studyObj[target.value]);
        delete studyObj[target.value];
        studyArr = studyArr.filter((e) => e != target.value);
      } else {
        ChooseList.lastElementChild.removeChild(hobbyObj[target.value]);
        delete hobbyObj[target.value];
        hobbyArr = hobbyArr.filter((e) => e != target.value);
      }
    });
  });


  const chooseLast = document.querySelector('.ChooseLast input');
  chooseLast.addEventListener('focus', () => {//한줄메세지 입력시
    const ChooseListDetail = document.querySelectorAll('.ChooseListDetail');
    ChooseListDetail.forEach((e) => { //전체 드롭다운 올라가도록
      e.classList.remove('On');
      e.style.height = '50px';
      e.querySelector("input").disabled = false;
    });
    UnderList.forEach((e) => e.style.display = "flex");
  });
};

export const saveSigndata3 = () => {
  const study = studyArr;
  const hobby = hobbyArr;
  console.log(document.querySelector(".InputMessage"))
  const message = document.querySelector(".InputMessage").value;
  signInfo.study = study;
  signInfo.hobby = hobby;
  signInfo.message = message;
  console.log(signInfo)
};