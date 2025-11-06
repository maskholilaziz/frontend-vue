<script setup>
// import useRouter from vue router
import { useRouter } from "vue-router";

// initialize router
const router = useRouter();

// import Cookies
import Cookies from "js-cookie";

// method logout
const logout = () => {
  // remove token and user on cookies
  Cookies.remove("token");
  Cookies.remove("user");

  // redirect ke halaman login
  router.push({
    name: "login",
  });
};
</script>

<template>
  <div
    class="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6"
    id="#kt_aside_menu"
    data-kt-menu="true"
  >
    <!--begin:Menu item-->
    <div class="menu-item pt-5">
      <!--begin:Menu content-->
      <div class="menu-content">
        <span class="menu-heading fw-bold text-uppercase fs-7">Help</span>
      </div>
      <!--end:Menu content-->
    </div>
    <!--end:Menu item-->
    <!--begin:Menu item-->
    <div class="menu-item">
      <!--begin:Menu link-->
      <router-link :to="{ name: 'dashboard' }" class="menu-link">
        <span class="menu-icon"
          ><i class="ki-duotone ki-rocket fs-2"
            ><span class="path1"></span><span class="path2"></span></i></span
        ><span class="menu-title">Dashboard</span>
      </router-link>
      <!--end:Menu link-->
    </div>
    <!--end:Menu item-->
    <!--begin:Menu item-->
    <div class="menu-item">
      <!--begin:Menu link-->
      <router-link :to="{ name: 'admin.users.index' }" class="menu-link">
        <span class="menu-icon"
          ><i class="ki-duotone ki-rocket fs-2"
            ><span class="path1"></span><span class="path2"></span></i></span
        ><span class="menu-title">Users</span>
      </router-link>
      <!--end:Menu link-->
    </div>
    <!--end:Menu item-->
  </div>
</template>