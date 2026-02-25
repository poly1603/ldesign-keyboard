import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ldesign/keyboard-core': resolve(__dirname, '../packages/core/src/index.ts'),
      '@ldesign/keyboard-vue': resolve(__dirname, '../packages/vue/src/index.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
