import service from '@/services/hotel'

export default {
    namespaced: true,
    state: {
        list: [],
        data: {
            id: null,
            name: '',
            city: '',
            address: '',
            webSite: '',
            freeWifi: false,
            freeParking: false,
            breakfast: false,
            swimmingPool: false,
            spa: false,
            gym: false
        }
    },
    mutations: {
        SET_HOTELS: (state, data) => {
            state.list = data
        },
        SET_HOTEL: (state, data) => {
            state.data.id = data.pk
            state.data.name = data.name
            state.data.city = data.city
            state.data.address = data.address
            state.data.webSite = data.web_site
            state.data.freeWifi = data.free_wifi
            state.data.freeParking = data.free_parking
            state.data.breakfast = data.breakfast
            state.data.swimmingPool = data.swimming_pool
            state.data.spa = data.spa
            state.data.gym = data.gym
        },
        CLEAR_HOTEL: (state) => {
            state.data.id = null
            state.data.name = ''
            state.data.city = ''
            state.data.address = ''
            state.data.webSite = ''
            state.data.freeWifi = false
            state.data.freeParking = false
            state.data.breakfast = false
            state.data.swimmingPool = false
            state.data.spa = false
            state.data.gym = false
        },
        ADD_HOTEL: (state, data) => {
            state.list.push(data)
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
        async create_hotel({ commit }, data) {
            const response = await service.create_hotel(data)
            commit('ADD_HOTEL', response.data)
        },
        async get_hotel({ commit }, id) {
            const response = await service.get_hotel(id)
            commit('SET_HOTEL', response.data)
        },
        async update_hotel({ commit }, params) {
            const response = await service.update_hotel(params.id, params.data)
            commit('SET_HOTEL', response.data)
        },
        clear_hotel({ commit }) {
            commit('CLEAR_HOTEL')
        }
    }
}
