let listProduct = [];
let listManufacturer =
  JSON.parse(localStorage.getItem("listManufacturer")) ?? [];
$(function () {
  $("#menu_home").load("./menuHome.html");
  $("#banner_home").load("./bannerHome.html");
  $("#list_product_home").load("./listProductHome.html");
  setTimeout(() => {
    checkLogin();
    fetchListProduct();
  }, 500);
});
function checkLogin() {
  if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
    $("#bnt_logout").show();
  } else {
    $("#bnt_login").show();
  }
}
function fetchListProduct() {
  $.ajax({
    url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
    type: "GET",
    success: function (res, status) {
      listProduct = res ?? [];
      $("#divListProduct").empty();
      let divListProduct = ``;
      listProduct.forEach((product) => {
        divListProduct += `
    <div class="col-xl-3 tagProduct">
    <div class="product_img">
      <img
        src="${product.imageName}"
        alt=""
      />
    </div>
    <div class="product_info">
      <h4>${product.name}</h4>
      <p>Hãng sản xuất: ${
        listManufacturer.find(
          (element) => element.id === +product.manufacturerId
        ).name
      }</p>
      <div class="rating">
        ${fetchRatingStar(product.ratingStar)}
      </div>
      <div class="price">
        <p>${product.price}</p>
        <button>
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  </div>
    `;
      });
      $("#divListProduct").append(divListProduct);
    },
  });
}
function fetchRatingStar(ratingStar) {
  let numberOfStar = ``;
  for (let index = 0; index < ratingStar; index++) {
    numberOfStar += `<i class="fa-solid fa-star"></i>`;
  }
  return numberOfStar;
}
function handleLogin() {
  $("#loginModal").modal("show");
}
function handleSignUp() {
  $("#signUpModal").modal("show");
}
function registerAccount() {
  if ($("#confirmPasswordRegister").val() !== $("#passwordRegister").val()) {
    swal("Oops!", "Password don't match!", "error");
  } else {
    $.ajax({
      url: "https://64dba28a593f57e435b13ebd.mockapi.io/users",
      type: "POST",
      data: {
        fullName: $("#fullNameRegister").val(),
        address: $("#addressRegister").val(),
        phoneNumber: $("#phoneNumberRegister").val(),
        email: $("#mailRegister").val(),
        userName: $("#userNameRegister").val(),
        password: $("#passwordRegister").val(),
      },
      success: function (res, status) {
        swal("Successful!", { icon: "success" });
        $("#signUpModal").modal("hide");
      },
    });
  }
}
function loginAccount() {
  $.ajax({
    url: "https://64dba28a593f57e435b13ebd.mockapi.io/users",
    type: "GET",
    success: function (res, status) {
      res.forEach((ele) => {
        if (
          $("#userNameLogin").val() !== ele.userName ||
          $("#passwordLogin").val() !== ele.password
        ) {
          swal("Oops!", "User name or Password is not correct!", "error");
        } else {
          localStorage.setItem("isLoggedIn", true);
          location.href = "../Admin/index.html";
        }
      });
    },
  });
}
function goRegister() {
  $("#loginModal").modal("hide");
  $("#signUpModal").modal("show");
}
function goToAdmin() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (isLoggedIn) {
    location.href = "../Admin/index.html";
  } else {
    swal("Oops!", "You're not logged in!", "error");
  }
}
function handleLogout() {
  localStorage.setItem("isLoggedIn", false);
  $("#bnt_logout").hide();
  $("#bnt_login").show();
}
