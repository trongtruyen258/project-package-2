let listProduct = JSON.parse(localStorage.getItem("listProduct")) ?? [];
let listManufacturer =
  JSON.parse(localStorage.getItem("listManufacturer")) ?? [];
$(function () {
  $("#menu_home").load("./menuHome.html");
  $("#banner_home").load("./bannerHome.html");
  $("#list_product_home").load("./listProductHome.html");
  setTimeout(() => {
    fetchListProduct();
  }, 500);
});

function fetchListProduct() {
  $("#divListProduct").empty();
  let divListProduct = ``;
  listProduct.forEach((product) => {
    divListProduct += `
    <div class="col-xl-3">
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
