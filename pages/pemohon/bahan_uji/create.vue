<template>
  <CCard>
    <CCardHeader>
      <strong>Form Bahan Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm novalidate>
      <CCardBody>
        <CInput
          :value="id"
          horizontal
          type="text"
          label="No Pemohonan Sementara"
          description="No Pemohonan Sementara."
          readonly
        />
        <CCard class="p-3">
          <CRow>
            <CCol v-for="(bahan_uji, key) in Object.keys(checkBoxPengujian)" :key="bahan_uji" md="6">
              <CCard class="p-3">
                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    {{ bahan_uji }}
                  </CCol>
                  <CCol sm="9" class="">
                    <CRow>
                      <CCol
                        v-for="(option) in checkBoxPengujian[bahan_uji]"
                        :key="`${key}_${option.id}`"
                        md="12"
                      >
                        <CInputCheckbox
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
                  v-model="jumlahBahanUji[bahan_uji]"
                  horizontal
                  type="number"
                  label="Jumlah Bahan Uji"
                  description="Jumlah Bahan Uji."
                  required
                  :value="jumlahBahanUji[bahan_uji]"
                />
                <CSelect
                  horizontal
                  description="Metode pengujian."
                  label="Metode pengujian"
                  required
                  :options="metodePengujianFilter(bahan_uji)"
                />
              </CCard>
            </CCol>
          </CRow>
        </CCard>
        <CInput
          v-model="form.lokasi"
          horizontal
          type="text"
          label="Lokasi Pengambilan Sampel"
          description="Lokasi Pengambilan Sampel."
          required
        />
        <CInput
          v-model="form.latitude"
          horizontal
          type="text"
          label="Latitude"
          description="Latitude."
          required
        />
        <CInput
          v-model="form.longitude"
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
  async asyncData ({ $axios, query }) {
    const { id } = query
    const { data } = await $axios.get('/labkon/nama_pengujian')
    const getMetodePengujian = await $axios.get('/labkon/metode_pengujian')
    // console.log(getMetodePengujian.data.data.metode_pengujian)
    const metodePengujian = getMetodePengujian.data.data.metode_pengujian
    // const checkedFromApi = '2_1,2_11,2_12,2_13,3_14,3_15,3_16,3_17,3_18,3_19,3_20,3_21,3_22,4_23,4_24,4_27,4_28,4_29,4_30,4_31,7_33,7_34,7_35,8_38,8_39'
    // const checkedByComma = checkedFromApi.split(',')
    const checkBoxPengujian = data.data.nama_pengujian.reduce((rv, x) => {
      (rv[x.nama_bahan] = rv[x.nama_bahan] || []).push({ nama_pengujian: x.nama_pengujian, id_bahan_uji: x.id_bahan_uji, id: x.id, value: `${x.id_bahan_uji}_${x.id}` })
      return rv
    }, {})
    const checked = []
    // checkedByComma.forEach((check) => {
    //   checked[check] = false
    // })
    const jumlahBahanUji = []
    jumlahBahanUji.Aspal = 55
    console.log(jumlahBahanUji)
    return { checkBoxPengujian, checked, id, metodePengujian, jumlahBahanUji }
  },
  data () {
    return {
      nama_pengujian: [],
      checkedPengujian: [],
      form: {
        lokasi: '',
        latitude: '',
        longitude: ''
      }
    }
  },
  methods: {
    insert () {
      const checkedPengujian = []
      for (const checked in this.checked) { if (checked) { checkedPengujian.push(checked) } }
      console.log(this.checked, this.jumlahBahanUji, this.form)
    },
    updateChecked (value, event) {
      this.checked = {
        ...this.checked,
        [event.target.value]: value
      }
    },
    metodePengujianFilter (key) {
      const defaultValue = [{
        value: 0,
        label: 'Silahkan input data master pengujian'
      }]
      const bahanUji = this.checkBoxPengujian[key]
      if (bahanUji.length > 0) {
        const idBahanUji = bahanUji[0].id_bahan_uji
        const metodePengujianFilter = this.metodePengujian.filter(data => Number(data.id_bahan_uji) === Number(idBahanUji))
        const metodePengujian = metodePengujianFilter.map((data) => {
          return {
            value: data.id,
            label: data.metode_pengujian
          }
        })
        if (metodePengujian.length > 0) { return metodePengujian } else {
          return defaultValue
        }
      } else {
        return defaultValue
      }
    }
  }
}
</script>
