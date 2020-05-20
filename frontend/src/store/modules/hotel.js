import service from '@/services/hotel'
import Hotel from '@/models/hotel'

export default {
    namespaced: true,
    state: {
        list: [],
        data: new Hotel()
    },
    mutations: {
        SET_HOTELS: (state, data) => {
            state.list = []
            data.forEach(hotel => { state.list.push(new Hotel(hotel)) })
        },
        SET_HOTEL: (state, data) => {
            state.data = new Hotel(data)
        },
        CLEAR_HOTEL: (state) => {
            state.data = new Hotel()
        },
        ADD_HOTEL: (state, data) => {
            state.list.push(new Hotel(data))
        },
        REMOVE_HOTEL: (state, data) => {
            state.list.splice(state.list.indexOf(data), 1)
        }
    },
    getters: {
        getHotelList: state => state.list,
        getHotelData: state => state.data
    },
    actions: {
        async get_user_hotels({ commit }, id) {
            const response = await service.get_user_hotels(id)
            commit('SET_HOTELS', response.data)
        },
        async create_hotel({ commit, state }) {
            const response = await service.create_hotel(state.data.prepareForRequest())
            commit('ADD_HOTEL', response.data)
        },
        async get_hotel({ commit }, id) {
            const response = await service.get_hotel(id)
            commit('SET_HOTEL', response.data)
        },
        async update_hotel({ commit, state }) {
            const response = await service.update_hotel(state.data.id, state.data.prepareForRequest())
            commit('SET_HOTEL', response.data)
        },
        async delete_hotel({ commit }, data){
            await service.delete_hotel(data.id)
            commit('REMOVE_HOTEL', data)
        },
        clear_hotel({ commit }) {
            commit('CLEAR_HOTEL')
        },
        reset({ commit }) {
            commit('CLEAR_HOTEL')
            commit('SET_HOTELS', [])
        },
        model_changed({ state }, model) {
            state.data = model
        }
    }
}
