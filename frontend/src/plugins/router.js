import Vue from 'vue'
import Router from 'vue-router'
import axios from '@/plugins/axios'

import store from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from "@/components/Register"
import User from "@/components/User"
import UserAttributes from "@/components/UserAttributes";

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

const router = new Router({
    mode: 'history',
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
        },
        {
            path: '/completeUser',
            name: 'UserAttributes',
            component: UserAttributes,
            beforeEnter: isAuthenticated
        }
    ]
})

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    const token = store.getters['user/getAccessToken']()
    if (token) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    }
    next()
}
router.beforeEach(waitForStorageToBeReady)

export default router