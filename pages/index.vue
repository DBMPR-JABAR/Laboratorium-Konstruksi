<template>
  <div class="container">
    <div>
      <NuxtLink to="/dashboard">
        <LogoHitam :height="75"/>
      </NuxtLink>
      <NuxtLink to="/dashboard">
        <CRow class="d-flex justify-content-center p-4">
          <CButton
            color="success"
            class="m-2"
          >
            Pergi ke dashboard
          </CButton>
        </CRow>
      </NuxtLink>
      <h1 class="title">
        Selamat Datang di UPTD Laboratorium Bahan Konstruksi
      </h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.button-dashboard {
  display: block;
  margin: 24px auto;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
