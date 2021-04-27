<template>
  <div id="formulir_pengujian_labkon" class="page">
    <div class="row g-3">
      <div class="col-8" />
      <div class="col-4  mb-2 mt-0 d-flex justify-content-end">
        <table class="border">
          <tr class="border">
            <td class="border p-1">
              Tgl
            </td>
            <td class="border p-1">
              {{ dateFormated }}
            </td>
          </tr>
          <tr>
            <td class="border p-1">
              No Permohonan
            </td>
            <td class="border p-1">
              {{ form.id_permohonan }}
            </td>
          </tr>
        </table>
      </div>
      <div class="col-1" />
      <div class="col-10 judul text-center font-weight-bold">
        <p>FORMULIR PERMOHONAN PENGUJIAN</p>
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
      <table id="table_judul" class=" col-12 pl-4">
        <h5>Pemohon :</h5>
        <tbody>
          <tr>
            <td style="width: 20%">
              Nama
            </td>
            <td style="width: 2%">
              :
            </td>
            <td>
              <input
                id="nama"
                name="nama"
                type="text"
                class="dotted"
                readonly
                :value="form.nama_penanggung_jawab || '-'"
              >
            </td>
            <td />
          </tr>
          <tr>
            <td>
              Alamat
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="alamat"
                name="alamat"
                type="text"
                class="dotted"
                :value="form.alamat_perusahaan || form.alamat_penanggung_jawab || '-'"
                readonly
              >
            </td>
          </tr>
          <tr>
            <td>
              Perusahaan
            </td>
            <td>
              :
            </td>
            <td>
              <input id="perusahaan" type="text" class="dotted" readonly :value="form.nama_perusahaan || '-'">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <h5 class="row">
      Dengan ini memohon untuk dilakukan pengujian :
    </h5>
    <div class="row">
      <div class="col-6">
        <table
          v-for="(bahan_uji, key) in bahanUjiFilterLeft"
          :key="key"
          class="table table-sm table-bordered border"
        >
          <thead v-if="bahan_uji[0]">
            <tr>
              <th colspan="2">
                {{ bahan_uji[0] ? bahan_uji[0].nama_bahan: '-' }}
              </th>
            </tr>
          </thead>
          <tbody v-if="bahan_uji[0]">
            <tr
              v-for="(option) in bahan_uji"
              :key="`${key}_${option.id}`"
              md="12"
            >
              <td :style="{ width: '10%' }">
                <input type="checkbox" checked readonly>
              </td>
              <td><span>{{ option.nama_pengujian }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <table
          v-for="(bahan_uji, key) in bahanUjiFilterRight"
          :key="key"
          class="table table-sm table-bordered"
        >
          <thead v-if="bahan_uji[0]">
            <tr>
              <th colspan="2">
                {{ bahan_uji[0] ? bahan_uji[0].nama_bahan: '-' }}
              </th>
            </tr>
          </thead>
          <tbody v-if="bahan_uji[0]">
            <tr
              v-for="(option) in bahan_uji"
              :key="`${key}_${option.id}`"
              md="12"
            >
              <td :style="{ width: '10%' }">
                <input type="checkbox" checked readonly>
              </td>
              <td><span>{{ option.nama_pengujian }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <table class=" col-7 pl-4">
        <tbody>
          <tr>
            <td style="width: 50%">
              Waktu Pengambilan Sampel
            </td>
            <td style="width: 2%">
              :
            </td>
            <td>
              <input
                id="waktu_pengambilan_sampel"
                :value="waktuPengambilanSampel"
                name="waktu_pengambilan_sampel"
                type="text"
                class="dotted"
                readonly
              >
            </td>
            <td />
          </tr>
          <tr>
            <td>
              Lokasi Pengambilan Sampel
            </td>
            <td>
              :
            </td>
            <td>
              <input
                id="lokasi_pengambilan_sampel"
                :value="form.lokasi_pengambilan_sampel"
                name="lokasi_pengambilan_sampel"
                type="text"
                class="dotted"
                readonly
              >
            </td>
          </tr>
          <tr>
            <td>
              Sampel Diterima
            </td>
            <td>
              :
            </td>
            <td>
              <input type="text" class="dotted" readonly>
            </td>
          </tr>
        </tbody>
      </table>
      <table id="table_judul" class=" col-12 pl-4">
        <tbody>
          <tr>
            <td>Kondisi Sampel :</td>
          </tr>
          <tr>
            <td>
              <input type="text" class="dotted" readonly>
              <input
                type="text"
                class="dotted"
                readonly
              >
              <p class="text-danger">
                Ket : Jika sampel selama tiga bulan tidak diambil maka akan kami musnahkan
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table id="table_judul" class="mt-2 col-12 pl-4 text-center align-center">
        <tbody>
          <tr>
            <th style="width: 50%">
              Petugas Penerima Sampel
            </th>
            <th style="width: 50%">
              Pemohon
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
                class="col-5 dotted"
                type="text"
                readonly
              >)
            </th>
            <th style="width: 50%">
              (<input
                pos="center"
                class="col-5 dotted"
                type="text"
                readonly
                :value="form.nama_penanggung_jawab"
              >)
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios, query }) {
    const { id } = query
    const { data } = await $axios.get('/labkon/permohonan/cetak_formulir_data/' + id)
    console.log(data)
    const form = data.data.permohonan
    const date = new Date(form.created_at)
    const dateFormated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const namaPengujian = await $axios.get('/labkon/nama_pengujian')
    const checkBoxPengujian = namaPengujian.data.data.nama_pengujian.reduce((rv, x) => {
      (rv[x.id_bahan_uji] = rv[x.id_bahan_uji] || []).push({ nama_bahan: x.nama_bahan, nama_pengujian: x.nama_pengujian, id_bahan_uji: x.id_bahan_uji, id: x.id, value: `${x.id_bahan_uji}_${x.id}` })
      return rv
    }, {})

    const checked = JSON.parse(form.bahan_uji)

    const titleBahanUji = Object.keys(checkBoxPengujian)
    const bahanUjiMap = []
    titleBahanUji.forEach((id) => {
      bahanUjiMap.push(checkBoxPengujian[id])
    })
    const bahanUjiFilter = bahanUjiMap.map((data) => {
      return data.filter(bahan => checked[bahan.value] === true)
    }).sort((a, b) => a.length > b.length ? -1 : 1)

    const bahanUjiFilterLeft = bahanUjiFilter.filter((data, key) => {
      return key % 2 === 0
    })

    const bahanUjiFilterRight = bahanUjiFilter.filter((data, key) => {
      return key % 2 === 1
    })

    console.log(bahanUjiFilterLeft, bahanUjiFilterRight)
    console.log(bahanUjiFilter)
    return { form, dateFormated, checked, checkBoxPengujian, bahanUjiFilter, bahanUjiFilterLeft, bahanUjiFilterRight }
  },
  computed: {
    waktuPengambilanSampel () {
      const date = new Date(this.form.tanggal_pengambilan_sampel)
      const dateFormated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      return dateFormated
    }
  },
  methods: {
    print () {
      window.print()
      // this.$htmlToPaper('formulir_pengujian_labkon')
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
            size: 21cm 29.7cm;
        }

        @media print {
          html,body,
            .page {
                margin: 0;
                box-shadow: 0;
                width: 21cm;
                height: 29.7cm;
                size: 21cm 29.7cm;
            }

            #formulir_pengujian_labkon {
              width: 100%;
            }

            #cetak {
                display: none
            }
        }

        input[pos='center'] {
            text-align: center;
        }

        #logo {
            height: 3cm;
        }

        .judul {
            text-align: right;
        }

        .judul p {
            font-size: 12px;
            font-weight: 500;
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
