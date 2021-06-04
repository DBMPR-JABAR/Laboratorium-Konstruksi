<template>
  <CCard>
    <CCardHeader>
      <strong>Panduan Pendaftaran Pengujian Laboratorium Bahan Konstruksi</strong>
    </CCardHeader>
    <CCardBody>
      <LinGallery :iid.sync="currentId" width="100%" :items="items" />
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  layout: 'TheContainer',
  data () {
    return {
      height: 400,
      items: [
        {
          src: 'img/dokumentasi/1_klik_daftar_pemohon.png',
          thumbnail: 'img/dokumentasi/1_klik_daftar_pemohon.png',
          caption: '1. Kunjungi halaman daftar pemohon pada navigasi bar.'
        },
        {
          src: 'img/dokumentasi/2_klik_tambah_pemohon.png',
          thumbnail: 'img/dokumentasi/2_klik_tambah_pemohon.png',
          caption: '2. Klik tambah pemohon untuk membuat data pemohon baru.'
        },
        {
          src: 'img/dokumentasi/3_form_pemohon.png',
          thumbnail: 'img/dokumentasi/3_form_pemohon.png',
          caption: '3. Isi semua data yang diminta dan simpan dengan klik tombol submit di bawah form.'
        },
        {
          src: 'img/dokumentasi/4_daftar_pemohon.png',
          thumbnail: 'img/dokumentasi/4_daftar_pemohon.png',
          caption: '4. Pastikan data pemohon telah masuk dalam daftar pemohon.'
        },
        {
          src: 'img/dokumentasi/5_klik_daftar_permohonan.png',
          thumbnail: 'img/dokumentasi/5_klik_daftar_permohonan.png',
          caption: '5. Kunjungi halaman daftar permohonan pada navigasi bar.'
        },
        {
          src: 'img/dokumentasi/6_klik_tambah_permohonan.png',
          thumbnail: 'img/dokumentasi/6_klik_tambah_permohonan.png',
          caption: '6. Klik tambah permohonan untuk membuat data permohonan baru.'
        },
        {
          src: 'img/dokumentasi/7_form_permohonan.png',
          thumbnail: 'img/dokumentasi/7_form_permohonan.png',
          caption: '7. Pilih pemohon dari daftar pemohon, jenis pengujian (jika tidak ada dalam daftar anda bisa request pengujian dengan menambahkannya pada form yang disediakan), lengkapi semua form dan simpan dengan klik tombol submit.'
        },
        {
          src: 'img/dokumentasi/8_daftar_permohonan.png',
          thumbnail: 'img/dokumentasi/8_daftar_permohonan.png',
          caption: '8. Upload surat dan formulir permohonan dengan klik tombol Upload pada daftar permohonan yang dibuat.'
        },
        {
          src: 'img/dokumentasi/9_modal_cetak_formulir_permohonan.png',
          thumbnail: 'img/dokumentasi/9_modal_cetak_formulir_permohonan.png',
          caption: '9. Klik formulir permohonan dan akan membuka halaman baru untuk mencetak formulir hasil generate dari form permohonan sebelumnya.'
        },
        {
          src: 'img/dokumentasi/10_hasil_cetak_formulir_permohonan.png',
          thumbnail: 'img/dokumentasi/10_hasil_cetak_formulir_permohonan.png',
          caption: '10. Cetak formulir permohonan dan tandatangani lalu scan dengan format image (Termasuk surat permohonan)'
        },
        {
          src: 'img/dokumentasi/11_upload_dokumen_persyaratan.png',
          thumbnail: 'img/dokumentasi/11_upload_dokumen_persyaratan.png',
          caption: '11. Upload surat dan formulir permohonan dengan memilih pada form tersedia dan klik upload'
        },
        {
          src: 'img/dokumentasi/12_waiting_list.png',
          thumbnail: 'img/dokumentasi/12_waiting_list.png',
          caption: '12. Anda telah berhasil mengajukan permohonan pengujian, jika persyaratan anda memenuhi syarat maka status pengujian akan berubah menjadi on progres, dan jika terjadi penolakan, anda dapat mengulang permohonan dari step 7 (anda dapat merubah data permohonan dengan klik tombol edit) dan melakukan upload ulang persyaratan.'
        },
        {
          src: 'img/dokumentasi/13_semi_selesai.png',
          thumbnail: 'img/dokumentasi/13_semi_selesai.png',
          caption: '13. Anda dapat melihat status progres dengan mengklik historis, jika pengujian telah selesai, pihak kami akan menghubungi anda untuk pengambilan hasil uji dan sisa material sampel'
        }
      ],
      currentId: null
    }
  }
}
</script>
