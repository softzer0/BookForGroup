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
            state.data.firstName = data.user.first_name
            state.data.lastName = data.user.last_name
        },
        CLEAR_DATA: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.data.firstName = null
            state.data.lastName = null
        }
    },
    getters: {
        getAccessToken: state => () => state.accessToken,
        getRefreshToken: state => () => state.refreshToken,
        getUserData: state => () => state.data
    },
    actions: {
        async login ({ commit }, data) {
            const response = await auth.login(data)
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
            // console.log(await auth.userInfo())
            commit('SET_DATA', response.data)
        },
        async register ({ commit }, data) {
            const response = await auth.register(data)
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
            // console.log(await auth.userInfo())
            commit('SET_DATA', response.data)
        },
        async logout ({ commit }) {
            await auth.logout()
            axios.defaults.headers.common = {}
            commit('CLEAR_DATA')
        }
    }
}