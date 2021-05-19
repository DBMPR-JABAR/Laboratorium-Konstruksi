<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm ref="form" @submit="login" @keypress="loginUseKey">
                  <h1>Login</h1>
                  <p class="text-muted">
                    Masuk menggunakan akun Teman Jabar
                  </p>
                  <CInput
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Email"
                    autocomplete="email"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    v-model="form.password"
                    required
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="12">
                      <p v-show="credentialsError" class="text-danger">
                        <small>Email atau password salah.</small>
                      </p>
                    </CCol>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton> -->
                      <CButton color="link" class="d-lg-none" to="/register">
                        Daftar
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Registrasi</h2>
                <p>Silahkan hubungi admin untuk mendapatkan akun.</p>
                <CButton color="light" variant="outline" size="lg" to="/register">
                  Daftar
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      credentialsError: false
    }
  },
  methods: {
    async login (e) {
      if (e) { e.preventDefault() }
      const isValid = this.$refs.form.checkValidity()
      if (isValid) {
        const { data } = await this.$auth.loginWith('local', { data: this.form })
        if (data.status === 'false') {
          this.credentialsError = true
          setTimeout(() => {
            this.credentialsError = false
          }, 2000)
        } else if (data.status === 'success') {
          if (data.data.token.access_token) {
            this.$router.push({ path: '/dashboard' })
            this.$store.commit('ui/set', [
              'flushMessage', {
                color: 'success',
                open: true,
                message: 'Selamat datang.'
              }
            ])
          }
        }
      }
    },
    loginUseKey (e) {
      if (e.key === 'Enter') { this.login() }
    }
  }
}
</script>
