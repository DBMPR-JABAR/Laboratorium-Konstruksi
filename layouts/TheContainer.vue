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
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </CWrapper>
    </client-only>
  </div>
</template>

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
