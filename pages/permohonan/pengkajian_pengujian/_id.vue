<template>
  <CCard>
    <CCardHeader>
      <strong>Form Pengkajian Pengujian Bahan Kontruksi</strong>
      <div class="card-header-actions">
        <CButton type="reset" size="sm" variant="outline" color="success" @click="downloadDocument(document.formulir_permohonan, `formulir_permohonan_${id}`)">
          <CIcon name="cil-arrow-thick-from-top" />&nbsp;Formulir
        </CButton>
        <CButton type="reset" size="sm" variant="outline" color="success" @click="downloadDocument(document.surat_permohonan,`surat_permohonan_${id}`)">
          <CIcon name="cil-arrow-thick-from-top" />&nbsp;Surat Permohonan
        </CButton>
      </div>
    </CCardHeader>
    <CForm>
      <CCardBody>
        <CInput
          :value="id"
          horizontal
          type="text"
          label="No Permohonan"
          description="No Permohonan."
          name="lokasi"
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
          rows="5"
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="button" size="sm" color="danger">
          <CIcon name="cil-x-circle" /> Ada yang kurang
        </CButton>
        <CButton type="button" size="sm" color="success">
          <CIcon name="cil-check-circle" /> Lanjut
        </CButton>
        <CButton type="reset" size="sm" color="warning">
          <CIcon name="cil-ban" /> Reset
        </CButton>
      </CCardFooter>
    </CForm>
  </CCard>
</template>
<script>
export default {
  layout: 'TheContainer',
  async asyncData ({ $axios, params }) {
    const { id } = params
    console.log(id)
    const documentPersyaratan = await $axios.get('/labkon/permohonan/dokumen_persyaratan_permohonan/' + id)
    console.log(documentPersyaratan)
    const document = documentPersyaratan.data.data.dokumen_persyaratan
    return { id, document }
  },
  data () {
    return {
      nama_pengujian: [],
      checkedPengujian: [],
      form: {
      }
    }
  },
  methods: {
    downloadDocument (link, filename) {
      const element = document.createElement('a')
      element.setAttribute('href', `http://124.81.122.132/temanjabar/public/storage/persyaratan_permohonan_labkon/${link}`)
      element.setAttribute('download', filename)
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
      console.log(this.form)
    }
  }
}
</script>
