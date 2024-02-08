import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons()],
  shortcuts: {
    'border-base': 'border-gray:300 dark:border-gray:600',
    'bg-active': 'bg-gray/10'
  },
})
