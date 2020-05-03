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
            data.forEach(room => { state.list.push(new Room(room) )
            })
        },
        SET_ROOM: (state, data) => {
            state.data = new Room(data)
        },
        CLEAR_ROOM: (state) => {
            state.data = new Room()
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
        async create_room({ commit }, data) {
            const response = await service.create_room(data)
            commit('ADD_ROOM', response.data)
        },
        async get_room({ commit }, id) {
            const response = await service.get_room(id)
            commit('SET_ROOM', response.data)
        },
        async update_room({ commit }, params) {
            const response = await service.update_room(params.id, params.data)
            commit('SET_ROOM', response.data)
        },
        clear_room({ commit }) {
            commit('CLEAR_ROOM')
        },
        reset({ commit }) {
            commit('CLEAR_ROOM')
            commit('SET_ROOMS', [])
        }
    }
}
