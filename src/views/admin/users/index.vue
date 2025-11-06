<script setup>
// import sidebar component
import SidebarMenu from "../../../components/layout/SidebarMenu.vue";

// import ref and onMounted
import { ref, onMounted } from "vue";

// import js cookie
import Cookies from "js-cookie";

// import api
import api from "../../../services/api";

// get token from cookies
const token = Cookies.get("token");

// define state
const users = ref({});

// method fetchDataUser
const fetchDataUser = async () => {
  // fetch data
  api.defaults.headers.common["Authorization"] = token;
  await api.get("/admin/users").then((response) => {
    // set response data to state "users"
    users.value = response.data.data;
  });
};

// run hook "onMounted"
onMounted(() => {
  // call method "fetchDataUsers"
  fetchDataUser();
});

// method deleteUser
const deleteUser = async (id) => {
  // delete user with API
  api.defaults.headers.common["Authorization"] = token;
  await api.delete(`/admin/users/${id}`).then(() => {
    fetchDataUser();
  });
};
</script>
<template>
  <!--begin::Toolbar-->
  <div class="toolbar mb-5 mb-lg-7" id="kt_toolbar">
    <!--begin::Page title-->
    <div class="page-title d-flex flex-column me-3">
      <!--begin::Title-->
      <h1 class="d-flex text-gray-900 fw-bold my-1 fs-3">Users List</h1>
      <!--end::Title-->

      <!--begin::Breadcrumb-->
      <ul class="breadcrumb breadcrumb-dot fw-semibold text-gray-600 fs-7 my-1">
        <!--begin::Item-->
        <li class="breadcrumb-item text-gray-600">
          <router-link
            :to="{ name: 'dashboard' }"
            class="text-gray-600 text-hover-primary"
          >
            Home
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="breadcrumb-item text-gray-500">Users</li>
        <!--end::Item-->
      </ul>
      <!--end::Breadcrumb-->
    </div>
    <!--end::Page title-->
  </div>
  <!--end::Toolbar-->

  <!--begin::Post-->
  <div class="content flex-column-fluid" id="kt_content">
    <!--begin::Products-->
    <div class="card card-flush">
      <!--begin::Card header-->
      <div class="card-header align-items-center py-5 gap-2 gap-md-5">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <i class="ki-duotone ki-magnifier fs-3 position-absolute ms-4"
              ><span class="path1"></span><span class="path2"></span
            ></i>
            <input
              type="text"
              data-kt-user-filter="search"
              class="form-control form-control-solid w-250px ps-12"
              placeholder="Search User"
            />
          </div>
          <!--end::Search-->
        </div>
        <!--end::Card title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
          <div class="w-100 mw-150px">
            <!--begin::Select2-->
            <select
              class="form-select form-select-solid"
              data-control="select2"
              data-hide-search="true"
              data-placeholder="Status"
              data-kt-user-filter="status"
            >
              <option></option>
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="inactive">Inactive</option>
            </select>
            <!--end::Select2-->
          </div>

          <!--begin::Add product-->
          <router-link
            :to="{ name: 'admin.users.create' }"
            class="btn btn</router-link>-primary"
          >
            Add User
          </router-link>
          <!--end::Add product-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body pt-0">
        <!--begin::Table-->
        <table
          class="table align-middle table-row-dashed fs-6 gy-5"
          id="kt_ecommerce_products_table"
        >
          <thead>
            <tr
              class="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0"
            >
              <th class="w-10px pe-2">
                <div
                  class="form-check form-check-sm form-check-custom form-check-solid me-3"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    data-kt-check="true"
                    data-kt-check-target="#kt_ecommerce_products_table .form-check-input"
                    value="1"
                  />
                </div>
              </th>
              <th class="min-w-200px">User</th>
              <th class="min-w-100px">Role</th>
              <th class="min-w-70px">Last Login</th>
              <th class="min-w-100px">Two-Step</th>
              <th class="min-w-100px">Joined Date</th>
              <th class="min-w-100px">Status</th>
              <th class="text-end min-w-70px">Actions</th>
            </tr>
          </thead>
          <tbody class="fw-semibold text-gray-600">
            <tr v-if="users.length == 0">
              <td colspan="8" class="dt-empty">No matching records found</td>
            </tr>
            <tr v-else v-for="(user, index) in users" :key="index">
              <td>
                <div
                  class="form-check form-check-sm form-check-custom form-check-solid"
                >
                  <input class="form-check-input" type="checkbox" value="1" />
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <!--begin::Thumbnail-->
                  <a href="edit-product.html" class="symbol symbol-50px">
                    <span
                      class="symbol-label"
                      style="
                        background-image: url(../../../assets/media/stock/ecommerce/1.png);
                      "
                    ></span>
                  </a>
                  <!--end::Thumbnail-->

                  <div class="ms-5">
                    <!--begin::Title-->
                    <router-link
                      :to="{
                        name: 'admin.users.edit',
                        params: { id: user.id },
                      }"
                      class="text-gray-800 text-hover-primary fs-5 fw-bold"
                      data-kt-user-filter="product_name"
                      >{{ user.name }}</router-link
                    >
                    <!--end::Title-->
                  </div>
                </div>
              </td>
              <td class="pe-0">
                <span class="fw-bold">Admin</span>
              </td>
              <td class="pe-0" data-order="-">
                <span class="fw-bold ms-3">-</span>
              </td>
              <td class="pe-0">-</td>
              <td class="pe-0" data-order="">14 Agustus 1995</td>
              <td class="pe-0" data-order="Published">
                <!--begin::Badges-->
                <div class="badge badge-light-success">Published</div>
                <!--end::Badges-->
              </td>
              <td class="text-end">
                <a
                  href="#"
                  class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  Actions
                  <i class="ki-duotone ki-down fs-5 ms-1"></i>
                </a>
                <!--begin::Menu-->
                <div
                  class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                  data-kt-menu="true"
                >
                  <!--begin::Menu item-->
                  <div class="menu-item px-3">
                    <router-link
                      :to="{
                        name: 'admin.users.edit',
                        params: { id: user.id },
                      }"
                      class="menu-link px-3"
                    >
                      Edit
                    </router-link>
                  </div>
                  <!--end::Menu item-->

                  <!--begin::Menu item-->
                  <div class="menu-item px-3">
                    <a
                      @click="deleteUser(user.id)"
                      class="menu-link px-3"
                      data-kt-user-filter="delete_row"
                    >
                      Delete
                    </a>
                  </div>
                  <!--end::Menu item-->
                </div>
                <!--end::Menu-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--end::Table-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Products-->
  </div>
  <!--end::Post-->
</template>