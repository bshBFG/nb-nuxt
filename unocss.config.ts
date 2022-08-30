import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { dashboardSidebarIcons } from './data/dashboardSidebarMenu'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Open Sans',
          weights: ['400', '500', '600'],
        },
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [...dashboardSidebarIcons],
})
