export const bookmarkFunc = (id, e) => {
  e.preventDefault();
  const isLogin = sessionStorage.getItem("isLogin");
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return;
  }
  const postData = JSON.parse(localStorage.getItem("postData"));
  const data = postData.find((e) => e.id === Number(id));
  const stars = document.querySelectorAll(".Star");
  if (!data.bookmarked) {
    stars.forEach((e) => {
      e.closest("li").getAttribute("data-id") === id && e.classList.add("On");
    });
    const updatedData = postData.map((e) => {
      if (e.id !== Number(id)) return e;
      return { ...e, bookmarked: true };
    });
    localStorage.setItem("postData", JSON.stringify(updatedData));
    return;
  }
  stars.forEach((e) => {
    e.closest("li").getAttribute("data-id") === id && e.classList.remove("On");
  });
  const updatedData = postData.map((e) => {
    if (e.id !== Number(id)) return e;
    return { ...e, bookmarked: false };
  });
  localStorage.setItem("postData", JSON.stringify(updatedData));
}