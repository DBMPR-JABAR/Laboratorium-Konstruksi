<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Form Status Progres  Pengujian Bahan Kontruksi</strong>
      </CCardHeader>
      <CForm ref="form" @submit="onUpdate">
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
          <CButton type="submit" name="submit" size="sm" color="success">
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

    const perubahanStatusPengujianData = await $axios.get('has_access/Perubahan Status Pengujian')
    const perubahanStatusPengujian = perubahanStatusPengujianData.data.data.permission
    return { id, form, perubahanStatusPengujian }
  },
  data () {
    return {
    }
  },
  beforeMount () {
    if (this.perubahanStatusPengujian.update === false) {
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
    updateForm (value, event) {
      this.form = {
        ...this.form,
        [event.target.name]: value
      }
    },
    async onUpdate (e) {
      e.preventDefault()
      const submitButton = e.target.elements.submit
      if (this.$refs.form.checkValidity()) {
        submitButton.disabled = true
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
        } else {
          this.$store.commit('ui/set', [
            'flushMessage', {
              color: 'danger',
              open: true,
              message: 'Terjadi kesalahan saat melakukan perubahan status proggress permohonan.'
            }
          ])
        }
      }
    }
  }
}
</script>
