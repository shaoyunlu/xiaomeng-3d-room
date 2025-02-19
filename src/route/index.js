import {createRouter ,createWebHashHistory} from 'vue-router'


import indexVue from 'page/index.vue'

const routes = [
    { path : '/',component : indexVue },
]

const router= createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router