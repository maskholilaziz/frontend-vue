<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
// Impor komponen layout baru kita
import AppHeader from "./components/layout/Header.vue";
import AppSidebar from "./components/layout/Sidebar.vue";
import AppFooter from "./components/layout/Footer.vue";

const router = useRouter();
const route = useRoute();

// init user
const user = ref({});

// Cek jika token ada
const token = Cookies.get("token");

// Logika untuk menginisialisasi ulang JS Metronic saat rute berubah
onMounted(() => {
  // Fungsi ini harus dipanggil setiap kali komponen utama dimuat
  // untuk menginisialisasi elemen-elemen Metronic (seperti menu, drawer, dll.)

  // Kita tambahkan sedikit delay untuk memastikan DOM sudah di-render
  setTimeout(() => {
    if (window.KTApp) {
      window.KTApp.init();
    }
    if (window.KTMenu) {
      window.KTMenu.init(); // Penting untuk sidebar
    }
    if (window.KTToggle) {
      window.KTToggle.init(); // Untuk tombol toggle
    }
    if (window.KTDrawer) {
      window.KTDrawer.init(); // Untuk drawer
    }
  }, 100);

  // get user from cookie
  const userData = Cookies.get("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
});

// Kita juga perlu memantau perubahan rute
router.afterEach(() => {
  // Jalankan inisialisasi ulang setelah setiap navigasi
  setTimeout(() => {
    if (window.KTApp) {
      window.KTApp.init();
    }
    if (window.KTMenu) {
      window.KTMenu.init();
    }
    if (window.KTToggle) {
      window.KTToggle.init();
    }
    if (window.KTDrawer) {
      window.KTDrawer.init();
    }
  }, 100);
});
</script>

<template>
  <template v-if="token">
    <!--begin::Page-->
    <div class="page d-flex flex-row flex-column-fluid">
      <!--begin::Wrapper-->
      <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <!--begin::Content wrapper-->
        <div class="d-flex flex-column-fluid">
          <!--begin::Header-->
          <AppHeader />
          <!--end::Header-->
          <!--begin::Content wrapper-->
          <div class="d-flex flex-column-fluid">
            <!--begin::Aside-->
            <AppSidebar />
            <!--end::Aside-->

            <!--begin::Container-->
            <div class="d-flex flex-column flex-column-fluid container-fluid">
              <!--begin::Post-->
              <div class="content flex-column-fluid" id="kt_content">
                <router-view />
              </div>
              <!--end::Post-->

              <!--begin::Footer-->
              <AppFooter />
              <!--end::Footer-->
            </div>
            <!--end::Container-->
          </div>
          <!--end::Content wrapper-->
        </div>
        <!--end::Content wrapper-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Page-->
  </template>
  <template v-else>
    <router-view />
  </template>
</template>