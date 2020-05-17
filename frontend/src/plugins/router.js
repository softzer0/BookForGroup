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
import AccommodationForm from '@/components/Accommodation/AccommodationForm'
import AccommodationView from '@/components/Accommodation/AccommodationView'
import ArrangementView from "@/components/Arrangement/ArrangementView"
import ArrangementForm from "@/components/Arrangement/ArrangementForm"

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
            component: Home
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
            path: '/complete-user',
            name: 'UserAttributes',
            component: UserAttributes,
            beforeEnter: isAuthenticated
        },
        {
            path: '/change-hotel/:id?',
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
            path: '/change-company',
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
            path: '/change-accommodation/:id?',
            props: true,
            name: 'CreateEditAccommodation',
            component: AccommodationForm,
            beforeEnter: isAuthenticated
        },
        {
            path: '/accommodation/:id',
            props: true,
            name: 'Accommodation',
            component: AccommodationView
        },
        {
            path: '/change-arrangement/:id?',
            props: true,
            name: 'CreateEditArrangement',
            component: ArrangementForm,
            beforeEnter: isAuthenticated
        },
        {
            path: '/arrangement/:id',
            props: true,
            name: 'Arrangement',
            component: ArrangementView
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
        if (error.response.data) {
            if (error.response.data.code === 'token_not_valid') {
                store.dispatch('user/clear_auth')
                router.push({name: 'Login'})
            } else {
                return Promise.reject(error.response.data)
            }
        }
        return Promise.reject(error)
    }
)

export default router