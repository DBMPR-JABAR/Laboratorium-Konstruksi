<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard v-if="mode_verif === false" class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm ref="form" @submit="register">
                <h1>Daftar</h1>
                <p class="text-muted">
                  Buat akun untuk permohonan baru
                </p>
                <CInput
                  v-model="form.name"
                  required
                  placeholder="Nama"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  v-model="form.email"
                  required
                  type="email"
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                />
                <CInput
                  v-model="form.password"
                  required
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CInput
                  v-model="form.retypePassword"
                  required
                  placeholder="Ulangi password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <p v-show="errors.show" class="text-danger">
                  <small>{{ errors.message }}</small>
                </p>
                <CProgress
                  v-show="loading"
                  :value="100"
                  :max="100"
                  animated
                  color="success"
                  striped
                  class="mb-2"
                />
                <CButton type="submit" color="success" block>
                  Buat akun
                </CButton>
              </CForm>
            </CCardBody>
            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
          <CCard v-if="mode_verif" class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm ref="form_verif" @submit="verifikasi">
                <h1>Verifikasi</h1>
                <p class="text-muted">
                  Silahkan masukan kode otp yang dikirim melalui email terdaftar
                </p>
                <CInput
                  v-model="form.kode_otp"
                  required
                  type="number"
                  placeholder="Kode OTP"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <p v-show="errors.show" class="text-danger">
                  <small>{{ errors.message }}</small>
                </p>
                <CButton type="submit" color="success" block>
                  Verifikasi
                </CButton>
              </CForm>
              <CButton
                class="mt-2"
                type="submit"
                color="info"
                block
                :disabled="disabled"
                @click="reRegister"
              >
                Kirim ulang Verifikasi {{ countdown>0 ? `(${countdown})` : '' }}
              </CButton>
            </CCardBody>
            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
        retypePassword: '',
        kode_otp: null
      },
      errors: {
        show: false,
        message: ''
      },
      mode_verif: false,
      kode_otp: null,
      disabled: false,
      countdown: 0,
      interval: null
    }
  },
  methods: {
    async register (e) {
      e.preventDefault()

      if (this.$refs.form.checkValidity()) {
        if (this.form.password !== this.form.retypePassword) {
          this.errors.message = 'Password harus sama!'
          this.errors.show = true
          setTimeout(() => {
            this.errors.show = false
          }, 1000)
        } else {
          this.loading = true
          const { data } = await this.$axios.post('/auth/register', this.form)
          if (data.status !== 'success') {
            this.loading = false
            this.errors.message = data.data.message
            this.errors.show = true
            setTimeout(() => {
              this.errors.show = false
            }, 2000)
          } else {
            this.loading = false
            this.kode_otp = data.data.kode_otp
            this.mode_verif = true
            this.setCountdown()
          }
        }
      }
    },
    async verifikasi (e) {
      e.preventDefault()
      const { data } = await this.$axios.post('/auth/verifyOTP', { email: this.form.email, kode_otp: this.form.kode_otp })
      if (data.status !== 'success') {
        this.errors.message = data.data.message
        this.errors.show = true
        setTimeout(() => {
          this.errors.show = false
        }, 2000)
      } else {
        const { data } = await this.$auth.loginWith('local', { data: this.form })
        if (data.status === 'success') {
          if (data.data.token.access_token) {
            this.$router.push({ path: '/dashboard' })
            this.$store.commit('ui/set', [
              'flushMessage', {
                color: 'success',
                open: true,
                message: `Verifikasi berhasil, selamat datang ${this.form.name}.`
              }
            ])
          }
        }
      }
    },
    async reRegister () {
      const { data } = await this.$axios.post('/auth/register', this.form)
      if (data.status === 'success') {
        this.setCountdown()
        this.kode_otp = data.data.kode_otp
        this.errors.message = 'Kode verifikasi telah dikirim ulang.'
        this.errors.show = true
        setTimeout(() => {
          this.errors.show = false
        }, 1000)
      }
    },
    setCountdown () {
      this.disabled = true
      this.countdown = 60
      this.interval = setInterval(() => {
        this.countdown = this.countdown - 1
        if (this.countdown === 0) {
          this.disabled = false
          clearInterval(this.interval)
        }
      }, 1000)
    }
  }
}
</script>
