<template>
  <CCard>
    <CCardHeader>
      <strong>Form Bahan Pengujian Kontruksi</strong>
    </CCardHeader>
    <CForm ref="form" @submit="insert">
      <CCardBody>
        <CSelect
          v-model="form.id_pemohon"
          horizontal
          description="Pilih Pemohon."
          label="Pemohon"
          required
          :options="daftarPemohon"
          :readonly="id?true:false"
          @update:value="updateSelectedPemohon"
        />
        <CInput
          v-show="id"
          :value="id"
          horizontal
          type="text"
          label="No Pemohonan Sementara"
          description="No Pemohonan Sementara."
          readonly
        />
        <CCard class="p-3">
          <CRow>
            <CCol v-for="(id_bahan_uji, key) in Object.keys(checkBoxPengujian)" :key="id_bahan_uji" md="6">
              <CCard class="p-3">
                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    {{ checkBoxPengujian[id_bahan_uji][0].nama_bahan }}
                  </CCol>
                  <CCol sm="9" class="">
                    <CRow>
                      <CCol
                        v-for="(option) in checkBoxPengujian[id_bahan_uji]"
                        :key="`${key}_${option.id}`"
                        md="12"
                      >
                        <CInputCheckbox
                          class="text-left"
                          :label="option.nama_pengujian"
                          custom
                          :name="option.value"
                          :checked="checked[option.value]"
                          @update:checked="updateChecked"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <!-- <CInput
                  :value="jumlahBahanUji[id_bahan_uji]"
                  horizontal
                  :name="id_bahan_uji+'bahan_uji'"
                  type="number"
                  label="Jumlah Bahan Uji"
                  description="Jumlah Bahan Uji."
                  required
                  @update:value="updateJumlahBahanUji"
                />
                <CSelect
                  horizontal
                  description="Metode pengujian."
                  label="Metode pengujian"
                  required
                  :name="id_bahan_uji"
                  :value="selectedMetodePengujian[id_bahan_uji]"
                  :options="metodePengujianFilter(id_bahan_uji)"
                  @update:value="updateSelected"
                /> -->
              </CCard>
            </CCol>
          </CRow>
        </CCard>
        <CInput
          v-model="form.lokasi_pengambilan_sampel"
          horizontal
          type="text"
          label="Lokasi Pengambilan Sampel"
          description="Lokasi Pengambilan Sampel."
          name="lokasi"
          required
        />
        <CInput
          v-model="form.tanggal_pengambilan_sampel"
          horizontal
          name="tanggal_pengambilan"
          type="date"
          label="Tanggal Pengambilan Sampel"
          description="Tanggal Pengambilan Sampel."
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
export default {
  layout: 'TheContainer',
  async asyncData ({ $axios, query }) {
    const { id } = query
    const namaPengujian = await $axios.get('/labkon/nama_pengujian')
    // const getMetodePengujian = await $axios.get('/labkon/metode_pengujian')
    // const metodePengujian = getMetodePengujian.data.data.metode_pengujian
    const checkBoxPengujian = namaPengujian.data.data.nama_pengujian.reduce((rv, x) => {
      (rv[x.id_bahan_uji] = rv[x.id_bahan_uji] || []).push({ nama_bahan: x.nama_bahan, nama_pengujian: x.nama_pengujian, id_bahan_uji: x.id_bahan_uji, id: x.id, value: `${x.id_bahan_uji}_${x.id}` })
      return rv
    }, {})
    const pemohon = await $axios.get('labkon/daftar_pemohon')
    let daftarPemohon = [{
      value: 0,
      label: 'Silahkan input data master pengujian'
    }]
    pemohon.data.daftar_pemohon.forEach((row) => {
      daftarPemohon.push({ value: row.id_pemohon, label: row.nama_penanggung_jawab })
    })
    let checked = []
    // let jumlahBahanUji = []
    // let selectedMetodePengujian = []
    let form = {}
    if (id) {
      const permohonan = await $axios.get('labkon/permohonan/show/' + id)
      const dataPermohonan = permohonan.data.data.permohonan
      checked = JSON.parse(dataPermohonan.bahan_uji)
      // jumlahBahanUji = JSON.parse(dataPermohonan.jumlah_bahan_uji)
      // selectedMetodePengujian = JSON.parse(dataPermohonan.metode_pengujian)
      daftarPemohon = daftarPemohon.filter(data => data.value === Number(dataPermohonan.id_pemohon))
      form = {
        lokasi_pengambilan_sampel: dataPermohonan.tanggal_pengambilan_sampel,
        latitude: dataPermohonan.latitude,
        longitude: dataPermohonan.longitude,
        id_pemohon: Number(dataPermohonan.id_pemohon),
        tanggal_pengambilan_sampel: dataPermohonan.tanggal_pengambilan_sampel
      }
    }
    return {
      checkBoxPengujian,
      checked,
      id,
      // metodePengujian,
      // jumlahBahanUji,
      // selectedMetodePengujian,
      daftarPemohon,
      form
    }
  },
  data () {
    return {
      nama_pengujian: [],
      checkedPengujian: []
    }
  },
  methods: {
    async  insert (e) {
      e.preventDefault()
      if (this.$refs.form.checkValidity()) {
      // const jumlahBahanUji = JSON.stringify(this.jumlahBahanUji)
      // const metodePengujian = JSON.stringify(this.selectedMetodePengujian)
        const bahanUji = JSON.stringify(this.checked)
        this.form = {
          ...this.form,
          bahan_uji: bahanUji
        // metode_pengujian: metodePengujian,
        // jumlah_bahan_uji: jumlahBahanUji
        }
        if (this.id) {
          const { data } = await this.$axios.put('labkon/permohonan/edit/' + this.id, this.form)
          if (data.status === 'success') {
            this.$router.push({ path: '/permohonan/list' })
            this.$store.commit('ui/set', [
              'flushMessage', {
                color: 'success',
                open: true,
                message: 'Berhasil memperbaharui data permohonan.'
              }
            ])
          }
        } else {
          const { data } = await this.$axios.post('labkon/permohonan/create', this.form)
          if (data.status === 'success') {
            this.$router.push({ path: '/permohonan/list' })
            this.$store.commit('ui/set', [
              'flushMessage', {
                color: 'success',
                open: true,
                message: 'Berhasil menambah data permohonan.'
              }
            ])
          }
        }
      }
    },
    updateChecked (value, event) {
      this.checked = {
        ...this.checked,
        [event.target.name]: value
      }
    },
    metodePengujianFilter (key) {
      const defaultValue = [{
        value: 0,
        label: 'Silahkan input data master pengujian'
      }]
      const bahanUji = this.checkBoxPengujian[key]
      if (bahanUji.length > 0) {
        const metodePengujianFilter = this.metodePengujian.filter(data => Number(data.id_bahan_uji) === Number(key))
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
    },
    updateSelected (value, event) {
      this.selectedMetodePengujian = {
        ...this.selectedMetodePengujian,
        [event.target.name]: value
      }
    },
    updateJumlahBahanUji (value, event) {
      this.jumlahBahanUji = {
        ...this.jumlahBahanUji,
        [event.target.name.replace('bahan_uji', '')]: value
      }
    },
    updateSelectedPemohon (value, event) {
      this.form.id_pemohon = value
    }
  }
}
</script>
