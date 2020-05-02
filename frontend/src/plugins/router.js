import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import axios, { ACCESS_TOKEN_LIFETIME } from '@/plugins/axios'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/User'
import UserAttributes from '@/components/UserAttributes'
import HotelForm from '@/components/Hotel/HotelForm'
import HotelView from '@/components/Hotel/HotelView'
import CompanyForm from '@/components/Company/CompanyForm'
import CompanyView from '@/components/Company/CompanyView'
import RoomForm from '@/components/Room/RoomForm'
import RoomView from '@/components/Room/RoomView'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const isGuest = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
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
        },
        {
            path: '/changehotel/:id?',
            props: true,
            name: 'CreateEditHotel',
            component: HotelForm,
            beforeEnter: isAuthenticated
        },
        {
            path: '/hotel/:id',
            props: true,
            name: 'Hotel',
            component: HotelView
        },
        {
            path: '/changecompany',
            name: 'CreateEditCompany',
            component: CompanyForm,
            beforeEnter: isAuthenticated
        },
        {
            path: '/company',
            name: 'Company',
            component: CompanyView,
            beforeEnter: isAuthenticated
        },
        {
            path: '/changeroom/:id?',
            props: true,
            name: 'CreateEditRoom',
            component: RoomForm,
            beforeEnter: isAuthenticated
        },
        {
            path: '/room/:id',
            props: true,
            name: 'Room',
            component: RoomView
        }
    ]
})

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    const token = store.getters['user/getAccessToken']
    if (token && !axios.defaults.headers.common.Authorization) {
        if (new Date().getTime() - store.getters['user/getLastRefreshSince'] < ACCESS_TOKEN_LIFETIME) {
            axios.defaults.headers.common = {Authorization: `Bearer ${token}`}
            store.dispatch('user/set_timeout_for_refresh', new Date().getTime() - store.getters['user/getLastRefreshSince'])
        } else {
            await store.dispatch('user/refresh_token')
        }
    }
    next()
}
router.beforeEach(waitForStorageToBeReady)

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.data && error.response.data.code === 'token_not_valid') {
            store.dispatch('user/clear_auth')
            router.push({name: 'Login'})
        }
        return Promise.reject(error)
    }
)

export default router