<template>
  <CCard>
    <CCardHeader>
      <CIcon name="cil-grid" /> Daftar Pemohon
    </CCardHeader>
    <CCardBody>
      <CDataTable
        hover
        small
        fixed
        :items="getShuffledUsersData()"
        :fields="fields"
        items-per-page="5"
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
        </template>
        <template #aksi="{item}">
          <td>
            <NuxtLink :to="{path:'pemohon/edit',query: {id:item.id_pemohon}}">
              <CIcon name="cil-pencil" />
            </NuxtLink>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import usersData from './users'
export default {
  layout: 'TheContainer',
  data () {
    return {
      fields: ['nama_perusahaan', 'email_perusahaan', 'no_telp_perusahaan', 'nama_penanggung_jawab', 'email_penanggung_jawab', 'no_telp_penanggung_jawab', 'nip', 'status', 'aksi'],
      daftarPemohon: []
    }
  },
  created () {
    this.getDaftarPemohon()
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    async getDaftarPemohon () {
      const { data } = await this.$axios.get('labkon/daftar_pemohon')
      data.daftar_pemohon.forEach((row) => {
        this.daftarPemohon.push(row)
      })
      console.log(this.daftarPemohon)
      console.log(usersData)
      return this.daftarPemohon
    },
    getShuffledUsersData () {
      return this.shuffleArray(this.daftarPemohon)
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
    }
  }
}
</script>
