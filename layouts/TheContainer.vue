<template>
  <div class="c-app">
    <TheSidebar />
    <client-only>
      <CWrapper>
        <TheHeader />
        <div class="c-body">
          <main class="c-main">
            <CContainer fluid>
              <transition name="fade" mode="out-in">
                <Nuxt />
              </transition>
              <CModal
                :title="showModal().title"
                color="danger"
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
    return {}
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
