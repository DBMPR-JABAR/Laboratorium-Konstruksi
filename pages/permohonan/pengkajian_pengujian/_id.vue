<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Dokumen Persyaratan</strong>
      </CCardHeader>
      <CCardBody>
        <CTabs>
          <CTab active>
            <template slot="title">
              Surat Permohonan
            </template>
            <img
              width="50%"
              class="rounded mx-auto d-block border"
              :src="storageUrl(document.surat_permohonan)"
              alt="Surat Permohonan"
              @click="downloadDocument(document.surat_permohonan, `surat_permohonan_${id}`)"
            >
          </CTab>
          <CTab>
            <template slot="title">
              Formulir Permohonan
            </template>
            <img
              width="50%"
              class="rounded mx-auto d-block border"
              :src="storageUrl(document.formulir_permohonan)"
              alt="Formulir Permohonan"
              @click="downloadDocument(document.formulir_permohonan,`formulir_permohonan_${id}`)"
            >
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <strong>Form Pengkajian Pengujian Bahan Kontruksi</strong>
      </CCardHeader>
      <CForm ref="form" @submit="submit">
        <CCardBody>
          <CInput
            :value="id"
            horizontal
            type="text"
            label="No Permohonan"
            description="No Permohonan."
            name="id_permohonan"
            required
            readonly
          />
          <CRow form class="form-group">
            <CCol tag="label" sm="3" class="col-form-label">
              Apakah sudah memenuhi syarat ?
            </CCol>
            <CCol sm="9" class="">
              <CRow>
                <CCol
                  md="12"
                >
                  <CInputCheckbox
                    class="text-left"
                    label="Lingkup"
                    custom
                    name="lingkup"
                    @update:checked="updateForm"
                  />
                </CCol>
                <CCol
                  md="12"
                >
                  <CInputCheckbox
                    class="text-left"
                    label="Jenis Sampel"
                    custom
                    name="jenis_sampel"
                    @update:checked="updateForm"
                  />
                </CCol>
                <CCol
                  md="12"
                >
                  <CInputCheckbox
                    class="text-left"
                    label="Metode Pengujian"
                    custom
                    name="metode_pengujian"
                    @update:checked="updateForm"
                  />
                </CCol>
                <CCol
                  md="12"
                >
                  <CInputCheckbox
                    class="text-left"
                    label="Personil"
                    custom
                    name="personil"
                    @update:checked="updateForm"
                  />
                </CCol>
                <CCol
                  md="12"
                >
                  <CInputCheckbox
                    class="text-left"
                    label="Waktu"
                    custom
                    name="waktu"
                    @update:checked="updateForm"
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CSelect
            name="kondisi_sampel"
            horizontal
            description="Pilih Kondisi Sampel."
            label="Kondisi Sampel"
            required
            :options="['Baik', 'Cacat', 'Kurang']"
            @update:value="updateForm"
          />
          <CTextarea
            v-model="form.catatan"
            label="Catatan"
            placeholder="Catatan..."
            horizontal
            required
            rows="5"
          />
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" name="submit_reject" size="sm" color="danger" @click="callbackOnSubmit = onReject">
            <CIcon name="cil-x-circle" /> Ada yang kurang
          </CButton>
          <CButton type="submit" size="sm" name="submit" color="success" @click="callbackOnSubmit = onSubmit">
            <CIcon name="cil-check-circle" /> Lanjut
          </CButton>
          <CButton type="reset" size="sm" color="warning">
            <CIcon name="cil-ban" /> Reset
          </CButton>
        </CCardFooter>
      </CForm>
    </CCard>
  </div>
</template>
<script>
export default {
  layout: 'TheContainer',
  async asyncData ({ $axios, params, $router, $store }) {
    const pengkajianPermissionData = await $axios.get('has_access/Pengkajian Pengujian')
    const pengkajianPermission = pengkajianPermissionData.data.data.permission
    const { id } = params
    const documentPersyaratan = await $axios.get('/labkon/permohonan/dokumen_persyaratan_permohonan/' + id)
    const document = documentPersyaratan.data.data.dokumen_persyaratan
    return { id, document, pengkajianPermission }
  },
  data () {
    return {
      callbackOnSubmit: null,
      nama_pengujian: [],
      checkedPengujian: [],
      form: {
      },
      tabs: [
        'Surat Permohonan',
        'Formulir Permohonan'
      ],
      activeTab: 1
    }
  },
  beforeMount () {
    if (this.pengkajianPermission.update === false) {
      this.$router.push({ path: '/permohonan/list' })
      this.$store.commit('ui/set', [
        'flushMessage', {
          color: 'danger',
          open: true,
          message: 'Anda tidak memiliki akses.'
        }
      ])
    }
  },
  methods: {
    storageUrl (link) {
      return this.$config.storageUrl + link
    },
    downloadDocument (link, filename) {
      const element = document.createElement('a')
      element.setAttribute('href', this.storageUrl(link))
      element.setAttribute('download', filename)
      element.setAttribute('target', '_blank')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    updateForm (value, event) {
      this.form = {
        ...this.form,
        [event.target.name]: value
      }
    },
    submit (e) {
      e.preventDefault()
      if (this.$refs.form.checkValidity()) { this.callbackOnSubmit() }
    },
    async onSubmit () {
      const submitButton = this.$refs.form.submit
      submitButton.disabled = true
      this.form.status = 3
      const { data } = await this.$axios.put('/labkon/permohonan/pengkajian_permohonan/' + this.id, this.form)
      if (data.status === 'success') {
        submitButton.disabled = false
        this.$router.push({ path: '/permohonan/list' })
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Berhasil menyetujui data permohonan.'
          }
        ])
      } else {
        submitButton.disabled = true
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Terjadi kesalahan saat menyetujui data permohonan.'
          }
        ])
      }
    },
    async onReject () {
      const submitButton = this.$refs.form.submit_reject
      submitButton.disabled = true
      this.form.status = 0
      const { data } = await this.$axios.put('/labkon/permohonan/pengkajian_permohonan/' + this.id, this.form)
      if (data.status === 'success') {
        this.$router.push({ path: '/permohonan/list' })
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Berhasil menolak dengan catatan perbaikan data permohonan.'
          }
        ])
      } else {
        submitButton.disabled = false
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'danger',
            open: true,
            message: 'Terjadi kesalahan saat menolak data permohonan.'
          }
        ])
      }
    }
  }
}
</script>
