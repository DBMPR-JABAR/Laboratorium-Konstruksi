<template>
  <CCard>
    <CCardHeader>
      <strong>Pendaftaran Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm ref="form" @submit="update">
      <CCardBody>
        <div v-if="type == 'masyarakat'">
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
          /><CInput
            v-model="form.alamat_perusahaan"
            type="text"
            description="Silahkan masukan alamat perusahaan."
            label="Alamat Perusahaan"
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
          v-model="form.nip"
          type="number"
          description="Silahkan masukan nip/nik pemohon."
          label="NIP/NIK Pemohon"
          required
        />
        <CInput
          v-model="form.nama_penanggung_jawab"
          type="text"
          description="Silahkan masukan nama pemohon."
          label="Nama Pemohon"
          required
        /><CInput
          v-model="form.email_penanggung_jawab"
          type="email"
          description="Silahkan masukan email pemohon."
          autocomplete="email"
          label="Email Pemohon"
          required
        /><CInput
          v-model="form.alamat_penanggung_jawab"
          type="text"
          description="Silahkan masukan alamat pemohon."
          label="Alamat Pemohon"
          required
        />
        <CInput
          v-model="form.no_telp_penanggung_jawab"
          type="number"
          description="Silahkan masukan no. telp pemohon."
          label="No. Telp Pemohon"
          required
        />
        <CSelect
          v-show="$auth.user.role === 'internal'"
          :value.sync="form.uptd_id"
          description="Silahkan pilih UPTD."
          label="UPTD"
          required
          :options="uptdOptions"
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary">
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
    async update (e) {
      e.preventDefault()
      if (this.$refs.form.checkValidity()) {
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
