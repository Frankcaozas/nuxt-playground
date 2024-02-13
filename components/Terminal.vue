<script setup lang="ts">
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'

const props = defineProps<{
  stream?: ReadableStream
}>()
const terminal = new Terminal()
const root = ref<HTMLElement>()

watch(
  () => props.stream,
  (s) => {
    if (!s)
      return
    const reader = s.getReader()
    function read() {
      reader.read().then(({ done, value }) => {
        terminal.write(value)
        if (!done)
          read()
      })
    }
    read()
  },
  { flush: 'sync' },
)

onMounted(() => {
  terminal.open(root.value!)
})
</script>

<template>
  <div ref="root" />
</template>
