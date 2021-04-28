<template>
  <div>
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
          :items-per-page="5"
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
          <template #nomor_telpon="{ item }">
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
              <NuxtLink
                v-show="Number(item.status) === 1 || Number(item.status) === 0"
                :to="{
                  path: '/permohonan/insert',
                  query: { id: item.id_permohonan }
                }"
              >
                <CIcon name="cil-pencil" />
              </NuxtLink>
              <!-- <CIcon
                name="cil-x-circle"
                class="text-danger"
                @click.native="
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
              /> -->
              <CIcon
                v-show="Number(item.status) === 1 || Number(item.status) === 0"
                name="cil-arrow-thick-from-top"
                class="text-warning"
                @click.native="uploadModal(item.id_permohonan)"
              />
              <NuxtLink
                v-show="Number(item.status) === 2"
                :to="'/permohonan/pengkajian_pengujian/'+item.id_permohonan"
              >
                <CIcon name="cil-zoom" class="text-success" />
              </NuxtLink>
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
      <CInputFile
        ref="suratPermohonan"
        label="Surat Permohonan"
        description="Upload surat permohonan atau surat pengantar dari UPTD/Perusahaan (PNG,JPG,JPEG)"
        horizontal
        custom
        accept="image/*"
        @change="updateSuratPermohonan"
      />
      <CInputFile
        ref="formulirPengujian"
        label="Formulir Pengujian"
        description="Upload Formulir Pengujian yang telah ditandatangani (PNG,JPG,JPEG)"
        horizontal
        custom
        accept="image/*"
        @change="updateFormulirPermohonan"
      />

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
          type="button"
          size="sm"
          color="success"
          @click="upload()"
        >
          <CIcon
            name="cil-arrow-thick-top"
            class="text-white"
          />
          <span class="text-white">Upload</span>
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
  data () {
    return {
      uploadModalIsOpen: false,
      fields,
      daftarPermohonan: [],
      suratPermohonan: null,
      formulirPermohonan: null,
      idPermohonan: ''
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
      }
    },
    uploadModal (idPermohonan) {
      this.idPermohonan = idPermohonan
      this.uploadModalIsOpen = true
    },
    print () {
      this.$router.push({ path: '/permohonan/formulir_pengujian/', query: { id: this.idPermohonan } })
    },
    async  upload () {
      const fd = new FormData()
      fd.append('surat_permohonan', this.suratPermohonan)
      fd.append('formulir_permohonan', this.formulirPermohonan)
      const { data } = await this.$axios.post('/labkon/permohonan/upload_dokumen_persyaratan_permohonan/' + this.idPermohonan, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data)
      if (data.status === 'success') {
        this.uploadModalIsOpen = false
        this.initDaftarPermohonan()
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
    }
  }
}
</script>
