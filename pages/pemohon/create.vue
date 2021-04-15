<template>
  <CCard>
    <CCardHeader>
      <strong>Pendaftaran Pengujian Labolarium Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <CInput
          v-model="form.nama_perusahaan"
          type="text"
          description="Silahkan masukan nama perusahaan."
          label="Nama Perusahaan"
          placeholder="Masukan nama perusahaan..."
          required
          was-validated
        /><CInput
          v-model="form.email_perusahaan"
          type="email"
          description="Silahkan masukan email perusahaan."
          autocomplete="email"
          label="Email Perusahaan"
          placeholder="Masukan email perusahaan..."
          required
          was-validated
        />
        <CInput
          v-model="form.no_telp_perusahaan"
          type="number"
          description="Silahkan masukan no. telp perusahaan."
          label="No. Telp Perusahaan"
          placeholder="Masukan no. telp perusahaan..."
          required
          was-validated
        /><CInput
          v-model="form.nama_penanggung_jawab"
          type="text"
          description="Silahkan masukan nama penanggung jawab."
          label="Nama Penanggung Jawab"
          placeholder="Masukan nama penanggung jawab..."
          required
          was-validated
        /><CInput
          v-model="form.email_penanggung_jawab"
          type="email"
          description="Silahkan masukan email penanggung jawab."
          autocomplete="email"
          label="Email Penanggung Jawab"
          placeholder="Masukan email penanggung jawab..."
          required
          was-validated
        />
        <CInput
          v-model="form.no_telp_penanggung_jawab"
          type="number"
          description="Silahkan masukan no. telp penanggung jawab."
          label="No. Telp Penanggung Jawab"
          placeholder="Masukan no. telp penanggung jawab..."
          required
          was-validated
        />
        <CInput
          v-model="form.nip"
          type="number"
          description="Silahkan masukan nip/nik penanggung jawab."
          label="NIP/NIK Penanggung Jawab"
          placeholder="Masukan nip/nik penanggung jawab..."
          required
          was-validated
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="button" size="sm" color="primary" @click="insert">
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
export default {
  layout: 'TheContainer',
  data () {
    return {
      form: {
        nama_perusahaan: '',
        email_perusahaan: '',
        no_telp_perusahaan: '',
        nama_penanggung_jawab: '',
        email_penanggung_jawab: '',
        no_telp_penanggung_jawab: '',
        nip: ''
      }
    }
  },
  methods: {
    async insert () {
      console.log(this.form)
      const response = await this.$axios.post('labkon/daftar_pemohon/create', this.form)
      console.log(response)
    }
  }
}
</script>
