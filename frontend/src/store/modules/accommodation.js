import service from '@/services/accommodation'
import Accommodation from '@/models/accommodation'

export default {
    namespaced: true,
    state: {
        list: [],
        data: new Accommodation()
    },
    mutations: {
        SET_ACCOMMODATIONS: (state, data) => {
            state.list = []
            data.forEach(accommodation => { state.list.push(new Accommodation(accommodation) ) })
        },
        SET_ACCOMMODATION: (state, data) => {
            state.data = new Accommodation(data)
        },
        ADD_ACCOMMODATION: (state, data) => {
            state.list.push(new Accommodation(data))
        },
        REMOVE_ACCOMMODATION: (state, data) => {
            state.list.splice(state.list.indexOf(data), 1)
        }
    },
    getters: {
        getAccommodationList: state => state.list,
        getAccommodationData: state => state.data
    },
    actions: {
        async get_hotel_accommodations({ commit }, id) {
            const response = await service.get_hotel_accommodations(id)
            commit('SET_ACCOMMODATIONS', response.data)
        },
        async create_accommodation({ commit , state }) {
            const response = await service.create_accommodation(state.data.prepareForRequest())
            commit('ADD_ACCOMMODATION', response.data)
        },
        async get_accommodation({ commit }, id) {
            const response = await service.get_accommodation(id)
            commit('SET_ACCOMMODATION', response.data)
        },
        async update_accommodation({ commit , state }) {
            const response = await service.update_accommodation(state.data.id, state.data.prepareForRequest())
            commit('SET_ACCOMMODATION', response.data)
        },
        async delete_accommodation({ commit }, data){
            await service.delete_accommodation(data.id)
            commit('REMOVE_ACCOMMODATION', data)
        },
        reset_accommodation({ commit }, hotelId) {
            commit('SET_ACCOMMODATION', { hotel: { id: hotelId }})
        },
        reset({ commit }) {
            commit('SET_ACCOMMODATION')
            commit('SET_ACCOMMODATIONS', [])
        },
        model_changed({ state }, model) {
            state.data = model
        }
    }
}
