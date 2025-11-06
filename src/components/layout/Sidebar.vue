<script setup>
// Impor menu yang baru saja kita buat
import SidebarMenu from "./SidebarMenu.vue";
</script>
<template>
  <!--begin::Aside-->
  <div
    id="kt_aside"
    class="aside card"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_toggle"
  >
    <!--begin::Aside menu-->
    <div class="aside-menu flex-column-fluid px-4">
      <!--begin::Aside Menu-->

      <div
        class="hover-scroll-overlay-y mh-100 my-5"
        id="kt_aside_menu_wrapper"
        data-kt-scroll="true"
        data-kt-scroll-activate="true"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="{default: '#kt_aside_footer', lg: '#kt_header, #kt_aside_footer'}"
        data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu"
        data-kt-scroll-offset="{default: '5px', lg: '75px'}"
      >
        <!--begin::Menu-->
        <SidebarMenu />
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Aside menu-->

    <!--begin::Footer-->
    <div
      class="aside-footer flex-column-auto pt-5 pb-7 px-7"
      id="kt_aside_footer"
    >
      <a
        href="https://preview.keenthemes.com/html/metronic/docs"
        class="btn btn-bg-light btn-color-gray-500 btn-active-color-gray-900 text-nowrap w-100"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-dismiss-="click"
        title="200+ in-house components and 3rd-party plugins"
      >
        <span class="btn-label"> Docs & Components </span>
        <i class="ki-duotone ki-document btn-icon fs-2"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </a>
    </div>
    <!--end::Footer-->
  </div>
  <!--end::Aside-->
</template>