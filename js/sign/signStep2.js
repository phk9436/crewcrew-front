import { ProgressTransition } from "../inputFunc.js";

export const signStep2 = () => {
  const inputDouble = document.querySelector('.InputDouble');
  inputDouble.addEventListener('click', ({ target }) => {
    //중복확인 클릭 이벤트
    const { children } = target.parentNode;
    target.classList.remove('On');
    children[4].classList.add('On');
    children[5].innerText = '사용 가능한 닉네임입니다.';
    children[5].classList.add('On');
    children[0].classList.add('On');
    children[0].disabled = true;
    target.parentNode.classList.add('Checked');

    ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  });

  const profileSelect = document.querySelectorAll('.OuterCircle');
  const profileImg = document.querySelector('.ProfileImg');
  const profileShow = document.querySelector('.ProfileShow');
  profileSelect.forEach((e) => {
    //프로필이미지 선택 시
    e.addEventListener('click', ({ target }) => {
      let profileSrc = e.querySelector("img").src;
      profileImg.firstElementChild.setAttribute('src', profileSrc);
      profileImg.classList.remove('Grayed');
      target.closest('.ProfileBox').classList.add('On');
      profileShow.style.backgroundColor = window.getComputedStyle(
        e.querySelector(".InnerCircle")
      ).backgroundColor;
      document.querySelector('.TxtNick').classList.remove('On');
      document.querySelector('.SelectWrapper').firstElementChild.classList.remove('On');
      document.querySelector('.ProfileTitle').style.opacity = '1';
      document.querySelector('.ProfileChange').classList.remove('On');

      profileSelect.forEach((e) => e.classList.remove(("On")));
      e.classList.add('On');
    });

    const profileRadio = document.querySelectorAll('.ProfileSelectRadio');
    profileRadio.forEach((e) => {
      //프로필이미지 or 사진 업로드 시 ProgressTransition증가
      e.addEventListener('click', ({ target }) => {
        target.closest('.ProfileSection').classList.add('Checked');

        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
      });
    });
  });
}