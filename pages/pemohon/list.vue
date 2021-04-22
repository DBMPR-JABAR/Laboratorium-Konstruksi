<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-grid" /> Daftar Pemohon Internal
      </CCardHeader>
      <CCardBody>
        <CDataTable
          hover
          small
          fixed
          :items="getDaftarPemohon('internal')"
          :fields="fieldsInternal"
          :items-per-page="5"
          column-filter
          table-filter
          pagination
        >
          <template #ID_Pemohon="{ item }">
            <td>
              {{ item.id_pemohon }}
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
                  path: '/pemohon/edit/' + item.id_pemohon,
                  params: { slug: item.id_pemohon },
                  query: { type: 'internal' },
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
                      message: `Anda yakin akan menghapus data pemohon ${item.id_pemohon} ?`,
                      onClick: () => onDelete(item.id_pemohon),
                    },
                  ])
                "
              />
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-grid" /> Daftar Pemohon External
      </CCardHeader>
      <CCardBody>
        <CDataTable
          hover
          small
          fixed
          :items="getDaftarPemohon('masyarakat')"
          :fields="fieldsMasyarakat"
          :items-per-page="5"
          column-filter
          table-filter
          pagination
        >
          <template #status="{ item }">
            <td>
              <CBadge :color="status(item.status).color">
                {{ status(item.status).status }}
              </CBadge>
            </td>
          </template><template #UPTD="{ item }">
            <td>
              {{ item.uptd_id }}
            </td>
          </template>
          <template #aksi="{ item }">
            <td>
              <NuxtLink
                key="edit"
                :to="{
                  path: '/pemohon/edit/' + item.id_pemohon,
                  params: { slug: item.id_pemohon },
                  query: { type: 'masyarakat' },
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
                      message: `Anda yakin akan menghapus data pemohon ${item.id_pemohon} ?`,
                      onClick: () => onDelete(item.id_pemohon),
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
const fieldsInternal = [
  'ID_Pemohon',
  'nama_penanggung_jawab',
  'email_penanggung_jawab',
  'no_telp_penanggung_jawab',
  'nip',
  'UPTD',
  // 'status',
  'aksi'
]
const fieldsMasyarakat = [
  'ID_Pemohon',
  'nama_penanggung_jawab',
  'email_penanggung_jawab',
  'no_telp_penanggung_jawab',
  'nip',
  'nama_perusahaan',
  'email_perusahaan',
  'no_telp_perusahaan',
  // 'status',
  'aksi'
]
export default {
  layout: 'TheContainer',
  data () {
    return {
      dangerModal: false,
      fieldsInternal,
      fieldsMasyarakat,
      daftarPemohon: []
    }
  },
  created () {
    this.initDaftarPemohon()
  },
  methods: {
    fields (type) {
      return type === 'internal' ? fieldsInternal : fieldsMasyarakat
    },
    async initDaftarPemohon () {
      const { data } = await this.$axios.get('labkon/daftar_pemohon')
      this.daftarPemohon = []
      data.daftar_pemohon.forEach((row) => {
        this.daftarPemohon.push(row)
      })
      this.dataLoaded = true
      return this.daftarPemohon
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
    getDaftarPemohon (type) {
      return type === 'internal'
        ? this.daftarPemohon.filter(data => data.uptd_id != null)
        : this.daftarPemohon.filter(data => data.uptd_id == null)
    },
    async onDelete (id) {
      const { data } = await this.$axios.get(
        'labkon/daftar_pemohon/delete/' + id
      )
      if (data.status === 'success') {
        this.initDaftarPemohon()
        this.$store.commit('ui/set', [
          'flushMessage', {
            color: 'success',
            open: true,
            message: `Berhasil menghapus data pemohon ${id}.`
          }
        ])
      }
    }
  }
}
</script>
