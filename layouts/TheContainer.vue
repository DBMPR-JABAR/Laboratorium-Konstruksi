<template>
  <div class="c-app">
    <v-tour name="myTour" :steps="steps" />
    <TheSidebar />
    <client-only>
      <CWrapper>
        <TheHeader />
        <div class="c-body">
          <main class="c-main">
            <CContainer fluid>
              <CAlert
                :show="flushMesage().open"
                close-button
                :color="flushMesage().color"
                fade
                @update:show="flushMesageEvent"
              >
                {{ flushMesage().message }}
              </CAlert>
              <transition name="fade" mode="out-in">
                <Nuxt />
              </transition>
              <CModal
                :title="showModal().title"
                :color="showModal().color"
                :show="showModal().open"
                @update:show="closeModal"
              >
                {{ showModal().message }}
              </CModal>
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </CWrapper>
    </client-only>
  </div>
</template>
<script>
export default {
  data () {
    return {
      steps: [
        {
          target: '#side_bar_daftar_pemohon',
          content: 'Discover <strong>Vue Tour</strong>!'
        },
        {
          target: '#side_bar_daftar_permohonan',
          content: 'An awesome plugin made with Vue.js!'
        },
        {
          target: '#side_bar_daftar_pemohon',
          content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
          params: {
            placement: 'top'
          }
        }
      ]
    }
  },
  mounted () {
    // this.$tours.myTour.start()
  },
  methods: {
    closeModal (status, event, accept) {
      if (accept) {
        this.$store.state.ui.modal.onClick()
      }
      this.$store.commit('ui/set', ['modal', { open: false }])
    },
    showModal () {
      return this.$store.state.ui.modal
    },
    flushMesage () {
      const flushMesage = this.$store.state.ui.flushMessage
      if (flushMesage.open) {
        setTimeout(() => {
          this.$store.commit('ui/set', [
            'flushMessage', {
              open: false
            }
          ])
        }, 3000)
      }
      return flushMesage
    },
    flushMesageEvent (status) {
      if (status === false) { this.$store.commit('ui/set', ['flushMessage', { open: false }]) }
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
