export const participate = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if(!isLogin) {
    alert("로그인 후 참여할 수 있습니다.");
    return;
  }
}