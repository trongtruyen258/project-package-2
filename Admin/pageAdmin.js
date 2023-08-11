var listProduct = [
  {
    name: "Iphone 14",
    price: "30.990.000₫",
    info: "6.9 inches",
    detail: "ProductDetail1",
    ratingStar: "5",
    imageName:
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    manufacturerId: "2",
    categoryId: "1",
    id: "1",
  },
  {
    name: "Iphone 14",
    price: "30.990.000₫",
    info: "6.9 inches",
    detail: "ProductDetail1",
    ratingStar: "5",
    imageName:
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    manufacturerId: "2",
    categoryId: "1",
    id: "2",
  },
  {
    name: "Iphone 14",
    price: "30.990.000₫",
    info: "6.9 inches",
    detail: "ProductDetail1",
    ratingStar: "5",
    imageName:
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    manufacturerId: "2",
    categoryId: "1",
    id: "3",
  },
];
var listManufacturer = [
  {
    id: 1,
    name: "SAMSUNG",
  },
  {
    id: 2,
    name: "APPLE",
  },
  {
    id: 3,
    name: "XiAOMI",
  },
  {
    id: 4,
    name: "OPPO",
  },
];
var listCategory = [
  {
    id: 1,
    name: "Điện Thoại",
  },
  {
    id: 2,
    name: "Tablet",
  },
  {
    id: 3,
    name: "Laptop",
  },
];
let indexOfProduct;
$(function () {
  $("#head_menu").load("./menuAdmin.html");
  $("#side_bar").load("./sideBar.html");
});
function handleShowProduct() {
  $("#main_content").empty();
  $("#main_content").load("./productAdmin.html");
  setTimeout(() => {
    fetchListProduct();
  }, 50);
}

function fetchListProduct() {
  $("#tbProductAdmin").empty();
  listProduct.forEach((product) => {
    $("#tbProductAdmin").append(`
    <tr style="vertical-align: middle">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.info}</td>
        <td>${product.detail}</td>
        <td>${product.ratingStar}</td>
        <td>
        <img
        style="width: 50px; height: 50px"
        src="${product.imageName}"
        />
        </td>
        <td>${nameOfManufacturer(product.manufacturerId)}</td>
        <td>${nameOfCategory(product.categoryId)}</td>
        <td>
        <button
            onclick="handleEditProduct(${product.id})"
            type="button"
            class="btn btn-warning"
            >
              Edit
        </button>
        </td>
        <td>
            <button type="button" class="btn btn-danger">Delete</button>
        </td>
        </tr>
    `);
  });
}
function nameOfManufacturer(manufacturerId) {
  const manufacturer = listManufacturer.find(
    (element) => element.id == manufacturerId
  );
  return manufacturer.name;
}
function nameOfCategory(categoryId) {
  const category = listCategory.find((element) => element.id == categoryId);
  return category.name;
}
function handleCreateProduct() {
  $("#ModalCreateProduct").modal("show");
}
function handleEditProduct(id) {
  $("#ModalUpdateProduct").modal("show");
  indexOfProduct = id - 1;
  showInfoOfProduct(listProduct[indexOfProduct]);
}
function showInfoOfProduct(product) {
  $("#IdUpdate").val(product.id);
  $("#NameUpdate").val(product.name);
  $("#PriceUpdate").val(product.price);
  $("#InfoUpdate").val(product.info);
  $("#DetailUpdate").val(product.detail);
  $("#StarUpdate").val(product.ratingStar);
  $("#ImageUpdate").val(product.imageName);
  $("#ManufacturerUpdate").val(product.manufacturerId);
  $("#CategoryUpdate").val(product.categoryId);
}
function handleUpdateProduct() {
  listProduct[indexOfProduct].name = $("#NameUpdate").val();
  listProduct[indexOfProduct].price = $("#PriceUpdate").val();
  listProduct[indexOfProduct].info = $("#InfoUpdate").val();
  listProduct[indexOfProduct].detail = $("#DetailUpdate").val();
  listProduct[indexOfProduct].ratingStar = $("#StarUpdate").val();
  listProduct[indexOfProduct].imageName = $("#ImageUpdate").val();
  listProduct[indexOfProduct].manufacturerId = $("#ManufacturerUpdate").val();
  listProduct[indexOfProduct].categoryId = $("#CategoryUpdate").val();
  $("#ModalUpdateProduct").modal("hide");
  handleShowProduct();
}
function handleResetUpdate() {
  showInfoOfProduct(listProduct[indexOfProduct]);
}
function CreateNewProduct() {
  const data = {
    name: $("#Name").val(),
    price: $("#Price").val(),
    info: $("#Info").val(),
    detail: $("#Detail").val(),
    ratingStar: $("#Star").val(),
    imageName: $("#Image").val(),
    manufacturerId: $("#Manufacturer").val(),
    categoryId: $("#Category").val(),
    id: listProduct.length + 1,
  };
  listProduct.push(data);
  $("#ModalCreateProduct").modal("hide");
  handleShowProduct();
}
