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
        }
    }
}