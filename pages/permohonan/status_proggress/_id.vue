<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Form Proggress Status Pengujian Bahan Kontruksi</strong>
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
          <CSelect
            :value="form.status"
            name="status"
            horizontal
            description="Pilih status pengujian."
            label="Status Pengujian"
            required
            :options="[{label: 'On Proggress', value: 3}, {label:'Selesai', value: 4}]"
            @update:value="updateForm"
          />
          <CTextarea
            v-model="form.keterangan"
            label="Kendala"
            placeholder="Kendala..."
            horizontal
            rows="5"
          />
        </CCardBody>
        <CCardFooter>
          <CButton type="button" size="sm" color="success" @click="onUpdate">
            <CIcon name="cil-check-circle" /> Update
          </CButton>
          <CButton type="button" size="sm" color="secondary" @click="$router.go(-1)">
            <CIcon name="cil-ban" /> Batal
          </CButton>
        </CCardFooter>
      </CForm>
    </CCard>
  </div>
</template>
<script>
export default {
  layout: 'TheContainer',
  async asyncData ({ $axios, params }) {
    const { id } = params
    const { data } = await $axios.get('/labkon/permohonan/catatan_status_progress_last/' + id)
    console.log(data.data.last_status)
    let form = {}
    if (data.data.last_status.type_keterangan === 'Perubahan Status Proggress') {
      form = {
        type_keterangan: 'Perubahan Status Proggress',
        keterangan: data.data.last_status.keterangan,
        status: 3
      }
    } else {
      form = {
        type_keterangan: 'Perubahan Status Proggress',
        status: 3
      }
    }
    return { id, form }
  },
  data () {
    return {
    }
  },
  methods: {
    updateForm (value, event) {
      this.form = {
        ...this.form,
        [event.target.name]: value
      }
    },
    async onUpdate () {
      if (this.form.status === 4) { this.form = { ...this.form, type_keterangan: 'Selesai' } }
      const { data } = await this.$axios.post('/labkon/permohonan/catatan_status_progress/' + this.id, this.form)
      if (data.status === 'success') {
        this.$router.push({ path: '/permohonan/list' })
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Berhasil melakukan perubahan status proggress permohonan.'
          }
        ])
      }
    }
  }
}
</script>
