<script setup lang="ts">
const iframe = ref<HTMLIFrameElement>()
  type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')

const wcUrl = ref<string>('')
const output = ref<ReadableStream>()

async function startDevServer() {
  status.value = 'init'
  const wc = await useWebContaienrr()
  wc.on('server-ready', (port, url) => {
    wcUrl.value = url
    status.value = 'ready'
  })
  wc.on('error', () => {
    status.value = 'error'
  })
  await wc.mount({
    'package.json': {
      file: {
        contents: JSON.stringify({
          private: true,
          dependencies: {
            nuxt: 'latest',
          },
          scripts: {
            dev: 'nuxt dev',
          },
        }),
      },
    },
  })

  status.value = 'install'
  const installProcess = await wc.spawn('npm', ['install'])

  output.value = installProcess.output

  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    status.value = 'error'
    throw new Error('Unable to run npm install')
  }

  // status
  const runningProcess = await wc.spawn('npm', ['run', 'dev'])
  output.value = runningProcess.output
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

onMounted(startDevServer)
</script>

<template>
  <div grid="~ rows-[2fr_1fr]" w-full h-full of-hidden >
    <iframe v-show="status === 'ready'" ref="iframe"  w-full h-full/>
    <div v-if="status !== 'ready'" flex="~ col items-center justify-center" capitalize text-lg>
      <div i-svg-spinners-90-ring-with-bg />
      {{ status }}ing...
    </div>
    <Terminal :stream="output" />
  </div>
</template>
