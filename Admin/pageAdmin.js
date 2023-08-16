let indexUpdate;
let listToPaginate = "";
const upload = Upload({
  // Get production API keys from Upload.io
  apiKey: "free",
});
let listProduct = [];
let listManufacturer =
  JSON.parse(localStorage.getItem("listManufacturer")) ?? [];
let listCategory = JSON.parse(localStorage.getItem("listCategory")) ?? [];
$(function () {
  $("#head_menu").load("./menuAdmin.html");
  $("#side_bar").load("./sideBar.html");
  $("#filter_manufacturer").load("./filterManufacturerAdmin.html");
  $("#filter_category").load("./filterCategoryAdmin.html");
  $.ajax({
    url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
    type: "GET",
    success: function (res, status) {
      listProduct = res ?? [];
    },
  });
  setTimeout(() => {
    handleShowProduct();
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
    <button type="button" onclick="filterByManufacturer(${manufacturer.id})">
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
  listToPaginate = "Product";
  fetchPagination(listProduct, 5);
  setTimeout(() => {
    fetchListProduct(listProduct);
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
function fetchListProduct(listProductToFetch) {
  $("#tbProductAdmin").empty();
  paginate(listProductToFetch, 1, 5).forEach((product) => {
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
function fetchPagination(array, numberOnPage) {
  $("#pagination").empty();
  let pagination = ``;
  let numberOfPage;
  if (array.length <= numberOnPage) {
    numberOfPage = 1;
  } else {
    if (array.length % numberOnPage !== 0) {
      numberOfPage = parseInt(array.length / numberOnPage) + 1;
    } else {
      numberOfPage = array.length / numberOnPage;
    }
  }
  for (let i = 1; i <= numberOfPage; i++) {
    pagination += `
    <button
        type="button"
        onclick='fetchList${listToPaginate}(paginate(${JSON.stringify(
      array
    )}, ${i}, ${numberOnPage}))'
        class="btn btn-outline-dark"
      >
        ${i}
      </button>
    `;
  }
  $("#pagination").append(pagination);
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
  //not edited yet
  const data = {
    name: $("#NameUpdate").val(),
    price: $("#PriceUpdate").val(),
    info: $("#InfoUpdate").val(),
    detail: $("#DetailUpdate").val(),
    ratingStar: $("#StarUpdate").val(),
    imageName: $("#ImageUpdate").val(),
    manufacturerId: $("#ManufacturerUpdate").val(),
    categoryId: $("#CategoryUpdate").val(),
  };
  $("#ModalUpdateProduct").modal("hide");
  $.ajax({
    url: `https://64dba28a593f57e435b13ebd.mockapi.io/products/${listProduct[indexUpdate].id}`,
    type: "PUT",
    data: data,
  });
  setTimeout(() => {
    $.ajax({
      url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
      type: "GET",
      success: function (res, status) {
        listProduct = res ?? [];
        let currentPage = parseInt(indexUpdate / 5) + 1;
        fetchListProduct(paginate(listProduct, currentPage, 5));
        listToPaginate = "Product";
        fetchPagination(listProduct, 5);
      },
    });
  }, 500);
}
function handleResetUpdate() {
  showInfoOfProduct(listProduct[indexUpdate]);
}
function handleDeleteProduct(id) {
  let index = listProduct.findIndex((product) => +product.id === +id);
  let currentPage = parseInt(index / 5) + 1;
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this product!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        url: `https://64dba28a593f57e435b13ebd.mockapi.io/products/${id}`,
        type: "DELETE",
      });
      setTimeout(() => {
        $.ajax({
          url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
          type: "GET",
          success: function (res, status) {
            listProduct = res ?? [];
            fetchListProduct(paginate(listProduct, currentPage, 5));
            listToPaginate = "Product";
            fetchPagination(listProduct, 5);
          },
        });
      }, 500);
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
  };
  $.ajax({
    url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
    type: "POST",
    data: data,
  });
  setTimeout(() => {
    $.ajax({
      url: "https://64dba28a593f57e435b13ebd.mockapi.io/products",
      type: "GET",
      success: function (res, status) {
        listProduct = res ?? [];
        $("#ModalCreateProduct").modal("hide");
        fetchListProduct(listProduct);
        listToPaginate = "Product";
        fetchPagination(listProduct, 5);
      },
    });
  }, 1000);
}
function handleLogout() {
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      localStorage.setItem("isLoggedIn", false);
      swal("You are Logged out!", {
        icon: "success",
      });
      setTimeout(() => {
        location.href = "../Home/index.html";
      }, 1000);
    }
  });
}
function handleShowManufacturer() {
  $("#main_content").empty();
  $("#main_content").load("./manufacturerAdmin.html");
  listToPaginate = "Manufacturer";
  fetchPagination(listManufacturer, 6);
  setTimeout(() => {
    fetchListManufacturer(listManufacturer);
  }, 500);
}
function fetchListManufacturer(listManufacturerToFetch) {
  $("#tbManufacturerAdmin").empty();
  paginate(listManufacturerToFetch, 1, 6).forEach((manufacturer) => {
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
  fetchListManufacturer(listManufacturer);
  $("#ModalCreateManufacturer").modal("hide");
  fetchSelectManufacturerFilter();
  listToPaginate = "Manufacturer";
  fetchPagination(listManufacturer, 6);
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
  let currentPage = parseInt(indexUpdate / 6) + 1;
  fetchListManufacturer(paginate(listManufacturer, currentPage, 6));
  fetchSelectManufacturerFilter();
  listToPaginate = "Manufacturer";
  fetchPagination(listManufacturer, 6);
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
      let currentPage = parseInt(indexUpdate / 6) + 1;
      fetchListManufacturer(paginate(listManufacturer, currentPage, 6));
      fetchSelectManufacturerFilter();
      listToPaginate = "Manufacturer";
      fetchPagination(listManufacturer, 6);
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
  listToPaginate = "Category";
  fetchPagination(listCategory, 6);
  setTimeout(() => {
    fetchListCategory(listCategory);
  }, 500);
}
function fetchListCategory(listCategoryToFetch) {
  $("#tbCategoryAdmin").empty();
  paginate(listCategoryToFetch, 1, 6).forEach((category) => {
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
  fetchListCategory(listCategory);
  listToPaginate = "Category";
  fetchPagination(listCategory, 6);
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
  let currentPage = parseInt(indexUpdate / 6) + 1;
  fetchListCategory(paginate(listCategory, currentPage, 6));
  listToPaginate = "Category";
  fetchPagination(listCategory, 6);
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
      let currentPage = parseInt(indexUpdate / 6) + 1;
      fetchListCategory(paginate(listCategory, currentPage, 6));
      listToPaginate = "Category";
      fetchPagination(listCategory, 6);
      fetchSelectCategoryFilter();
      swal("Poof! Category has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Category is safe!");
    }
  });
}
function filterByCategory() {
  const filterCategory = $("#CategoryFilter").val();
  const listProductFilterCategory = listProduct.filter(
    (product) => +product.categoryId === +filterCategory
  );
  listToPaginate = "Product";
  fetchPagination(listProductFilterCategory, 5);
  fetchListProduct(listProductFilterCategory);
}
function filterByManufacturer(manufacturerId) {
  const listProductFilterManufacturer = listProduct.filter(
    (product) => +product.manufacturerId === +manufacturerId
  );
  listToPaginate = "Product";
  fetchPagination(listProductFilterManufacturer, 5);
  fetchListProduct(listProductFilterManufacturer);
}
const paginate = function (array, index, size) {
  // transform values
  index = Math.abs(parseInt(index));
  index = index > 0 ? index - 1 : index;
  size = parseInt(size);
  size = size < 1 ? 1 : size;
  if (Array.isArray(array) != true) {
    array = JSON.parse(array);
  }
  // filter
  return [
    ...array.filter((value, n) => {
      return n >= index * size && n < (index + 1) * size;
    }),
  ];
};
