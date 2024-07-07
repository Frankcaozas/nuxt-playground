import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
  shortcuts: {
    'border-base': 'border-gray:300 dark:border-gray:600',
    'bg-active': 'bg-gray/10',
    'bg-base': 'bg-white dark:bg-[#020420]',
  },
  transformers: [
    transformerDirectives(),
  ],
})
