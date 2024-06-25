<script>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.dark {
  color-scheme: dark;
}

html, body{
  overflow: hidden;
  height: 100vh;
  --uno: bg-base font-sans;
}
</style>
