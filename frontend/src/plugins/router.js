import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from "@/components/Register"
import User from "@/components/User"

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
    if (!store.getters['user/getAccessToken']()) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const isGuest = (to, from, next) => {
    if (!store.getters['user/getAccessToken']()) {
        next()
    } else {
        next({ name: 'User' })
    }
}

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: isGuest
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: isGuest
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            beforeEnter: isGuest
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            beforeEnter: isAuthenticated
        }
    ]
})