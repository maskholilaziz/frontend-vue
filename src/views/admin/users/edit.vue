<script setup>
// import sidebar component
import { useRoute, useRouter } from "vue-router";
import SidebarMenu from "../../../components/layout/SidebarMenu.vue";
import api from "../../../services/api";
import Cookies from "js-cookie";
import { onMounted, reactive, ref } from "vue";

const router = useRouter();
const route = useRoute();
const token = Cookies.get("token");
const user = reactive({
  name: "",
  email: "",
  password: "",
});
const validation = ref([]);
onMounted(async () => {
  api.defaults.headers.common["Authorization"] = token;
  await api.get(`/admin/users/${route.params.id}`).then((response) => {
    user.name = response.data.data.name;
    user.email = response.data.data.email;
  });
});

const updateUser = async () => {
  api.defaults.headers.common["Authorization"] = token;
  await api
    .put(`/admin/users/${route.params.id}`, {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .then(() => {
      router.push({
        name: "admin.users.index",
      });
    })
    .catch((error) => {
      validation.value = error.response.data;
    });
};
</script>
<template>
  <!--begin::Container-->
  <div>
    <!--begin::Toolbar-->
    <div class="toolbar mb-5 mb-lg-7" id="kt_toolbar">
      <!--begin::Page title-->
      <div class="page-title d-flex flex-column me-3">
        <!--begin::Title-->
        <h1 class="d-flex text-gray-900 fw-bold my-1 fs-3">Update User</h1>
        <!--end::Title-->

        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-dot fw-semibold text-gray-600 fs-7 my-1"
        >
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
          <li class="breadcrumb-item text-gray-600">User</li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item text-gray-500">Update User</li>
          <!--end::Item-->
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->
    </div>
    <!--end::Toolbar-->

    <!--begin::Post-->
    <div class="content flex-column-fluid" id="kt_content">
      <!--begin::Basic info-->
      <div class="card mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div
          class="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Profile Details</h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->

        <!--begin::Content-->
        <div
          id="kt_account_settings_profile_details"
          class="collapse show"
          @submit.prevent="updateUser"
        >
          <!--begin::Form-->
          <form id="kt_account_profile_details_form" class="form">
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label required fw-semibold fs-6"
                  >Full Name</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <input
                    type="text"
                    v-model="user.name"
                    name="name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Full Name"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semibold fs-6">
                  <span class="required">Contact Email</span>

                  <span
                    class="ms-1"
                    data-bs-toggle="tooltip"
                    title="Email must be active"
                  >
                    <i class="ki-duotone ki-information-5 text-gray-500 fs-6"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span></i
                  ></span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <input
                    type="text"
                    v-model="user.email"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Email"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semibold fs-6">
                  <span class="required">Password</span>

                  <span
                    class="ms-1"
                    data-bs-toggle="tooltip"
                    title="Password must be at least 6 characters long"
                  >
                    <i class="ki-duotone ki-information-5 text-gray-500 fs-6"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span></i
                  ></span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <input
                    type="password"
                    v-model="user.password"
                    name="password"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Password"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Card body-->

            <!--begin::Actions-->
            <div class="card-footer d-flex justify-content-end py-6 px-9">
              <router-link
                :to="{ name: 'admin.users.index' }"
                type="reset"
                class="btn btn-light btn-active-light-primary me-2"
                >Discard</router-link
              >
              <button
                type="submit"
                class="btn btn-primary"
                id="kt_account_profile_details_submit"
              >
                Save Changes
              </button>
            </div>
            <!--end::Actions-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Basic info-->
    </div>
    <!--end::Post-->
  </div>
  <!--end::Container-->
</template>