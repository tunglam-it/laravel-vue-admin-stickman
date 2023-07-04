import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/pages/Auth/login.vue';
import ListUser from "../views/pages/Player/list.vue";
import CreateUser from "../views/pages/Player/new.vue";
import ListItem from "../views/pages/Item/list.vue";
import CreateItem from "../views/pages/Item/new.vue";

const isAuth = window.localStorage.getItem('token')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: isAuth ? ListUser : Login
        },
        {
            path: '/',
            name: 'list-user',
            component: !isAuth ? Login : ListUser
        },
        {
            path: '/create-user',
            name: 'create-user',
            component: !isAuth ? Login : CreateUser
        },
        {
            path: '/list-item',
            name: 'list-item',
            component: !isAuth ? Login : ListItem
        },
        {
            path: '/create-item',
            name: 'create-item',
            component: !isAuth ? Login : CreateItem
        }
    ]
})

export default router
