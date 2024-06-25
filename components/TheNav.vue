<script setup lang="ts">
</script>

<template>
  <nav p4 py-3 text-xl border="b base" flex="~ items-center gap-2">
    <NuxtLink to="/" flex="~ gap-2 items-center" title="Nuxt Playground">
      <NuxtLogo class="h-1.3em mt--1.8" />
      <span text-xl>Playground</span>
    </NuxtLink>
    <div flex-auto />
    <ToggleTheme />
    <NuxtLink p2 rounded hover="bg-active" href="https://github.com/" target="_blank">
      <div i-carbon-logo-github />
    </NuxtLink>
  </nav>
</template>
