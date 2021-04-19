<template>
  <CCard>
    <CCardHeader>
      <strong>Pendaftaran Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <div v-show="type == 'masyarakat'">
          <CInput
            v-model="form.nama_perusahaan"
            type="text"
            description="Silahkan masukan nama perusahaan."
            label="Nama Perusahaan"
            placeholder="Masukan nama perusahaan..."
            required
          /><CInput
            v-model="form.email_perusahaan"
            type="email"
            description="Silahkan masukan email perusahaan."
            autocomplete="email"
            label="Email Perusahaan"
            placeholder="Masukan email perusahaan..."
            required
          />
          <CInput
            v-model="form.no_telp_perusahaan"
            type="number"
            description="Silahkan masukan no. telp perusahaan."
            label="No. Telp Perusahaan"
            placeholder="Masukan no. telp perusahaan..."
            required
          />
        </div>
        <CInput
          v-model="form.nama_penanggung_jawab"
          type="text"
          description="Silahkan masukan nama penanggung jawab."
          label="Nama Penanggung Jawab"
          placeholder="Masukan nama penanggung jawab..."
          required
        /><CInput
          v-model="form.email_penanggung_jawab"
          type="email"
          description="Silahkan masukan email penanggung jawab."
          autocomplete="email"
          label="Email Penanggung Jawab"
          placeholder="Masukan email penanggung jawab..."
          required
        />
        <CInput
          v-model="form.no_telp_penanggung_jawab"
          type="number"
          description="Silahkan masukan no. telp penanggung jawab."
          label="No. Telp Penanggung Jawab"
          placeholder="Masukan no. telp penanggung jawab..."
          required
        />
        <CInput
          v-model="form.nip"
          type="number"
          description="Silahkan masukan nip/nik penanggung jawab."
          label="NIP/NIK Penanggung Jawab"
          placeholder="Masukan nip/nik penanggung jawab..."
          required
        />
        <CSelect
          :value.sync="form.uptd_id"
          description="Silahkan pilih UPTD."
          label="UPTD"
          required
          :options="uptdOptions"
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="button" size="sm" color="primary" @click="update">
          <CIcon name="cil-check-circle" /> Submit
        </CButton>
        <NuxtLink to="/pemohon/list">
          <CButton type="button" size="sm" color="danger">
            <CIcon name="cil-ban" /> Batal
          </CButton>
        </NuxtLink>
      </CCardFooter>
    </CForm>
  </CCard>
</template>

<script>
export default {
  layout: 'TheContainer',
  async asyncData ({ query, params, $axios }) {
    const { type } = query
    const { slug } = params
    const { data } = await $axios.get('labkon/daftar_pemohon/show/' + slug)
    const form = data.pemohon
    const formReset = form
    return { form, formReset, type }
  },
  data () {
    return {
      uptdOptions: [{
        value: 0,
        label: 'Pilih UPTD'
      }],
      form: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async update () {
      const { data } = await this.$axios.put('labkon/daftar_pemohon/edit/' + this.form.id_pemohon, this.form)
      if (data.status === 'success') {
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: `Berhasil memperbaharui data pemohon ${this.form.id_pemohon}.`
          }
        ])
        this.$router.push({ path: '/pemohon/list' })
      }
    },
    reset () {
      this.form = this.formReset
    },
    async init () {
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
</script>
