<script setup lang="ts">
const { x, y } = useMouse()
const colorMode = useColorMode()

function toggleDark() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div text='red'>
    hello world

    <br />

    {{ x }} {{ y }}

    <button @click="toggleDark">
      {{ colorMode.value }}
    </button>
  </div>
</template>
