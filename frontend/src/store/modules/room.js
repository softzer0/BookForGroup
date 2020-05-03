import service from '@/services/room'
import Room from '@/models/room'

export default {
    namespaced: true,
    state: {
        list: [],
        data: new Room()
    },
    mutations: {
        SET_ROOMS: (state, data) => {
            state.list = []
            data.forEach(room => { state.list.push(new Room(room) ) })
        },
        SET_ROOM: (state, data) => {
            state.data = new Room(data)
        },
        ADD_ROOM: (state, data) => {
            state.list.push(new Room(data))
        }
    },
    getters: {
        getRoomList: state => state.list,
        getRoomData: state => state.data
    },
    actions: {
        async get_hotel_rooms({ commit }, id) {
            const response = await service.get_hotel_rooms(id)
            commit('SET_ROOMS', response.data)
        },
        async create_room({ commit , state }) {
            const response = await service.create_room(state.data.prepareForRequest())
            commit('ADD_ROOM', response.data)
        },
        async get_room({ commit }, id) {
            const response = await service.get_room(id)
            commit('SET_ROOM', response.data)
        },
        async update_room({ commit , state }) {
            const response = await service.update_room(state.data.id, state.data.prepareForRequest())
            commit('SET_ROOM', response.data)
        },
        reset_room({ commit }, hotelId) {
            commit('SET_ROOM', { hotel: hotelId })
        },
        reset({ commit }) {
            commit('SET_ROOM')
            commit('SET_ROOMS', [])
        },
        model_changed({ state }, model) {
            state.data = model
        }
    }
}
