<script setup>
// import reactive, ref, onMounted, onUnmounted from vue
import { reactive, ref, onMounted, onUnmounted } from "vue";

// import useRouter from vue router
import { useRouter } from "vue-router";

// inisilisasi vue router on Composition API
const router = useRouter();

// import service api
import api from "../../services/api";

// import cookies
import Cookies from "js-cookie";

// --- LOGIKA LOGIN ANDA TETAP SAMA ---
// state user
const user = reactive({
  email: "",
  password: "",
});

// state validation
const validation = ref([]);
const loginFailed = ref([]);

// method login
const login = async () => {
  // Panggil api login
  await api
    .post("/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      // set token and user on cookies
      Cookies.set("token", response.data.data.token);
      Cookies.set("user", JSON.stringify(response.data.data.user));

      // Verify the token is set before redirecting
      if (Cookies.get("token")) {
        // redirect ke halaman home
        router.push({
          name: "dashboard",
        });
      }
    })
    .catch((error) => {
      // assign validation value with error
      validation.value = error.response.data;

      // assign loginFailed value with error
      loginFailed.value = error.response.data;
    });
};

// --- LOGIKA BARU UNTUK METRONIC ---

// Menambahkan style background dan class ke <body>
onMounted(() => {
  // Set ID dan class pada <body>
  document.body.setAttribute("id", "kt_body");
  document.body.classList.add(
    "auth-bg",
    "bgi-size-cover",
    "bgi-attachment-fixed",
    "bgi-position-center"
  );

  // === PERBAIKAN: Terapkan background-image via JavaScript ===
  // Cek tema yang aktif (dari script Metronic di index.html)
  const themeMode =
    document.documentElement.getAttribute("data-bs-theme") || "light";
  if (themeMode === "dark") {
    document.body.style.backgroundImage =
      "url('/assets/media/auth/bg10-dark.jpg')";
  } else {
    document.body.style.backgroundImage = "url('/assets/media/auth/bg10.jpg')";
  }
  // === AKHIR PERBAIKAN ===

  // Memuat script JS khusus untuk halaman login
  const script = document.createElement("script");
  script.id = "kt_login_general_js";
  // Pastikan path ini benar menunjuk ke folder public Anda
  script.src = "/assets/js/custom/authentication/sign-in/general.js";
  document.body.appendChild(script);
});

// Membersihkan style dan class dari <body> saat meninggalkan halaman
onUnmounted(() => {
  // Hapus ID dan class
  document.body.removeAttribute("id");
  document.body.classList.remove(
    "auth-bg",
    "bgi-size-cover",
    "bgi-attachment-fixed",
    "bgi-position-center"
  );

  // === PERBAIKAN: Hapus background-image ===
  document.body.style.backgroundImage = "";
  // === AKHIR PERBAIKAN ===

  // Hapus script JS
  const script = document.getElementById("kt_login_general_js");
  if (script && document.body.contains(script)) {
    document.body.removeChild(script);
  }
});
</script>

