document.addEventListener("DOMContentLoaded", () => {
  renderMemberData();
});

const renderCategory = (data) => {
  let categoryList = "";
  data.forEach((e) => {
    const categoryName = (e === "기타취미" || e === "기타스터디") ? "기타" : e;
    categoryList += /* html */ `<span>${categoryName}</span>`;
  });
  return categoryList;
};

const renderMemberData = () => {
  const memberData = JSON.parse(localStorage.getItem("memberData"));
  const urlParams = new URLSearchParams(location.search);
  const uid = urlParams.get("uid");
  const member = memberData.find((e) => e.uid === Number(uid));
  const ProfileSect = document.querySelector(".ProfileSect .SectionWrap850");
  ProfileSect.innerHTML = /* html */ `
    <div class="ProfileTop">
      <div class="ProfileImg">
        <img src="/assets/images/Profile2.png" alt="">
      </div>
      <div class="ProfileName">
        <p>${member.nickname}</p>
        <button class="BtnChat">채팅</button>
      </div>
      <div class="ProfileMessage">
        <p>${member.descript}</p>
      </div>
    </div>
    <div class="ProfileTag">
      <div class="Tags">
        <h3>관심분야(스터디)</h3>
        <div class="TagWrap Study">
          ${renderCategory(member.study)}
        </div>
      </div>
      <div class="Tags">
        <h3>관심분야(취미)</h3>
        <div class="TagWrap Hobby">
          ${renderCategory(member.hobby)}
        </div>
      </div>
    </div>
  `;
};