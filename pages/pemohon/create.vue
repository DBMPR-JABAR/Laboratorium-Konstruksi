<template>
  <CCard>
    <CCardHeader>
      <strong>Pendaftaran Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <div v-show="$auth.user.role == 'masyarakat'">
          <CInput
            v-model="form.nama_perusahaan"
            type="text"
            description="Silahkan masukan nama perusahaan."
            label="Nama Perusahaan"
            required
          /><CInput
            v-model="form.email_perusahaan"
            type="email"
            description="Silahkan masukan email perusahaan."
            autocomplete="email"
            label="Email Perusahaan"
            required
          />
          <CInput
            v-model="form.no_telp_perusahaan"
            type="number"
            description="Silahkan masukan no. telp perusahaan."
            label="No. Telp Perusahaan"
            required
          />
        </div>
        <CInput
          v-model="form.nama_penanggung_jawab"
          type="text"
          description="Silahkan masukan nama penanggung jawab."
          label="Nama Penanggung Jawab"
          required
        /><CInput
          v-model="form.email_penanggung_jawab"
          type="email"
          description="Silahkan masukan email penanggung jawab."
          autocomplete="email"
          label="Email Penanggung Jawab"
          required
        />
        <CInput
          v-model="form.no_telp_penanggung_jawab"
          type="number"
          description="Silahkan masukan no. telp penanggung jawab."
          label="No. Telp Penanggung Jawab"
          required
        />
        <CInput
          v-model="form.nip"
          type="number"
          description="Silahkan masukan nip/nik penanggung jawab."
          label="NIP/NIK Penanggung Jawab"
          required
        />
        <CSelect
          v-show="isInternal()"
          :value.sync="form.uptd_id"
          description="Silahkan pilih UPTD."
          label="UPTD"
          required
          :options="uptdOptions"
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
      uptdOptions: [{
        value: 0,
        label: 'Pilih UPTD'
      }],
      form: {
        nama_perusahaan: '',
        email_perusahaan: '',
        no_telp_perusahaan: '',
        nama_penanggung_jawab: '',
        email_penanggung_jawab: '',
        no_telp_penanggung_jawab: '',
        nip: '',
        uptd_id: null
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    isInternal () {
      return this.$auth.user.role === 'internal'
    },
    async insert () {
      const { data } = await this.$axios.post('labkon/daftar_pemohon/create', this.form)
      if (data.status === 'success') {
        this.$router.push({ path: '/pemohon/list' })
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Berhasil menambah data pemohon.'
          }
        ])
      }
    },
    async init () {
      if (this.isInternal) {
        const { data } = await this.$axios.get('uptd_list')
        this.uptdOptions = data.uptd_list.map((uptd) => {
          return {
            value: uptd.id,
            label: uptd.nama
          }
        })
      }
    }
  }
}
</script>
