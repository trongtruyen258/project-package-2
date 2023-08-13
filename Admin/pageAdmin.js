let indexUpdate;

const upload = Upload({
  // Get production API keys from Upload.io
  apiKey: "free",
});
let listProduct = JSON.parse(localStorage.getItem("listProduct")) ?? [];
let listManufacturer =
  JSON.parse(localStorage.getItem("listManufacturer")) ?? [];
let listCategory = JSON.parse(localStorage.getItem("listCategory")) ?? [];
$(function () {
  $("#head_menu").load("./menuAdmin.html");
  $("#side_bar").load("./sideBar.html");
  $("#filter_manufacturer").load("./filterManufacturerAdmin.html");
  $("#filter_category").load("./filterCategoryAdmin.html");

  handleShowProduct();
  setTimeout(() => {
    fetchSelectCategoryFilter();
    fetchSelectManufacturerFilter();
  }, 500);
});
function fetchSelectManufacturerFilter() {
  $("#manufacturerFilter").empty();
  let manufacturerFilter = ``;
  listManufacturer.forEach((manufacturer) => {
    manufacturerFilter += `
    <li class="nav_item">
    <button type="button" onclick="handleShowManufacturer${manufacturer.name}()">
      ${manufacturer.name}
    </button>
  </li>
    `;
  });
  $("#manufacturerFilter").append(manufacturerFilter);
}
function fetchSelectCategoryFilter() {
  $("#CategoryFilter").empty();
  let selectCategory = `<option value="0">Choose a Category</option>`;
  listCategory.forEach((category) => {
    selectCategory += `<option value="${category.id}">${category.name}</option>`;
  });
  $("#CategoryFilter").append(selectCategory);
}
function handleShowProduct() {
  $("#main_content").empty();
  $("#main_content").load("./productAdmin.html");
  setTimeout(() => {
    fetchListProduct();
    fetchSelectCategory();
    fetchSelectManufacturer();
    fetchSelectCategoryUpdate();
    fetchSelectManufacturerUpdate();
    $(() => {
      $("#ImageFile").change(async (event) => {
        $("#ImageFile").hide();

        try {
          const { fileUrl } = await upload.uploadFile(event.target.files[0], {
            onProgress: ({ progress }) =>
              $("#Image").val(`Image uploading... ${progress}%`),
          });

          $("#Image").val(fileUrl);
        } catch (e) {
          $("#Image").val(`Error:<br/><br/>${e.message}`);
        }
      });
    });
    $(() => {
      $("#ImageFileUpdate").change(async (event) => {
        $("#ImageFileUpdate").hide();

        try {
          const { fileUrl } = await upload.uploadFile(event.target.files[0], {
            onProgress: ({ progress }) =>
              $("#ImageUpdate").val(`Image uploading... ${progress}%`),
          });

          $("#ImageUpdate").val(fileUrl);
        } catch (e) {
          $("#ImageUpdate").val(`Error:<br/><br/>${e.message}`);
        }
      });
    });
  }, 1000);
}
function handleShowAccount() {
  $("#main_content").empty();
  $("#main_content").load("./accountAdmin.html");
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
        <td>${
          listManufacturer.find(
            (element) => element.id === +product.manufacturerId
          ).name
        }</td>
        <td>${
          listCategory.find((element) => element.id === +product.categoryId)
            .name
        }</td>
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
            <button onclick="handleDeleteProduct(${
              product.id
            })" type="button" class="btn btn-danger">Delete</button>
        </td>
        </tr>
    `);
  });
}
function handleCreateProduct() {
  $("#ModalCreateProduct").modal("show");
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#ImageFile").show();
  $("#ImageFile").val("");
  $("#Image").val("");
  $("#Manufacturer").val(0);
  $("#Category").val(0);
}
function fetchSelectCategory() {
  $("#Category").empty();
  let selectCategory = `<option value="0">Choose a Category</option>`;
  listCategory.forEach((category) => {
    selectCategory += `<option value="${category.id}">${category.name}</option>`;
  });
  $("#Category").append(selectCategory);
}
function fetchSelectManufacturer() {
  $("#Manufacturer").empty();
  let selectManufacturer = `<option value="0">Choose a Manufacturer</option>`;
  listManufacturer.forEach((manufacturer) => {
    selectManufacturer += `<option value="${manufacturer.id}">${manufacturer.name}</option>`;
  });
  $("#Manufacturer").append(selectManufacturer);
}
function handleEditProduct(id) {
  $("#ModalUpdateProduct").modal("show");
  indexUpdate = listProduct.findIndex((product) => +product.id === +id);
  showInfoOfProduct(listProduct[indexUpdate]);
}
function fetchSelectCategoryUpdate() {
  $("#CategoryUpdate").empty();
  let selectCategory = `<option value="0">Choose a Category</option>`;
  listCategory.forEach((category) => {
    selectCategory += `<option value="${category.id}">${category.name}</option>`;
  });
  $("#CategoryUpdate").append(selectCategory);
}
function fetchSelectManufacturerUpdate() {
  $("#ManufacturerUpdate").empty();
  let selectManufacturer = `<option value="0">Choose a Manufacturer</option>`;
  listManufacturer.forEach((manufacturer) => {
    selectManufacturer += `<option value="${manufacturer.id}">${manufacturer.name}</option>`;
  });
  $("#ManufacturerUpdate").append(selectManufacturer);
}
function showInfoOfProduct(product) {
  $("#IdUpdate").val(product.id);
  $("#NameUpdate").val(product.name);
  $("#PriceUpdate").val(product.price);
  $("#InfoUpdate").val(product.info);
  $("#DetailUpdate").val(product.detail);
  $("#StarUpdate").val(product.ratingStar);
  $("#ImageFileUpdate").show();
  $("#ImageUpdate").val(product.imageName);
  $("#ManufacturerUpdate").val(product.manufacturerId);
  $("#CategoryUpdate").val(product.categoryId);
}
function handleUpdateProduct() {
  listProduct[indexUpdate].name = $("#NameUpdate").val();
  listProduct[indexUpdate].price = $("#PriceUpdate").val();
  listProduct[indexUpdate].info = $("#InfoUpdate").val();
  listProduct[indexUpdate].detail = $("#DetailUpdate").val();
  listProduct[indexUpdate].ratingStar = $("#StarUpdate").val();
  listProduct[indexUpdate].imageName = $("#ImageUpdate").val();
  listProduct[indexUpdate].manufacturerId = $("#ManufacturerUpdate").val();
  listProduct[indexUpdate].categoryId = $("#CategoryUpdate").val();
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  $("#ModalUpdateProduct").modal("hide");
  fetchListProduct();
}
function handleResetUpdate() {
  showInfoOfProduct(listProduct[indexUpdate]);
}
function handleDeleteProduct(id) {
  const index = listProduct.findIndex((product) => +product.id === +id);
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this product!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      listProduct.splice(index, 1);
      localStorage.setItem("listProduct", JSON.stringify(listProduct));
      fetchListProduct();
      swal("Poof! Product has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Product is safe!");
    }
  });
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
    id: Math.floor(Math.random() * 100) + 1,
  };
  listProduct.push(data);
  $("#ModalCreateProduct").modal("hide");
  fetchListProduct();
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
}
function handleLogin() {
  $("#loginModal").modal("show");
}
function handleShowManufacturer() {
  $("#main_content").empty();
  $("#main_content").load("./manufacturerAdmin.html");
  setTimeout(() => {
    fetchListManufacturer();
  }, 500);
}
function fetchListManufacturer() {
  $("#tbManufacturerAdmin").empty();
  listManufacturer.forEach((manufacturer) => {
    $("#tbManufacturerAdmin").append(`
    <tr style="vertical-align: middle">
        <td>${manufacturer.id}</td>
        <td>${manufacturer.name}</td>
        <td>
        <button
            onclick="handleEditManufacturer(${manufacturer.id})"
            type="button"
            class="btn btn-warning"
            >
              Edit
        </button>
        </td>
        <td>
            <button onclick="handleDeleteManufacturer(${manufacturer.id})" type="button" class="btn btn-danger">Delete</button>
        </td>
        </tr>
    `);
  });
}
function handleCreateManufacturer() {
  $("#ModalCreateManufacturer").modal("show");
  $("#manufacturerName").val("");
}
function CreateNewManufacturer() {
  const newManufacturer = {
    id: Math.floor(Math.random() * 100) + 1,
    name: $("#manufacturerName").val(),
  };
  listManufacturer.push(newManufacturer);
  localStorage.setItem("listManufacturer", JSON.stringify(listManufacturer));
  fetchListManufacturer();
  $("#ModalCreateManufacturer").modal("hide");
  fetchSelectManufacturerFilter();
}
function handleEditManufacturer(id) {
  $("#ModalUpdateManufacturer").modal("show");
  indexUpdate = listManufacturer.findIndex(
    (manufacturer) => manufacturer.id === +id
  );
  $("#IdManufacturerUpdate").val(listManufacturer[indexUpdate].id);
  $("#ManufacturerNameUpdate").val(listManufacturer[indexUpdate].name);
}
function handleUpdateManufacturer() {
  listManufacturer[indexUpdate].name = $("#manufacturerNameUpdate").val();
  localStorage.setItem("listManufacturer", JSON.stringify(listManufacturer));
  fetchListManufacturer();
  fetchSelectManufacturerFilter();
  $("#ModalUpdateManufacturer").modal("hide");
}
function handleResetUpdateManufacturer() {
  $("#IdManufacturerUpdate").val(listManufacturer[indexUpdate].id);
  $("#manufacturerNameUpdate").val("");
}

function handleDeleteManufacturer(id) {
  const index = listManufacturer.findIndex(
    (manufacturer) => manufacturer.id === +id
  );
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Manufacturer!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      listManufacturer.splice(index, 1);
      localStorage.setItem(
        "listManufacturer",
        JSON.stringify(listManufacturer)
      );
      fetchListManufacturer();
      fetchSelectManufacturerFilter();
      swal("Poof! Manufacturer has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Manufacturer is safe!");
    }
  });
}
function handleShowCategory() {
  $("#main_content").empty();
  $("#main_content").load("./categoryAdmin.html");
  setTimeout(() => {
    fetchListCategory();
  }, 500);
}
function fetchListCategory() {
  $("#tbCategoryAdmin").empty();
  listCategory.forEach((category) => {
    $("#tbCategoryAdmin").append(`
    <tr style="vertical-align: middle">
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>
        <button
            onclick="handleEditCategory(${category.id})"
            type="button"
            class="btn btn-warning"
            >
              Edit
        </button>
        </td>
        <td>
            <button onclick="handleDeleteCategory(${category.id})" type="button" class="btn btn-danger">Delete</button>
        </td>
        </tr>
    `);
  });
}
function handleCreateCategory() {
  $("#ModalCreateCategory").modal("show");
  $("#categoryName").val("");
}
function CreateNewCategory() {
  const newCategory = {
    id: Math.floor(Math.random() * 100) + 1,
    name: $("#categoryName").val(),
  };
  listCategory.push(newCategory);
  localStorage.setItem("listCategory", JSON.stringify(listCategory));
  fetchListCategory();
  $("#ModalCreateCategory").modal("hide");
  fetchSelectCategoryFilter();
}
function handleEditCategory(id) {
  $("#ModalUpdateCategory").modal("show");
  indexUpdate = listCategory.findIndex((category) => category.id === +id);
  $("#IdCategoryUpdate").val(listCategory[indexUpdate].id);
  $("#categoryNameUpdate").val(listCategory[indexUpdate].name);
}
function handleUpdateCategory() {
  listCategory[indexUpdate].name = $("#categoryNameUpdate").val();
  localStorage.setItem("listCategory", JSON.stringify(listCategory));
  fetchListCategory();
  fetchSelectCategoryFilter();
  $("#ModalUpdateCategory").modal("hide");
}
function handleResetUpdateCategory() {
  $("#IdCategoryUpdate").val(listCategory[indexUpdate].id);
  $("#categoryNameUpdate").val("");
}
function handleDeleteCategory(id) {
  const index = listCategory.findIndex((category) => category.id === +id);
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this category!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      listCategory.splice(index, 1);
      localStorage.setItem("listCategory", JSON.stringify(listCategory));
      fetchListCategory();
      fetchSelectCategoryFilter();
      swal("Poof! Category has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Category is safe!");
    }
  });
}
