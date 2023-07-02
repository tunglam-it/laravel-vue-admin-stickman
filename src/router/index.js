import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Admin/Auth/login.vue';
import List from "../views/Admin/list.vue";

const isAuthen = window.localStorage.getItem('token')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: isAuthen ? List : Login
        },
        {
            path: '/',
            name: 'dashboard',
            component: !isAuthen ? Login : List
        }
    ]
})

export default router
