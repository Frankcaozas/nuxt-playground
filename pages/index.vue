<script setup lang="ts">
const { x, y } = useMouse()
const colorMode = useColorMode()

function toggleDark() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div grid="~ cols-[1fr_2fr]" h-full>
    <div border="r base">
      doc
    </div>
    <ThePlayground />
  </div>
  <!-- <div text='red'>
    hello world

    <br />

    {{ x }} {{ y }}

  </div> -->
</template>
