import webpack from "webpack";
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.TARGET || "static",
  publicRuntimeConfig: {
    storageUrl: process.env.STORAGE_URL || "https://tj.temanjabar.net/storage/"
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Labolatorium Kontruksi",
    htmlAttrs: {
      lang: "id"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Bina Marga Laboratorium Konstruksi"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  server: {
    port: 8000
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~node_modules/@coreui/coreui/scss/coreui",
    "~assets/scss/style.scss",
    "~node_modules/vue-select/src/scss/vue-select.scss",
    "~node_modules/vue-tour/dist/vue-tour.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/coreui-vue.js", mode: "client" },
    { src: "~/plugins/icons.js", mode: "client" },
    { src: "~/plugins/vue-select.js", mode: "client" },
    { src: "~/plugins/html-to-paper.js", mode: "client" },
    { src: "~/plugins/vue-pdf.js", mode: "client" },
    { src: "~/plugins/bootstrap-vue.js", mode: "client" },
    { src: "~/plugins/nuxt-leaflet.js", mode: "client" },
    { src: "~/plugins/vue-tour.js", mode: "client" },
    { src: "~/plugins/lingallery", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "nuxt-leaflet"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.API_URL || "https://tj.temanjabar.net/api/"
  },

  // Authorization
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "data.token.access_token"
          },
          user: { url: "auth/user", method: "post", propertyName: "data.user" },
          logout: false
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ],
    transpile: ["@coreui"]
  },

  router: {
    base: "/",
    // mode: 'hash',
    linkActiveClass: "active",
    routeNameSplitter: "/",
    middleware: ["auth"]
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'Pengujian',
    //     path: 'pengujian',
    //     redirect: '/pengujian/pendaftaran',
    //     // component: {
    //     //   render (c) { return c('router-view') }
    //     // }
    //     component: resolve(__dirname, 'pages/Pengujian/Pendaftaran.vue')
    //   })
    // }
  },
  generate: {
    dir: String(process.env.TARGET) === "server" ? "./dist" : "../labkon"
  }
};
