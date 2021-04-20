<template>
  <CCard>
    <CCardHeader>
      <strong>Form Bahan Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <CCard class="p-3">
          <CRow>
            <CCol v-for="(bahan_uji, key) in Object.keys(checkBoxPengujian)" :key="bahan_uji" md="6">
              <CCard :key="bahan_uji" class="p-3">
                <CRow :key="bahan_uji" form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    {{ bahan_uji }}
                  </CCol>
                  <CCol sm="9" class="">
                    <CRow>
                      <CCol
                        v-for="(option) in checkBoxPengujian[bahan_uji]"
                        :key="key + option.id"
                        md="12"
                      >
                        <CInputCheckbox
                          :key="key + option.id"
                          :v-model="checked[option.value]"
                          class="text-left"
                          :label="option.nama_pengujian"
                          :value="option.value"
                          custom
                          :name="option.value"
                          :inline="key % 2 === 1"
                          :checked="checked[option.value]"
                          @update:checked="updateChecked"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CInput
                  :key="bahan_uji"
                  horizontal
                  type="number"
                  label="Jumlah Bahan Uji"
                  description="Jumlah Bahan Uji."
                  required
                />
                <CSelect
                  :key="bahan_uji"
                  horizontal
                  description="Metode pengujian."
                  label="Metode pengujian"
                  required
                  :options="['Metode 1','Metode 2','Metode 3']"
                />
              </CCard>
            </CCol>
          </CRow>
        </CCard>
        <CInput
          horizontal
          type="text"
          label="Lokasi Pengambilan Sampel"
          description="Lokasi Pengambilan Sampel."
          required
        />
        <CInput
          horizontal
          type="text"
          label="Latitude"
          description="Latitude."
          required
        />
        <CInput
          horizontal
          type="text"
          label="Longitude"
          description="Longitude."
          required
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
  async asyncData ({ $axios, params }) {
    // const { id } = params
    // console.log(id)
    const { data } = await $axios.get('/labkon/nama_pengujian')
    console.log('datassssss', data)
    // const namaPengujian = data.data.nama_pengujian.sort((a, b) => String(a.nama_bahan).localeCompare(String(b.nama_bahan)))
    const checkBoxPengujian = data.data.nama_pengujian.reduce((rv, x) => {
      (rv[x.nama_bahan] = rv[x.nama_bahan] || []).push({ nama_pengujian: x.nama_pengujian, id_bahan_uji: x.id_bahan_uji, id: x.id, value: `${x.id_bahan_uji}_${x.id}` })
      return rv
    }, {})
    const checked = data.data.nama_pengujian.reduce((rv, x) => {
      (rv[`${x.id_bahan_uji}_${x.id}`] = true || [])
      return rv
    }, {})
    console.log('checkBoxPengujian', checkBoxPengujian)
    return { checkBoxPengujian, checked }
  },
  data () {
    return {
      nama_pengujian: [],
      checkedPengujian: []
    }
  },
  methods: {
    insert () {
      const checkedPengujian = []
      for (const checked in this.checked) { if (checked) { checkedPengujian.push(checked) } }
      console.log(checkedPengujian.toString())
    },
    updateChecked (value, event) {
      this.checked = {
        ...this.checked,
        [event.target.value]: value
      }
    }
  }
}
</script>
