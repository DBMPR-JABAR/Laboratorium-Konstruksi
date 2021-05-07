<template>
  <div>
    <CCard>
      <CCardBody>
        <NuxtLink
          to="/permohonan/insert"
        >
          <CButton type="button" size="sm" color="primary">
            <CIcon name="cil-plus" /> Tambah Permohonan
          </CButton>
        </NuxtLink>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-grid" /> Daftar Permohonan
      </CCardHeader>
      <CCardBody>
        <CDataTable
          hover
          small
          fixed
          :items="daftarPermohonan"
          :fields="fields"
          :items-per-page="10"
          column-filter
          table-filter
          pagination
        >
          <template #No_Permohonan="{ item }">
            <td>
              {{ item.id_permohonan.replaceAll('-','/') }}
            </td>
          </template>
          <template #nama="{ item }">
            <td>
              {{ item.nama_penanggung_jawab }}
            </td>
          </template>
          <template #email="{ item }">
            <td>
              {{ item.email_penanggung_jawab }}
            </td>
          </template>
          <template #no_telp="{ item }">
            <td>
              {{ item.no_telp_penanggung_jawab }}
            </td>
          </template>
          <template #status="{ item }">
            <td>
              <CBadge :color="status(item.status).color">
                {{ status(item.status).status }}
              </CBadge>
            </td>
          </template>
          <template #UPTD="{ item }">
            <td>
              {{ item.uptd_id }}
            </td>
          </template>
          <template #aksi="{ item }">
            <td>
              <CButtonGroup size="sm">
                <CButton
                  v-if="Number(item.status) === 1 || Number(item.status) === 0"
                  type="button"
                  color="info"
                  :to="{
                    path: '/permohonan/insert',
                    query: { id: item.id_permohonan }
                  }"
                >
                  <CIcon name="cil-pencil" />&nbsp;Edit
                </CButton>
                <CButton
                  v-if="Number(item.status) === 1 || Number(item.status) === 0"
                  color="warning"
                  class="text-white"
                  @click="uploadModal(item.id_permohonan)"
                >
                  <CIcon name="cil-arrow-thick-from-top" />&nbsp;Upload
                </CButton>

                <CButton
                  v-if="Number(item.status) === 2 && pengkajianPermission.update"
                  :to="'/permohonan/pengkajian_pengujian/'+item.id_permohonan"
                  color="warning"
                  class="text-white"
                >
                  <CIcon name="cil-zoom" />&nbsp;Pengkajian
                </CButton>
                <CButton
                  class="text-white"
                  color="success"
                  @click="riwayatModal(item.id_permohonan)"
                >
                  <CIcon name="cil-control" />&nbsp;Historis
                </CButton>
                <CButton
                  v-if="Number(item.status) === 3 && perubahanStatusPengujian.update"
                  color="warning"
                  :to="'/permohonan/status_proggress/'+item.id_permohonan"
                  class="text-white"
                >
                  <CIcon name="cil-loop-circular" />&nbsp;Status Progres
                </CButton>
                <CButton
                  v-if="Number(item.status) === 4"
                  :to="'/permohonan/quesioner/'+item.id_permohonan"
                  class="text-white"
                  color="info"
                >
                  <CIcon name="cil-clipboard" />&nbsp;Kuesioner
                </CButton>

                <CButton
                  v-if="Number(item.status) === 5 && perubahanStatusPengujian.update"
                  class="text-white"
                  color="warning"
                  @click="printFormulirPengaduan(item.id_permohonan)"
                >
                  <CIcon name="cil-note-add" />&nbsp;Pengaduan
                </CButton>
                <CButton
                  v-if="Number(item.status) === 5 && perubahanStatusPengujian.update"
                  class="text-white"
                  color="success"
                  @click="
                    $store.commit('ui/set', [
                      'modal',
                      {
                        color: 'success',
                        open: true,
                        title: 'Konfirmasi Selesai',
                        message: `Yakin tandai permohonan ${item.id_permohonan} sebagai selesai ?`,
                        onClick: () => setDone(item.id_permohonan),
                      },
                    ])
                  "
                >
                  <CIcon name="cil-check" />&nbsp;Selesai
                </CButton>
                <CButton
                  v-if="pengkajianPermission.update"
                  color="danger"
                  @click="
                    $store.commit('ui/set', [
                      'modal',
                      {
                        open: true,
                        title: 'Konfirmasi Hapus Data',
                        message: `Anda yakin akan menghapus data pemohon ${item.id_permohonan} ?`,
                        onClick: () => onDelete(item.id_permohonan),
                      },
                    ])
                  "
                >
                  <CIcon
                    name="cil-x-circle"
                  />&nbsp;Hapus
                </CButton>
              </CButtonGroup>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CModal
      title="Upload Dokumen Persyaratan"
      color="success"
      :show.sync="uploadModalIsOpen"
    >
      <CForm
        ref="formUploadModal"
      >
        <CInputFile
          ref="suratPermohonan"
          name="surat_permohonan"
          required
          label="Surat Permohonan"
          description="Upload surat permohonan atau surat pengantar dari UPTD/Perusahaan (PNG,JPG,JPEG)"
          horizontal
          custom
          accept="image/*"
          @change="updateSuratPermohonan"
        />
        <CInputFile
          ref="formulirPengujian"
          name="formulir_pengujian"
          required
          label="Formulir Pengujian"
          description="Upload Formulir Pengujian yang telah ditandatangani (PNG,JPG,JPEG)"
          horizontal
          custom
          accept="image/*"
          @change="updateFormulirPermohonan"
        />
      </CForm>
      <template #footer>
        <CButton
          type="button"
          size="sm"
          color="warning"
          @click="print()"
        >
          <CIcon
            name="cil-print"
            class="text-white"
          />
          <span class="text-white">Cetak Formulir Pengujian</span>
        </CButton>
        <CButton
          ref="upload_button"
          type="button"
          size="sm"
          color="success"
          @click="upload"
        >
          <CIcon
            name="cil-arrow-thick-top"
            class="text-white"
          />
          <span class="text-white">Upload</span>
        </CButton>
      </template>
    </CModal>

    <CModal
      size="xl"
      title="Riwayat Permohonan"
      color="success"
      :show.sync="riwayatModalIsOpen"
    >
      <ul class="timeline">
        <li v-for="(riwayat, key) in riwayatPermohonan" :key="key">
          <div :class="key % 2 === 0 ? 'direction-r' : 'direction-l'">
            <div class="flag-wrapper">
              <span :class="`hexa ${riwayatClass(riwayat.type_keterangan,riwayat.keterangan).hexa}`" />
              <span class="flag ">{{ riwayat.type_keterangan }}</span>
              <span class="time-wrapper "><span :class="`time ${riwayatClass(riwayat.type_keterangan,riwayat.keterangan).hexa}`">{{ printDate(riwayat.created_at) }}</span></span>
            </div>
            <div class="desc" v-html="riwayatDesc(riwayat.keterangan)" />
          </div>
        </li>
      </ul>
      <template #footer>
        <CButton
          type="button"
          class="btn btn-success"
          color="success"
          @click="{riwayatModalIsOpen = false}"
        >
          <span class="text-white">Ok</span>
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
const fields = [
  'No_Permohonan',
  'nama',
  'email',
  'no_telp',
  'nip',
  'status',
  'aksi'
]
export default {
  layout: 'TheContainer',
  async asyncData ({ $axios }) {
    const pengkajianPermissionData = await $axios.get('has_access/Pengkajian Pengujian')
    const pengkajianPermission = pengkajianPermissionData.data.data.permission
    const perubahanStatusPengujianData = await $axios.get('has_access/Perubahan Status Pengujian')
    const perubahanStatusPengujian = perubahanStatusPengujianData.data.data.permission

    return { pengkajianPermission, perubahanStatusPengujian }
  },
  data () {
    return {
      uploadModalIsOpen: false,
      riwayatModalIsOpen: false,
      fields,
      daftarPermohonan: [],
      suratPermohonan: null,
      formulirPermohonan: null,
      idPermohonan: '',
      accordion: 0,
      riwayatPermohonan: null
    }
  },
  created () {
    this.initDaftarPermohonan()
  },
  methods: {
    async initDaftarPermohonan () {
      const { data } = await this.$axios.get('labkon/permohonan')
      this.daftarPermohonan = []
      data.data.permohonan.forEach((row) => {
        this.daftarPermohonan.push(row)
      })
      this.dataLoaded = true
      return this.daftarPermohonan
    },
    status (status) {
      let className
      switch (Number(status)) {
        case 6:
          className = { status: 'Selesai', color: 'success' }
          break
        case 5:
          className = { status: 'Selesai', color: 'success' }
          break
        case 4:
          className = { status: 'Selesai', color: 'success' }
          break
        case 3:
          className = { status: 'On Proggress', color: 'primary' }
          break
        case 2:
          className = { status: 'Waiting List', color: 'warning' }
          break
        case 1:
          className = { status: 'Registration', color: 'secondary' }
          break
        default:
          className = { status: 'Pending', color: 'danger' }
          break
      }
      return className
    },
    async onDelete (id) {
      const { data } = await this.$axios.delete(
        'labkon/permohonan/delete/' + id
      )
      if (data.status === 'success') {
        this.initDaftarPermohonan()
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: `Berhasil menghapus data permohonan ${id}.`
          }
        ])
      } else {
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'danger',
            open: true,
            message: `Terjadi kesalahan saat menghapus data permohonan ${id}.`
          }
        ])
      }
    },
    uploadModal (idPermohonan) {
      this.idPermohonan = idPermohonan
      this.uploadModalIsOpen = true
    },
    async riwayatModal (idPermohonan) {
      const { data } = await this.$axios.get('labkon/permohonan/riwayat_permohonan/' + idPermohonan)
      this.riwayatPermohonan = data.data.riwayat_permohonan
      this.riwayatModalIsOpen = true
    },
    print () {
      const routeData = this.$router.resolve({ path: '/permohonan/formulir_pengujian/' + this.idPermohonan })
      window.open(routeData.href, '_blank')
    },
    printFormulirPengaduan (idPermohonan) {
      const routeData = this.$router.resolve({ path: '/permohonan/formulir_pengaduan/' + idPermohonan })
      window.open(routeData.href, '_blank')
    },
    async upload (e) {
      const submitButton = this.$refs.upload_button
      e.preventDefault()
      if (this.suratPermohonan === null) {
        this.$refs.formUploadModal.surat_permohonan.focus()
      }
      if (this.formulirPermohonan === null) {
        this.$refs.formUploadModal.formulir_pengujian.focus()
      }
      if (this.$refs.formUploadModal.checkValidity()) {
        submitButton.disabled = true
        const fd = new FormData()
        fd.append('surat_permohonan', this.suratPermohonan)
        fd.append('formulir_permohonan', this.formulirPermohonan)
        const { data } = await this.$axios.post('/labkon/permohonan/upload_dokumen_persyaratan_permohonan/' + this.idPermohonan, fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (data.status === 'success') {
          submitButton.disabled = true
          this.initDaftarPermohonan()
          this.uploadModalIsOpen = false
        } else {
          submitButton.disabled = false
        }
      }
    },
    updateSuratPermohonan (files, event) {
      if (files.length > 0) {
        this.suratPermohonan = files[0]
        event.target.labels[1].innerText = String(files[0].name).substring(0, 30)
      }
    },
    updateFormulirPermohonan (files, event) {
      if (files.length > 0) {
        this.formulirPermohonan = files[0]
        event.target.labels[1].innerText = String(files[0].name).substring(0, 30)
      }
    },
    printDate (d) {
      const date = new Date(d)
      return date.toLocaleDateString()
    },
    riwayatClass (type, keterangan) {
      let hexaClassName = 'success_hexa'
      let backgroudTimeClassName = 'success_bg_time'
      if (String(type).toLowerCase().includes('pengkajian permohonan')) {
        if (String(keterangan).toLowerCase().includes('menunda')) {
          hexaClassName = 'danger_hexa'
          backgroudTimeClassName = 'danger_bg_time'
        }
      }
      if (String(type).toLowerCase().includes('perubahan data permohonan') ||
      String(type).toLowerCase().includes('upload dokumen persyaratan permohonan') ||
      String(type).toLowerCase().includes('perubahan status proggress')) {
        hexaClassName = 'warning_hexa'
        backgroudTimeClassName = 'warning_bg_time'
      }
      return { hexa: hexaClassName, bg_time: backgroudTimeClassName }
    },
    riwayatDesc (keterangan) {
      if (keterangan) {
        const explode = keterangan.split(':')
        if (explode.length > 0) {
          let tmp = ''
          for (let i = 0; i < explode.length; i++) {
            i === 0 ? tmp += explode[i] : tmp += `<span class="${String(keterangan).toLowerCase().includes('menunda') ? 'text-danger' : 'text-success'}">${explode[i]}</span>`
          }
          return tmp
        }
        return keterangan
      } else { return '-' }
    },
    async setDone (idPermohonan) {
      const fd = new FormData()
      fd.append('status', 6)
      fd.append('type_keterangan', 'Selesai')
      fd.append('keterangan', 'Permohonan telah selesai')
      const { data } = await this.$axios.post('/labkon/permohonan/catatan_status_progress/' + idPermohonan, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (data.status === 'success') {
        this.initDaftarPermohonan()
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
<style scoped>
.hexa{
  border: 0px;
  float: left;
  text-align: center;
  height: 35px;
  width: 60px;
  font-size: 22px;
  background: #f0f0f0;
  color: #3c3c3c;
  position: relative;
  margin-top: 15px;
}

.hexa:before{
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 15px solid #f0f0f0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  top: -15px;
}

.hexa:after{
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 15px solid #f0f0f0;
  bottom: -15px;
}

.timeline {
  position: relative;
  padding: 0;
  width: 100%;
  max-width: 100%;
  margin-top: 20px;
  list-style-type: none;
}

.timeline:before {
  position: absolute;
  left: 50%;
  top: 0;
  content: ' ';
  display: block;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  background: rgb(213,213,213);
  background: -moz-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,87,153,1)), color-stop(100%,rgba(125,185,232,1)));
  background: -webkit-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -o-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -ms-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: linear-gradient(to bottom, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  z-index: 5;
}

.timeline li {
  padding: 1em 0;
}

.timeline .hexa {
  width: 16px;
  height: 10px;
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  margin-left:auto;
  margin-right:auto;
  top: -30px;
  margin-top: 0;

}

.timeline .hexa:before {
  border-left-width: 8px;
  border-right-width: 8px;
  top: -4px;
}

.timeline .hexa:after {
  border-left-width: 8px;
  border-right-width: 8px;
  bottom: -4px;
}

.timeline .success_hexa{
  background: #2eb85c;
}

.timeline .success_hexa:before {
  border-bottom: 4px solid #2eb85c;
}

.timeline .success_hexa::after {
   border-top: 4px solid #2eb85c;
}

.timeline .warning_hexa{
  background:  #f9b115
}

.timeline .warning_hexa:after {
   border-top: 4px solid #f9b115
}

.timeline .warning_hexa:before {
  border-bottom: 4px solid #f9b115
}
.timeline .danger_hexa{
  background:  red
}

.timeline .danger_hexa:after {
   border-top: 4px solid red
}

.timeline .danger_hexa:before {
  border-bottom: 4px solid red
}

.direction-l,
.direction-r {
  float: none;
  width: 100%;
  text-align: center;
}

.flag-wrapper {
  text-align: center;
  position: relative;
}

.flag {
  position: relative;
  display: inline;
  background: rgb(255,255,255);
  font-weight: 600;
  z-index: 15;
  padding: 6px 10px;
  text-align: left;
  border-radius: 5px;
}

.direction-l .flag:after,
.direction-r .flag:after {
  content: "";
  position: absolute;
  left: 50%;
  top: -15px;
  height: 0;
  width: 0;
  margin-left: -8px;
  border: solid transparent;
  border-bottom-color: rgb(255,255,255);
  border-width: 8px;
  pointer-events: none;
}

.direction-l .flag {
  -webkit-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
}

.direction-r .flag {
  -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
}

.time-wrapper {
  display: block;
  position: relative;
  margin: 4px 0 0 0;
  z-index: 14;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;
}

.direction-l .time-wrapper {
  float: none;
}

.direction-r .time-wrapper {
  float: none;
}

.time {
  display: inline-block;
  padding: 8px;
}

.success_bg_time {
  background: #2eb85c;
}

.warning_bg_time {
  background: #f9b115
}

.danger_bg_time {
  background: red;
}

.desc {
  position: relative;
  margin: 1em 0 0 0;
  padding: 1em;
  background: rgb(254,254,254);
  -webkit-box-shadow: 0 0 1px rgba(0,0,0,0.20);
  -moz-box-shadow: 0 0 1px rgba(0,0,0,0.20);
  box-shadow: 0 0 1px rgba(0,0,0,0.20);
  z-index: 15;
}

.direction-l .desc,
.direction-r .desc {
  position: relative;
  margin: 1em 1em 0 1em;
  padding: 1em;
  z-index: 15;
}

@media(min-width: 768px){
  .timeline {
    width: 660px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .timeline li:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .timeline .hexa {
    left: -28px;
    right: auto;
    top: 8px;
  }

  .timeline .direction-l .hexa {
    left: auto;
    right: -28px;
  }

  .direction-l {
    position: relative;
    width: 310px;
    float: left;
    text-align: right;
  }

  .direction-r {
    position: relative;
    width: 310px;
    float: right;
    text-align: left;
  }

  .flag-wrapper {
    display: inline-block;
  }

  .flag {
    font-size: 18px;
  }

  .direction-l .flag:after {
    left: auto;
    right: -16px;
    top: 50%;
    margin-top: -8px;
    border: solid transparent;
    border-left-color: rgb(254,254,254);
    border-width: 8px;
  }

  .direction-r .flag:after {
    top: 50%;
    margin-top: -8px;
    border: solid transparent;
    border-right-color: rgb(254,254,254);
    border-width: 8px;
    left: -8px;
  }

  .time-wrapper {
    display: inline;
    vertical-align: middle;
    margin: 0;
  }

  .direction-l .time-wrapper {
    float: left;
  }

  .direction-r .time-wrapper {
    float: right;
  }

  .time {
    padding: 5px 10px;
  }

  .direction-r .desc {
    margin: 1em 0 0 0.75em;
  }
}

@media(min-width: 992px){
  .timeline {
    width: 800px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .direction-l {
    position: relative;
    width: 380px;
    float: left;
    text-align: right;
  }

  .direction-r {
    position: relative;
    width: 380px;
    float: right;
    text-align: left;
  }
}
</style>
