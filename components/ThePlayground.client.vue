<script setup lang="ts">
const iframe = ref<HTMLIFrameElement>()
  type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')

const wcUrl = ref<string>('')
const output = ref<ReadableStream>()

async function startDevServer() {
  const rawFiles = import.meta.glob([
    '../templates/basic/*.*',
    '!**/node_modules/**',
  ], {
    as: 'raw',
    eager: true,
  })

  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, content]) => {
      return [path.replace('../templates/basic/', ''), {
        file: {
          contents: content,
        },
      }]
    }),
  )
  console.log(files)
  status.value = 'init'
  const wc =  await useWebContaienrr()
  wc.on('server-ready', (port, url) => {
    wcUrl.value = url
    status.value = 'ready'
  })
  wc.on('error', () => {
    status.value = 'error'
  })

  await wc.mount(files)
  status.value = 'install'
  const installProcess = await wc.spawn('npm', ['install'])

  output.value = installProcess.output

  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    status.value = 'error'
    throw new Error('Unable to run npm install')
  }
  status.value =  'start'
  const runningProcess = await wc.spawn('npm', ['run', 'dev'])
  output.value = runningProcess.output

  if(import.meta.hot){
    import.meta.hot.accept(() => {
      runningProcess.kill()
    })
  }
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

onMounted(startDevServer)
</script>

<template>
  <div grid="~ rows-[2fr_1fr]" w-full h-full of-hidden>
    <iframe v-show="status === 'ready'" ref="iframe" w-full h-full />
    <div v-if="status !== 'ready'" flex="~ col items-center justify-center" capitalize text-lg>
      <div i-svg-spinners-90-ring-with-bg />
      {{ status }}ing...
    </div>
    <Terminal :stream="output" />
  </div>
</template>
