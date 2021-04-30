<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">
                    Masuk menggunakan akun Teman Jabar
                  </p>
                  <CInput
                    v-model="form.email"
                    placeholder="Email"
                    autocomplete="email"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    v-model="form.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="login">
                        Login
                      </CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton> -->
                      <CButton color="link" class="d-lg-none">
                        Comming Soon!
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
                <CButton color="light" variant="outline" size="lg" disabled>
                  Comming Soon!
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
      }
    }
  },
  methods: {
    async login () {
      const { data } = await this.$auth.loginWith('local', { data: this.form })
      if (data.data.token.access_token) { this.$router.push({ path: '/dashboard' }) }
    }
  }
}
</script>