<template>
  <!--begin::Authentication - Sign-in -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <!--begin::Aside-->
    <div class="d-flex flex-lg-row-fluid">
      <!--begin::Content-->
      <div class="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
        <!--begin::Image-->
        <img
          class="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
          src="/assets/media/auth/agency.png"
          alt=""
        />
        <img
          class="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
          src="/assets/media/auth/agency-dark.png"
          alt=""
        />
        <!--end::Image-->

        <!--begin::Title-->
        <h1 class="text-gray-800 fs-2qx fw-bold text-center mb-7">
          Fast, Efficient and Productive
        </h1>
        <!--end::Title-->

        <!--begin::Text-->
        <div class="text-gray-600 fs-base text-center fw-semibold">
          In this kind of post,
          <a href="#" class="opacity-75-hover text-primary me-1">the blogger</a>

          introduces a person they’ve interviewed <br />
          and provides some background information about

          <a href="#" class="opacity-75-hover text-primary me-1"
            >the interviewee</a
          >
          and their <br />
          work following this is a transcript of the interview.
        </div>
        <!--end::Text-->
      </div>
      <!--end::Content-->
    </div>
    <!--begin::Aside-->

    <!--begin::Body-->
    <div
      class="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12"
    >
      <!--begin::Wrapper-->
      <div
        class="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10"
      >
        <!--begin::Content-->
        <div
          class="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px"
        >
          <!--begin::Wrapper-->
          <div
            class="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20"
          >
            <!--begin::Form-->
            <form
              class="form w-100"
              novalidate="novalidate"
              id="kt_sign_in_form"
              data-kt-redirect-url="/assets8/demo14/index.html"
              @submit.prevent="login"
            >
              <!--begin::Heading-->
              <div class="text-center mb-11">
                <!--begin::Title-->
                <h1 class="text-gray-900 fw-bolder mb-3">Sign In</h1>
                <!--end::Title-->

                <!--begin::Subtitle-->
                <div class="text-gray-500 fw-semibold fs-6">
                  Your Social Campaigns
                </div>
                <!--end::Subtitle--->
              </div>
              <!--begin::Heading-->

              <!--begin::Login options-->
              <div class="row g-3 mb-9">
                <!--begin::Col-->
                <div class="col-md-6">
                  <!--begin::Google link--->
                  <a
                    href="#"
                    class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                  >
                    <img
                      alt="Logo"
                      src="/assets/media/svg/brand-logos/google-icon.svg"
                      class="h-15px me-3"
                    />
                    Belum bisa with Google
                  </a>
                  <!--end::Google link--->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6">
                  <!--begin::Google link--->
                  <a
                    href="#"
                    class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                  >
                    <img
                      alt="Logo"
                      src="/assets/media/svg/brand-logos/apple-black.svg"
                      class="theme-light-show h-15px me-3"
                    />
                    <img
                      alt="Logo"
                      src="/assets/media/svg/brand-logos/apple-black-dark.svg"
                      class="theme-dark-show h-15px me-3"
                    />
                    Belum bisa with Apple
                  </a>
                  <!--end::Google link--->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Login options-->

              <!--begin::Separator-->
              <div class="separator separator-content my-14">
                <span class="w-125px text-gray-500 fw-semibold fs-7"
                  >Or with email</span
                >
              </div>
              <!--end::Separator-->

              <!--begin::Input group--->
              <div class="fv-row mb-8">
                <!--begin::Email-->
                <input
                  type="text"
                  v-model="user.email"
                  placeholder="Email"
                  name="email"
                  autocomplete="off"
                  class="form-control bg-transparent"
                />
                <!--end::Email-->
              </div>

              <!--end::Input group--->
              <div class="fv-row mb-3">
                <!--begin::Password-->
                <input
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                  name="password"
                  autocomplete="off"
                  class="form-control bg-transparent"
                />
                <!--end::Password-->
              </div>
              <!--end::Input group--->

              <!--begin::Wrapper-->
              <div
                class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8"
              >
                <div></div>

                <!--begin::Link-->
                <a href="reset-password.html" class="link-primary">
                  Forgot Password ?
                </a>
                <!--end::Link-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Submit button-->
              <div class="d-grid mb-10">
                <button type="submit" class="btn btn-primary">
                  <!--begin::Indicator label-->
                  <span class="indicator-label"> Sign In</span>
                  <!--end::Indicator label-->

                  <!--begin::Indicator progress-->
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                  <!--end::Indicator progress-->
                </button>
              </div>
              <!--end::Submit button-->

              <!--begin::Sign up-->
              <div class="text-gray-500 text-center fw-semibold fs-6">
                Not a Member yet?

                <router-link :to="{ name: 'register' }" class="link-primary">
                  Sign up
                </router-link>
              </div>
              <!--end::Sign up-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Wrapper-->

          <!--begin::Footer-->
          <div class="d-flex flex-stack">
            <!--begin::Languages-->
            <div class="me-10">
              <!--begin::Toggle-->
              <button
                class="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-start"
                data-kt-menu-offset="0px, 0px"
              >
                <img
                  data-kt-element="current-lang-flag"
                  class="w-20px h-20px rounded me-3"
                  src="/assets/media/flags/united-states.svg"
                  alt=""
                />

                <span data-kt-element="current-lang-name" class="me-1"
                  >English</span
                >

                <i
                  class="ki-duotone ki-down fs-5 text-muted rotate-180 m-0"
                ></i>
              </button>
              <!--end::Toggle-->

              <!--begin::Menu-->
              <div
                class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7"
                data-kt-menu="true"
                id="kt_auth_lang_menu"
              >
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    href="#"
                    class="menu-link d-flex px-5"
                    data-kt-lang="English"
                  >
                    <span class="symbol symbol-20px me-4">
                      <img
                        data-kt-element="lang-flag"
                        class="rounded-1"
                        src="/assets/media/flags/united-states.svg"
                        alt=""
                      />
                    </span>
                    <span data-kt-element="lang-name">English</span>
                  </a>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    href="#"
                    class="menu-link d-flex px-5"
                    data-kt-lang="Spanish"
                  >
                    <span class="symbol symbol-20px me-4">
                      <img
                        data-kt-element="lang-flag"
                        class="rounded-1"
                        src="/assets/media/flags/spain.svg"
                        alt=""
                      />
                    </span>
                    <span data-kt-element="lang-name">Spanish</span>
                  </a>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    href="#"
                    class="menu-link d-flex px-5"
                    data-kt-lang="German"
                  >
                    <span class="symbol symbol-20px me-4">
                      <img
                        data-kt-element="lang-flag"
                        class="rounded-1"
                        src="/assets/media/flags/germany.svg"
                        alt=""
                      />
                    </span>
                    <span data-kt-element="lang-name">German</span>
                  </a>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    href="#"
                    class="menu-link d-flex px-5"
                    data-kt-lang="Japanese"
                  >
                    <span class="symbol symbol-20px me-4">
                      <img
                        data-kt-element="lang-flag"
                        class="rounded-1"
                        src="/assets/media/flags/japan.svg"
                        alt=""
                      />
                    </span>
                    <span data-kt-element="lang-name">Japanese</span>
                  </a>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    href="#"
                    class="menu-link d-flex px-5"
                    data-kt-lang="French"
                  >
                    <span class="symbol symbol-20px me-4">
                      <img
                        data-kt-element="lang-flag"
                        class="rounded-1"
                        src="/assets/media/flags/france.svg"
                        alt=""
                      />
                    </span>
                    <span data-kt-element="lang-name">French</span>
                  </a>
                </div>
                <!--end::Menu item-->
              </div>
              <!--end::Menu-->
            </div>
            <!--end::Languages-->

            <!--begin::Links-->
            <div class="d-flex fw-semibold text-primary fs-base gap-5">
              <a href="/pages/team.html" target="_blank">Terms</a>

              <a href="/pages/pricing/column.html" target="_blank">Plans</a>

              <a href="/pages/contact.html" target="_blank">Contact Us</a>
            </div>
            <!--end::Links-->
          </div>
          <!--end::Footer-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication - Sign-in-->
</template>