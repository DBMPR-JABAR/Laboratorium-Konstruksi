<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <LogoHitam class="img-fluid" width="50%" />
            <h1 class="title">
              Selamat Datang di UPTD Laboratorium Bahan Konstruksi
            </h1>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CRow v-if="semuaDataPermission.view">
      <!-- <CCol v-for="(chart, key) in chartData" :key="key" sm="6" lg="3">
        <CWidgetDropdown
          :style="{ backgroundColor: colorResolve(chart.color) }"
          :header="chart.header"
          :text="chart.text"
        > -->
      <!-- <template #default>
            <CDropdown
              color="transparent p-0"
              placement="bottom-end"
            >
              <template #toggler-content>
                <CIcon name="cil-settings" />
              </template>
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>
                Disabled action
              </CDropdownItem>
            </CDropdown>
          </template> -->
      <!-- <template #footer>
            <CChartBar
              :datasets="datasets(chart.datasets)"
              :options="options(chart.options)"
              :labels="chart.labels"
              class="mt-3 mx-3"
              style="height:100px"
              :color="colorResolve(chart.color)"
              :label="chart.label"
            />
          </template> -->
      <!-- </CWidgetDropdown>
      </CCol> -->
      <CCol v-for="(chart, key) in chartData" :key="key" sm="6" lg="3">
        <CCard>
          <CCardBody>
            <CCallout :style="{ borderLeftColor: colorResolve(chart.color) }">
              <CRow>
                <CCol col="9">
                  <small class="text-muted">{{ chart.text }}</small><br>
                  <strong class="h4">{{ chart.header }}</strong>
                </CCol>
                <CCol col="3">
                  <CIcon :style="{ color: colorResolve(chart.color) }" style="height:100%" name="cil-graph" />
                </CCol>
              </CRow>
            </CCallout>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { getColor, deepObjectsMerge } from '@coreui/utils/src'

export default {
  layout: 'TheContainer',
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('labkon/permohonan')
    const uptdListData = await $axios.get('uptd_list')
    const semuaDataPermissionData = await $axios.get('has_access/Semua Data Laboratorium Konstruksi')
    const semuaDataPermission = semuaDataPermissionData.data.data.permission

    const permohonan = data.data.permohonan

    const monthname = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
      'September', 'Oktober', 'November', 'Desember']

    const groupByMonth = permohonan.reduce((reduce, data) => {
      const m = data.created_at.split(('-'))[1];
      (reduce[m]) ? reduce[m].data.push(data) : reduce[m] = { month: monthname[Number(m) - 1], data: [data] }
      return reduce
    }, {})

    const result = Object.keys(groupByMonth).map((k) => { return groupByMonth[k] })

    const dataPoints = []
    monthname.forEach((data) => {
      const have = result.filter(data_ => data_.month === data)
      have.length === 0 ? dataPoints.push(0) : dataPoints.push(have[0].data.length)
    })

    const defaultOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }

    const getPermohonan = (uptdId) => {
      const id = String(uptdId).split('_')
      return result.map((resultData) => {
        return {
          month: resultData.month,
          data: uptdId === 'all'
            ? resultData.data
            : id.length > 1
              ? resultData.data.filter(permohonan => id.includes(String(permohonan.status)))
              : resultData.data.filter(permohonan => permohonan.uptd_id === Number(id[0]))
        }
      })
    }

    const getDataPoints = (uptdId) => {
      const dataPoints = []
      monthname.forEach((data) => {
        const have = getPermohonan(uptdId).filter(data_ => data_.month === data)
        have.length === 0 ? dataPoints.push(0) : dataPoints.push(have[0].data.length)
      })
      return dataPoints
    }

    const defaultData = {
      options: defaultOptions,
      labels: monthname,
      datasets: [{
        backgroundColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        label: 'Permohonan'
      }]
    }

    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

    const uptdList = uptdListData.data.uptd_list.map((data) => {
      return {
        id: data.id,
        nama: `Permohonan ${data.display_name}`,
        color: randomColor()
      }
    })

    const status = [{
      id: 'status_1',
      nama: 'Registration',
      color: '#ced2d8'
    }, {
      id: 'status_2',
      nama: 'Waiting List',
      color: '#f9b115'
    }, {
      id: 'status_3',
      nama: 'On Progress',
      color: '#3399ff'
    },
    {
      id: 'status_4_5_6',
      nama: 'Selesai',
      color: '#2eb85c'
    },
    {
      id: 'status_0',
      nama: 'Pending',
      color: '#e55353'
    }]

    const list = [{
      id: 'all',
      nama: 'Total Permohonan',
      color: randomColor()
    },
    ...status,
    ...uptdList,
    {
      id: null,
      nama: 'Permohonan External',
      color: randomColor()
    }]

    const chartData = []
    list.forEach((data) => {
      chartData.push({
        ...defaultData,
        color: data.color,
        text: data.nama,
        header: String(getDataPoints(data.id).reduce((a, b) => a + b, 0)),
        datasets: [{
          data: getDataPoints(data.id),
          backgroundColor: '#fff',
          pointHoverBackgroundColor: '#fff'
        }]
      })
    })

    return { chartData, semuaDataPermission }
  },
  data () {
    return {
    }
  },
  computed: {
    defaultOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    },
    computedOptions () {
      return deepObjectsMerge(this.defaultOptions, this.options || {})
    }
  },
  methods: {
    colorResolve (color) {
      return getColor(color)
    },
    datasets (datasets) {
      const remapColor = datasets.map((data) => {
        return {
          ...data,
          backgroundColor: this.colorResolve(data.backgroundColor),
          pointHoverBackgroundColor: this.colorResolve(data.pointHoverBackgroundColor)
        }
      })
      return deepObjectsMerge(remapColor, this.datasets || {})
    },
    options (options) {
      return deepObjectsMerge(options, this.options || {})
    }
  }
}
</script>
