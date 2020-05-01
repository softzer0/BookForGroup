import Vue from 'vue'
import Router from 'vue-router'
import axios from '@/plugins/axios'

import store from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from "@/components/Register"
import User from "@/components/User"
import UserAttributes from "@/components/UserAttributes"
import CreateEditHotel from "@/components/hotelComponents/CreateEditHotel"
import Hotel from "@/components/hotelComponents/Hotel"
import CreateEditCompany from "@/components/companyComponents/CreateEditCompany"
import Company from "@/components/companyComponents/Company"
import CreateEditRoom from "@/components/roomComponents/CreateEditRoom"
import Room from "@/components/roomComponents/Room"

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
            path: '/changehotel/:pk?',
            props: true,
            name: 'CreateEditHotel',
            component: CreateEditHotel,
            beforeEnter: isAuthenticated
        },
        {
            path: '/hotel/:pk',
            props: true,
            name: 'Hotel',
            component: Hotel
        },
        {
            path: '/changecompany',
            name: 'CreateEditCompany',
            component: CreateEditCompany,
            beforeEnter: isAuthenticated
        },
        {
            path: '/company',
            name: 'Company',
            component: Company
        },
        {
            path: '/changeroom/:pk?',
            props: true,
            name: 'CreateEditRoom',
            component: CreateEditRoom,
            beforeEnter: isAuthenticated
        },
        {
            path: '/room/:pk',
            props: true,
            name: 'Room',
            component: Room
        }
    ]
})

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    const token = store.getters['user/getAccessToken']
    if (token) {
        axios.defaults.headers.common = {Authorization: `Bearer ${token}`}
    }
    next()
}
router.beforeEach(waitForStorageToBeReady)

export default router