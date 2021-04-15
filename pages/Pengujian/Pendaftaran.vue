<template>
  <CCard>
    <CCardHeader>
      <strong>Pendaftaran Pengujian Labolarium Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <CInput
          type="text"
          description="Silahkan masukan nama perusahaan."
          label="Nama Perusahaan"
          placeholder="Masukan nama perusahaan..."
          required
          was-validated
        /><CInput
          type="email"
          description="Silahkan masukan email perusahaan."
          autocomplete="email"
          label="Email Perusahaan"
          placeholder="Masukan email perusahaan..."
          required
          was-validated
        />
        <CInput
          type="number"
          description="Silahkan masukan no. telp perusahaan."
          label="No. Telp Perusahaan"
          placeholder="Masukan no. telp perusahaan..."
          required
          was-validated
        /><CInput
          type="text"
          description="Silahkan masukan nama penanggung jawab."
          label="Nama Penanggung Jawab"
          placeholder="Masukan nama penanggung jawab..."
          required
          was-validated
        /><CInput
          type="email"
          description="Silahkan masukan email penanggung jawab."
          autocomplete="email"
          label="Email Penanggung Jawab"
          placeholder="Masukan email penanggung jawab..."
          required
          was-validated
        />
        <CInput
          type="number"
          description="Silahkan masukan no. telp penanggung jawab."
          label="No. Telp Penanggung Jawab"
          placeholder="Masukan no. telp penanggung jawab..."
          required
          was-validated
        />
        <CInput
          type="number"
          description="Silahkan masukan nip/nik penanggung jawab."
          label="NIP/NIK Penanggung Jawab"
          placeholder="Masukan nip/nik penanggung jawab..."
          required
          was-validated
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary">
          <CIcon name="cil-check-circle" /> Submit
        </CButton>
        <CButton type="reset" size="sm" color="danger">
          <CIcon name="cil-ban" /> Reset
        </CButton>
      </CCardFooter>
    </CForm>
  </CCard>
</template>

<script>
export default { layout: 'TheContainer' }
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
  font-family:
    'Quicksand',
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
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
