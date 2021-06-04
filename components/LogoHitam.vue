<template>
  <img class="NuxtLogo" height="30" :src="$auth.user.role === 'internal' ? 'img/talikuat_hitam.png' :'img/text_hitam.png'">
</template>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
