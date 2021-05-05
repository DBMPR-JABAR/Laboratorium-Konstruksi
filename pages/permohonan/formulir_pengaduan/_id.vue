<template>
  <div id="formulir_pengujian_labkon" class="page">
    <div class="row g-3">
      <div class="col-2 p-0">
        <LogoSquare class="float-right" :height="65" />
      </div>
      <div class="col-9 judul text-center font-weight-bold">
        <p>FORMULIR PENGADUAN PENGUJIAN SAMPEL LABORATORIUM </p>
        <p>UPTD LABORATORIUM BAHAN KONTRUKSI</p>
        <p>DINAS BINA MARGA DAN PENATAAN RUANG PROVINSI JAWA BARAT</p>
      </div>
      <div class="col-1">
        <button id="cetak" type="button" class=" text-right" @click="print">
          CETAK
        </button>
      </div>
    </div>
    <div class="row">
      <hr class="col-12">
      <p class="col-12 mb-2">
        Pada hari ini, {{ form.date.weekday }} tanggal {{ form.date.date }} bulan {{ form.date.monthname }}, tahun {{ form.date.year }}.
      </p>
      <p class="col-12">
        Kami yang bertanda tangan dibawah ini:
      </p>
      <table class="col-12 p-4">
        <tbody>
          <tr>
            <td style="width: 20%" class="pl-5">
              Nama
            </td>
            <td style="width: 2%">
              :
            </td>
            <td>
              <input
                id="nama"
                v-model="form.nama_penanggung_jawab"
                name="nama"
                type="text"
                class="dotted"
              >
            </td>
            <td />
          </tr>
          <tr>
            <td class="pl-5">
              Alamat
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="alamat"
                v-model="form.alamat_penanggung_jawab"
                name="alamat"
                type="text"
                class="dotted"
              >
            </td>
          </tr>
          <tr>
            <td class="pl-5">
              Jabatan
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="jabatan"
                v-model="form.jabatan"
                type="text"
                class="dotted"
              >
            </td>
          </tr>
        </tbody>
      </table>
      <p class="col-12 pt-2">
        Selanjutnya disebut <b>PIHAK PERTAMA</b>
      </p><table class="col-12 p-4">
        <tbody>
          <tr>
            <td style="width: 20%" class="pl-5">
              Nama
            </td>
            <td style="width: 2%">
              :
            </td>
            <td>
              <input
                id="nama_pihak_kedua"
                v-model="form.nama_pihak_kedua"
                name="nama"
                type="text"
                class="dotted"
              >
            </td>
            <td />
          </tr>
          <tr>
            <td class="pl-5">
              Alamat
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="alamat_pihak_kedua"
                v-model="form.alamat_pihak_kedua"
                name="alamat"
                type="text"
                class="dotted"
              >
            </td>
          </tr>
          <tr>
            <td class="pl-5">
              Jabatan
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="jabatan_pihak_kedua"
                v-model="form.jabatan_pihak_kedua"
                type="text"
                class="dotted"
              >
            </td>
          </tr>
        </tbody>
      </table>
      <p class="col-12 pt-2">
        Selanjutnya disebut <b>PIHAK KEDUA</b>
      </p>
      <p class="col-12">
        PIHAK PERTAMA menyerahkan pengaduan beserta berkas kepada PIHAK KEDUA, dan PIHAK KEDUA menyatakan telah menerima pengaduan dari PIHAK PERTAMA sebagai berikut:
      </p>
      <table class="col-12 table table-bordered">
        <tr>
          <td colspan="5">
            <p>Keluhan :</p>
            <textarea v-model="form.keluhan" rows="3" style="border:none; width:100%" />
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <p>Tindak Lanjut :</p>
            <textarea v-model="form.tindak_lanjut" rows="3" style="border:none; width:100%" />
          </td>
        </tr>
      </table>
      <p class="col-12">
        Demikianlah berita acara serah terima berkas pengaduan ini diperbuat oleh kedua belah pihak, sejak penandatanganan berita acara ini, maka berkas pengaduan tersebut, menjadi tanggung jawab PIHAK KEDUA untuk ditindaklanjuti.
      </p>
    </div>
    <br>
    <table class="mt-2 col-12 pl-4 text-center align-center">
      <tbody>
        <tr>
          <th style="width: 50%">
            <small>Yang Menerima,</small>
            <p>Pihak Pertama</p>
          </th>
          <th style="width: 50%">
            <small>Yang Menyerahkan,</small>
            <p>Pihak Kedua</p>
          </th>
        </tr>
        <tr>
          <th colspan="4" style="width: 50%">
            <br> <br>
          </th>
          <th colspan="4" style="width: 50%">
            <br> <br>
          </th>
        </tr>
        <tr>
          <th style="width: 50%">
            (<input
              v-model="form.nama_penanggung_jawab"
              class="col-5 dotted text-center"
              type="text"
            >)
          </th>
          <th style="width: 50%">
            (<input
              v-model="form.nama_pihak_kedua"
              pos="center"
              class="col-5 dotted text-center"
              type="text"
            >)
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios, params }) {
    const { id } = params
    const exitsData = await $axios.get('/labkon/permohonan/formulir_pengaduan_data_exits/' + id)
    let form
    let exits = false
    if (exitsData.data.data.pengaduan) {
      if (exitsData.data.data.pengaduan.json) {
        form = JSON.parse(exitsData.data.data.pengaduan.json)
        exits = true
      }
    } else {
      const { data } = await $axios.get('/labkon/permohonan/cetak_formulir_data/' + id)
      const d = new Date()
      const weekday = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis',
        'Jumat', 'Sabtu']
      const monthname = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember']
      const date = {
        weekday: weekday[d.getDay()],
        date: d.getDate(),
        monthname: monthname[d.getMonth()],
        year: d.getFullYear()
      }
      form = data.data.permohonan
      form.date = date
    }

    const perubahanStatusPengujianData = await $axios.get('has_access/Perubahan Status Pengujian')
    const perubahanStatusPengujian = perubahanStatusPengujianData.data.data.permission
    return { form, perubahanStatusPengujian, exits }
  },
  computed: {
    waktuPengambilanSampel () {
      const date = new Date(this.form.tanggal_pengambilan_sampel)
      const dateFormated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      return dateFormated
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
    print () {
      window.print()
      // this.$htmlToPaper('formulir_pengujian_labkon')
      this.savePrintData()
    },
    async savePrintData () {
      const fd = new FormData()
      fd.append('status', 6)
      fd.append('type_keterangan', 'Cetak Formulir Pengaduan')
      fd.append('keterangan', this.exits ? 'Memperbaharui dan mencetak formulir pengaduan' : 'Mencetak formulir pengaduan')
      fd.append('json', JSON.stringify(this.form))
      await this.$axios.post('/labkon/permohonan/catatan_status_progress/' + this.form.id_permohonan, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
</script>
<style scoped>
        body {
            background: rgb(204, 204, 204);
            margin: 0;
            padding: 0;
            font-size: 15px !important
        }

        html {
            margin: 0;
            padding: 0;
            width: 21cm;
            font-size: 15px;
        }

        .page {
            background: white;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
            padding: 1cm 1.5cm;
            width: 21cm;
            size: 21cm 33cm;
        }

        @media print {
          html,body,
            .page {
                margin: 0;
                box-shadow: 0;
                width: 21cm;
                height: 33cm;
                size: 21cm 33cm;
            }

            #formulir_pengujian_labkon {
              width: 100%;
            }

            #cetak {
                display: none
            }
        }

        #logo {
            height: 3cm;
        }

        .judul {
            text-align: right;
        }

        .judul p {
            font-size: 14px;
            font-weight: bolder;
            margin-bottom: 1.5px
        }

        .form-group .row {
            margin-bottom: 0;
            padding-bottom: 0
        }

        .no_right_pad {
            padding-right: 0;
            padding-left: 0
        }

        .hal_ {
            margin: 0;
            padding: 3px 0 5px 0
        }

        .form-group {
            margin-top: 0
        }

        .colon {
            text-align: right;
            margin: 0;
            padding: 0
        }

        label {
            height: 0;
        }

        input {
            height: 15px;
            width: 100%
        }

        .dotted {
            border: 0;
            border-bottom: 1px dotted;
        }

        .border {
            border-color: black
        }

        .no_border {
            border: none !important
        }

        #table_judul {
            border: none;
            /* font-size: 7px */
        }

        table {
            font-size: 15px
        }

        .border {
            border-color: black
        }

        .no_border {
            border: none !important
        }
</style>
