import hotelserv from '@/services/hotelserv'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        SET_HOTELS: (state, data) => {
            state.list = data
        },
        SET_HOTEL: (state, data) => {
            state.list.push(data)
        }
    },
    getters: {
      getHotelList: state => () => state.list
    },
    actions: {
        async userhotels({ commit }, id) {
            const response = await hotelserv.userhotels(id)
            commit('SET_HOTELS', response.data)
        },
        async createhotel({commit}, data) {
            const response = await hotelserv.createhotel(data)
            commit('SET_HOTEL', response.data)
        }
    }
}
