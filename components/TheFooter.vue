<template>
  <CFooter :fixed="false">
    <div>
      <a href="http://temanjabar.net/" target="_blank">{{
        $auth.user.role === "internal" ? "Talikuat" : "Teman Jabar"
      }}</a>
      <span class="ml-1"
        >&copy; {{ new Date().getFullYear() }} Labolatorium Kontruksi.</span
      >
    </div>
    <!-- <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">CoreUI for Vue</a>
    </div> -->
  </CFooter>
</template>
