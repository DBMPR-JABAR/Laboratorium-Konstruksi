<template>
  <client-only>
    <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      @update:show="(value) => $store.commit('ui/set', ['sidebarShow', value])"
    >
      <CSidebarBrand class="d-md-down-none">
        <Logo class="c-sidebar-brand-full" :height="35" />
        <LogoSquare class="c-sidebar-brand-minimized" :height="35" />
      </CSidebarBrand>

      <CRenderFunction flat :content-to-render="$options.nav" />
      <CSidebarMinimizer
        class="d-md-down-none"
        @click.native="$store.commit('ui/set', ['sidebarMinimize', !minimize])"
      />
    </CSidebar>
  </client-only>
</template>

<script>
import nav from './_nav'

export default {
  nav,
  computed: {
    show () {
      return this.$store.state.ui.sidebarShow
    },
    minimize () {
      return this.$store.state.ui.sidebarMinimize
    }
  }
}
</script>
