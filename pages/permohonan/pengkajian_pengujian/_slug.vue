<template>
  <CCard>
    <CCardHeader>
      <strong>Form Bahan Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <CSelect
          horizontal
          description="Pilih Kondisi Sampel."
          label="Kondisi Sampel"
          required
          :options="['Baik', 'Cacat', 'Kurang']"
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
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
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
  asyncData ({ $axios, params }) {
    const { slug } = params
    console.log(slug)
  },
  data () {
    return {
      nama_pengujian: [],
      checkedPengujian: []
    }
  },
  methods: {
  }
}
</script>
