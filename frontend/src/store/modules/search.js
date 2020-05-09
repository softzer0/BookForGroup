import service from '@/services/accommodation'
import Accommodation from '@/models/accommodation'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        SET_ACCOMMODATIONS: (state, data) => {
            state.list = []
            data.forEach(accommodation => { state.list.push(new Accommodation(accommodation) ) })
        }
    },
    getters: {
        getAccommodationList: state => state.list
    },
    actions: {
        async get_filtered_accommodation({ commit }, data) {
            const response = await service.get_filtered_accommodation(encodeURIComponent(JSON.stringify(data)))
            commit('SET_ACCOMMODATIONS', response.data)
        },
        reset({ commit }) {
            commit('SET_ACCOMMODATIONS', [])
        }
    }
}
