<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Kuisioner Kepuasan Pelanggan Pengujian Bahan Kontruksi</strong>
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
          <CRow v-for="(question, key) in form.questions" :key="key" form class="form-group">
            <CCol tag="label" sm="3" class="col-form-label">
              {{ question.pertanyaan }}
            </CCol>
            <CCol sm="9" class="">
              <CRow>
                <CCol
                  md="12"
                >
                  <b-form-rating
                    v-model="form.questions[key].value"
                    show-value
                    show-value-max
                    variant="warning"
                    class="mb-2"
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CTextarea
            v-model="form.saran"
            label="Saran Pelanggan Untuk Meningkatkan Kualitas Pelayanan Kami"
            placeholder="Saran..."
            horizontal
            rows="5"
          />
          <CTextarea
            v-model="form.keluhan"
            label="Keluhan Pelanggan"
            placeholder="Keluhan..."
            horizontal
            rows="5"
          />
        </CCardBody>
        <CCardFooter>
          <CButton type="button" size="sm" color="success" @click="onSubmit">
            <CIcon name="cil-check-circle" /> Submit
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
  asyncData ({ params }) {
    const { id } = params
    return { id }
  },
  data () {
    return {
      form: {
        saran: '',
        keluhan: '',
        questions: [
          {
            pertanyaan: 'Pelayanan Pendaftaran Pengujian Sampel',
            value: 0
          },
          {
            pertanyaan: 'Cara / Teknik Penimbangan Sampel Oleh Petugas',
            value: 0
          },
          {
            pertanyaan: 'Ruang Tunggu Yang Disediakan',
            value: 0
          },
          {
            pertanyaan: 'Kesiapan Petugas Melayani Pelanggan',
            value: 0
          },
          {
            pertanyaan: 'Petugas Bersifat Ramah dan Sopan',
            value: 0
          },
          {
            pertanyaan: 'Petugas Memberi Informasi Yang Jelas dan Mudah dimengerti oleh pelanggan',
            value: 0
          },
          {
            pertanyaan: 'Petugas Melayani keluhan Pelanggan dan Memberi Solusi Dalam Konsultasi',
            value: 0
          },
          {
            pertanyaan: 'Sarana Prasarana Pengujian Memadai Untuk Kebutuhan Pengujian Pelanggan',
            value: 0
          },
          {
            pertanyaan: 'Pengujian Laboratorium dapat dilaksanakan Tepat Waktu',
            value: 0
          },
          {
            pertanyaan: 'Petugas Memberikan Pelayan Sesuai dengan Kebutuhan Pelanggan',
            value: 0
          },
          {
            pertanyaan: 'Petugas Memberikan Informasi lengkap Sebelum Pelayanan Diberikan',
            value: 0
          },
          {
            pertanyaan: 'Kualitas Pelayanan Secara Keseluruhan Dalam Menunjang dalam Aktivitas Pengujian Sampel',
            value: 0
          },
          {
            pertanyaan: 'Kerahasiaan Informasi antara Petugas dan Pelanggan',
            value: 0
          },
          {
            pertanyaan: 'Proses Pengujian Berjalan Sebagaimana Waktu Yang Telah Di Tentukan',
            value: 0
          },
          {
            pertanyaan: 'Laporan Hasil Uji Tersusun Rapi dan dapat Dimengerti Pelanggan',
            value: 0
          }
        ]
      }
    }
  },
  methods: {
    updateForm (value, event) {
      this.form = {
        ...this.form,
        [event.target.name]: value
      }
    },
    async onSubmit () {
      const fd = new FormData()
      fd.append('saran', this.form.saran)
      fd.append('keluhan', this.form.keluhan)
      fd.append('questions', JSON.stringify(this.form.questions))
      const { data } = await this.$axios.post('/labkon/permohonan/create_questioner/' + this.id, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (data.status === 'success') {
        this.$router.push({ path: '/permohonan/list' })
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: 'Berhasil mengisi kuesioner.'
          }
        ])
      }
    }
  }
}
</script>
