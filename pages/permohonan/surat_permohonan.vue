<template>
  <div id="surat_permohonan_labkon" class="page">
    <div class="row g-3">
      <div class="col-8" />
      <div class="col-4  mb-2 mt-0 d-flex justify-content-end">
        <table class="border">
          <tr class="border">
            <td class="border p-1">
              Tgl
            </td>
            <td class="border p-1">
              02020220
            </td>
          </tr>
          <tr>
            <td class="border p-1">
              No Permohonan
            </td>
            <td class="border p-1">
              IDJDSKADJSALJKL/DSADK
            </td>
          </tr>
        </table>
      </div>
      <div class="col-1" />
      <div class="col-10 judul text-center font-weight-bold">
        <p>FORMULIR PERMOHONAN PENGUJIAN</p>
        <p>UPTD LABLATORIUM KONTRUKSI</p>
        <p>DINAS BINA MARGA DAN PENATAAN RUANG PROVINSI JAWA BARAT</p>
      </div>
      <div class="col-1">
        <button id="cetak" type="button" class=" text-right" @click="print">
          CETAK
        </button>
      </div>
    </div>
    <div class="row ml-4">
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
              <input id="nama" name="nama" type="text" class="dotted" readonly>
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
              <input id="alamat" name="alamat" type="text" class="dotted" readonly>
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
              <input id="perusahaan" name="perusahaan" type="text" class="dotted" readonly>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <h5 class="row ml-4">
      Dengan ini memohon untuk dilakukan pengujian :
    </h5>
  </div>
</template>
<script>
export default {
  methods: {
    print () {
      window.print()
      // this.$htmlToPaper('surat_permohonan_labkon')
    }
  }
}
</script>
<style scoped>
        body {
            background: rgb(204, 204, 204);
            margin: 0;
            padding: 0;
            font-size: 10px !important
        }

        html {
            margin: 0;
            padding: 0;
            width: 21cm;
            height: 29.7cm;
            font-size: 8px;
        }

        .page {
            background: white;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
            padding: 1cm 1.5cm;
            width: 21cm;
            height: 29.7cm;
            size: 21cm 29.7cm;
        }

        @media print {
          body,
            .page {
                margin: 0;
                box-shadow: 0;
                width: 21cm;
                height: 29.7cm;
                size: 21cm 29.7cm;
            }

            #surat_permohonan_labkon {
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
            font-size: 12px
        }
</style>
