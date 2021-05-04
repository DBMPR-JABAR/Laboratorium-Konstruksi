<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">
              Login
            </h1>
            <h4 class="pt-3">
              Tunggu proses login.
            </h4>
            <p class="text-muted">
              Halaman akan otomatis dialihkan.
            </p>
          </div>
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>
<script>
export default ({
  auth: false,
  asyncData ({ query, params }) {
    const { from } = params
    const { token } = query
    console.log(from)
    return { token, from }
  },
  async created () {
    await this.$auth.setUserToken(this.token, this.token)
    if (this.$auth.loggedIn) {
      this.$router.push({ path: '/dashboard' })
      this.$store.commit('ui/set', [
        'flushMessage', {
          color: 'success',
          open: true,
          message: `Selamat datang, Anda login melalui ${this.from}`
        }
      ])
    }
  }
})
</script>
