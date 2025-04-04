import { defineConfig } from "vite"
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'


export default defineConfig({
  resolve: {
    alias: {
      'page': resolve(__dirname, 'src/page'),
      'mode': resolve(__dirname, 'src/mode'),
      'comp': resolve(__dirname, 'src/comp'),
      'util': resolve(__dirname, 'src/util'),
      'api': resolve(__dirname, 'src/api')
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
    hmr: false
  }
})