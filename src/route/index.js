import {createRouter ,createWebHashHistory} from 'vue-router'


import editVue from 'page/3D/edit.vue'
import showVue from 'page/3D/show.vue'

const routes = [
    { path : '/',component : showVue },
    { path : '/3D/show',component : showVue },
    { path : '/3D/edit',component : editVue }
]

const router= createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router