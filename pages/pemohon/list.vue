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
          <template #status="{item}">
            <td>
              <CBadge :color="status(item.status).color">
                {{ status(item.status).status }}
              </CBadge>
            </td>
          </template><template #UPTD="{item}">
            <td>
              {{ item.uptd_id }}
            </td>
          </template>
          <template #aksi="{item}">
            <td>
              <NuxtLink :to="{path:'/pemohon/edit/'+item.id_pemohon,params: {slug:item.id_pemohon}}">
                <CIcon name="cil-pencil" />
              </NuxtLink>
            </td>
            <td>
              <NuxtLink :to="{path:'/pemohon/edit/'+item.id_pemohon,params: {slug:item.id_pemohon}}">
                <CIcon name="cis-trash" />
              </NuxtLink>
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
          <template #status="{item}">
            <td>
              <CBadge :color="status(item.status).color">
                {{ status(item.status).status }}
              </CBadge>
            </td>
          </template><template #UPTD="{item}">
            <td>
              {{ item.uptd_id }}
            </td>
          </template>
          <template #aksi="{item}">
            <td>
              <NuxtLink :to="{path:'/pemohon/edit/'+item.id_pemohon,params: {slug:item.id_pemohon}}">
                <CIcon name="cil-pencil" />
              </NuxtLink>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
const fieldsInternal = ['nama_penanggung_jawab', 'email_penanggung_jawab', 'no_telp_penanggung_jawab', 'nip', 'UPTD', 'status', 'aksi']
const fieldsMasyarakat = ['nama_penanggung_jawab', 'email_penanggung_jawab', 'no_telp_penanggung_jawab', 'nip', 'nama_perusahaan', 'email_perusahaan', 'no_telp_perusahaan', 'status', 'aksi']
export default {
  layout: 'TheContainer',
  data () {
    return {
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
      console.log(this.$auth.user)
      data.daftar_pemohon.forEach((row) => {
        this.daftarPemohon.push(row)
      })
      return this.daftarPemohon
    },
    status (status) {
      let className
      switch (Number(status)) {
        case 3 : className = { status: 'Selesai', color: 'success' }; break
        case 2 : className = { status: 'On Proggress', color: 'primary' }; break
        case 1 : className = { status: 'Waiting List', color: 'warning' }; break
        default : className = { status: 'Belum Divalidasi', color: 'secondary' }; break
      }
      return className
    },
    getDaftarPemohon (type) {
      return type === 'internal' ? this.daftarPemohon.filter(data => data.uptd_id != null) : this.daftarPemohon.filter(data => data.uptd_id == null)
    }
  }
}
</script>
