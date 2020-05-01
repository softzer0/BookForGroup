import axios from '@/plugins/axios'
import auth from '@/services/auth'

export default {
    namespaced: true,
    state: {
        accessToken: null,
        refreshToken: null,
        data: {
            firstName: null,
            lastName: null
        }
    },
    mutations: {
        SET_DATA: (state, data) => {
            state.accessToken = data.access_token
            state.refreshToken = data.refresh_token
            state.data = {
                id: data.user.pk,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                phone: data.user.phone,
                company_name: data.user.company_name,
                city: data.user.city,
                address: data.user.address
            }
        },
        CLEAR_DATA: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.data = {}
        },
        SET_USER: (state, data) => {
            state.data.id = data.pk
            state.data.firstName = data.first_name
            state.data.lastName = data.last_name
            state.data.phone = data.phone
            state.data.company_name = data.company_name
            state.data.city = data.city
            state.data.address = data.address
        }
    },
    getters: {
        isLoggedIn: () => () => !!(axios.defaults.headers.common.Authorization),
        getAccessToken: state => () => state.accessToken,
        getRefreshToken: state => () => state.refreshToken,
        getUserData: state => () => state.data
    },
    actions: {
        async login ({ commit }, data) {
            const response = await auth.login(data)
            axios.defaults.headers.common = {Authorization: `Bearer ${response.data.access_token}`}
            // console.log(await auth.userInfo())
            commit('SET_DATA', response.data)
        },
        async register ({ commit }, data) {
            const response = await auth.register(data)
            axios.defaults.headers.common = {Authorization: `Bearer ${response.data.access_token}`}
            // console.log(await auth.userInfo())
            commit('SET_DATA', response.data)
        },
        async logout ({ commit }) {
            axios.defaults.headers.common = {}
            await auth.logout()
            commit('CLEAR_DATA')
        },
        async completeUser({ commit, state }, data) {
            const response = await auth.completeUser(state.data.id, data)
            commit('SET_USER', response.data)
        }
    }
}