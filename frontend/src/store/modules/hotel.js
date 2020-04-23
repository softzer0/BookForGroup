import hotelserv from '@/services/hotelserv'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        SET_HOTEL: (state, data) => {
            state.list = data
        }
    },
    getters: {
      getHotelList: state => () => state.list
    },
    actions: {
        async userhotels({ commit }, id) {
            const response = await hotelserv.userhotels(id)
            commit('SET_HOTEL', response.data)
        }
    }
}
