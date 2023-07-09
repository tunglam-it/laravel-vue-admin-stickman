import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/pages/Auth/login.vue';
import ListPlayer from "../views/pages/Player/list.vue";
import CreatePlayer from "../views/pages/Player/new.vue";
import ListItem from "../views/pages/Item/list.vue";
import CreateItem from "../views/pages/Item/new.vue";
import ListItemPlayer from "../views/pages/ItemPlayer/list.vue"
import CreateItemPlayer from "../views/pages/ItemPlayer/new.vue"

const isAuth = window.localStorage.getItem('token')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: isAuth ? ListPlayer : Login
        },
        {
            path: '/',
            name: 'list-user',
            component: !isAuth ? Login : ListPlayer
        },
        {
            path: '/create-user',
            name: 'create-user',
            component: !isAuth ? Login : CreatePlayer
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
        },
        {
            path: '/list-item-user',
            name: 'list-item-user',
            component: !isAuth ? Login : ListItemPlayer
        },
        {
            path: '/create-item-user',
            name: 'create-item-user',
            component: !isAuth ? Login : CreateItemPlayer
        }
    ]
})

export default router
