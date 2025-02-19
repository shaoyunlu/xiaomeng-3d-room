import {createApp} from 'vue'
import App from './main.vue'


import register from 'xiaomeng-ui'
import 'xiaomeng-ui/dist/xmv-ui.css'
import './style/index.less'

import router from "./route";

const app = createApp(App)
app.use(router)
app.use(register)
app.mount('#app')