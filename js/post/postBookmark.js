export const bookmarkFunc = (id, e) => {
  e.preventDefault();
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return;
  }
  const postData = JSON.parse(localStorage.getItem("postData"));
  const data = postData.find((e) => e.id === Number(id));
  if (!data.bookmarked) {
    e.target.classList.add("On");
    const updatedData = postData.map((e) => {
      if (e.id !== Number(id)) return e;
      return { ...e, bookmarked: true };
    });
    localStorage.setItem("postData", JSON.stringify(updatedData));
    return;
  }
  e.target.classList.remove("On");
  const updatedData = postData.map((e) => {
    if (e.id !== Number(id)) return e;
    return { ...e, bookmarked: false };
  });
  localStorage.setItem("postData", JSON.stringify(updatedData));
}