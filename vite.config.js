import { defineConfig } from "vite"
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'


export default defineConfig({
  resolve: {
    alias: {
      'page': resolve(__dirname, 'src/page')
    }
  },
  plugins: [
    vue(),
    legacy({
        targets : ['firefox 43']
    })
  ],
  server: {
    // 配置服务器
    hmr: {
      overlay: false
    }
  }
})