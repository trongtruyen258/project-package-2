$(function () {
  $("#menu_home").load("./menuHome.html");
  $("#banner_home").load("./bannerHome.html");
  $("#list_product_home").load("./listProductHome.html");
});
function handleLogin() {
  $("#loginModal").modal("show");
}
function handleSignUp() {
  $("#signUpModal").modal("show");
}
