<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-grid" /> Daftar Permohonan Internal
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
                :to="{
                  path: '/permohonan/insert',
                  query: { id: item.id_permohonan }
                }"
              >
                <CIcon name="cil-pencil" />
              </NuxtLink>
              <CIcon
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
              />
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
const fields = [
  'No_Permohonan',
  'nama_penanggung_jawab',
  'email_penanggung_jawab',
  'no_telp_penanggung_jawab',
  'nip',
  'status',
  'aksi'
]
export default {
  layout: 'TheContainer',
  data () {
    return {
      dangerModal: false,
      fields,
      daftarPermohonan: []
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
    }
  }
}
</script>
