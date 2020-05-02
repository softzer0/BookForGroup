import auth from '@/services/auth'
import axios, { accessTokenLifetime } from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        timeoutRef: null,
        since: null,
        accessToken: null,
        refreshToken: null,
        data: {
            id: null,
            firstName: null,
            lastName: null
        }
    },
    mutations: {
        SET_TOKENS: (state, data) => {
            state.since = new Date().getTime()
            state.accessToken = data.access_token || data.access
            axios.defaults.headers.common = {Authorization: `Bearer ${state.accessToken}`}
            state.refreshToken = data.refresh_token || data.refresh || state.refreshToken
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
        }
    },
    getters: {
        isLoggedIn: state => !!(state.accessToken),
        getLastRefreshSince: state => state.since,
        getAccessToken: state => state.accessToken,
        getRefreshToken: state => state.refreshToken,
        getUserData: state => state.data
    },
    actions: {
        set_timeout ({ state, dispatch }, timeout) {
            state.timeoutRef = setTimeout(() => { dispatch('refresh_token') }, timeout)
        },
        async refresh_token ({ commit, state, dispatch }) {
            const response = await auth.refresh_token(state.refreshToken)
            commit('SET_TOKENS', response.data)
            dispatch('set_timeout', accessTokenLifetime)
        },
        set_data ({ commit, dispatch }, response) {
            // console.log(await auth.userInfo())
            commit('SET_USER', response.data.user)
            commit('SET_TOKENS', response.data)
            dispatch('set_timeout', accessTokenLifetime)
        },
        async login ({ dispatch }, data) {
            const response = await auth.login(data)
            dispatch('set_data', response)
        },
        async register ({ dispatch }, data) {
            const response = await auth.register(data)
            dispatch('set_data', response)
        },
        clear_auth ({ commit }) {
            axios.defaults.headers.common = {}
            commit('CLEAR_DATA')
        },
        async logout ({ state, dispatch }) {
            try {
                await auth.logout(state.refreshToken)
            } catch (error) {
                // for whatever the reason backend fails do to it, we'll ignore it nevertheless
                console.error(error)
            }
            dispatch('clear_auth')
            clearTimeout(state.timeoutRef)
        },
        async update_user({ commit }, data) {
            const response = await auth.update(data)
            commit('SET_USER', response.data)
        }
    }
}