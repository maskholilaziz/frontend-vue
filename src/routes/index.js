// import vue router
import { createRouter, createWebHistory } from 'vue-router'

// define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue')
    }
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router