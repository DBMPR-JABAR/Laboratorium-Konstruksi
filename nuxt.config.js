export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.TARGET || 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Labolatorium Kontruksi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bina Marga Labolatorium Kontruksi' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~node_modules/@coreui/coreui/scss/coreui',
    '~assets/scss/style.scss',
    '~node_modules/vue-select/src/scss/vue-select.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/coreui-vue.js', mode: 'client' },
    { src: '~/plugins/icons.js', mode: 'client' },
    { src: '~/plugins/vue-select.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.API_URL || 'http://localhost/temanjabar/public/api/'
  },

  // Authorization
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'data.token.access_token' },
          user: { url: 'auth/user', method: 'post', propertyName: 'data.user' },
          logout: false
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base: '/labkon/',
    // mode: 'hash',
    linkActiveClass: 'active',
    routeNameSplitter: '/',
    middleware: ['auth']
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
    dir: '../labkon'
  }
}
