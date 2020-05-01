import room from '@/services/room'

export default {
    namespaced: true,
    state: {
        list: [],
        data: {
            pk: null,
            hotel: null,
            choice: '',
            bed_numbers: '',
            floor_number: '',
            price: '',
            smoking_allowed: false,
            people_with_disabilities_adapted: false,
            room_number: '',
            room_size: '',
            terrace: false,
            air_conditioning: false,
            tv: false,
            sound_isolation: false,
            heating: false,
            kitchen: false
        }
    },
    mutations: {
        SET_ROOMS: (state, data) => {
            state.list = data
        },
        SET_ROOM: (state, data) => {
            state.data.pk = data.pk
            state.data.hotel = data.hotel
            state.data.choice = data.choice
            state.data.bed_numbers = data.bed_numbers
            state.data.floor_number = data.floor_number
            state.data.price = data.price
            state.data.smoking_allowed = data.smoking_allowed
            state.data.people_with_disabilities_adapted = data.people_with_disabilities_adapted
            state.data.room_number = data.room_number
            state.data.room_size = data.room_size
            state.data.terrace = data.terrace
            state.data.air_conditioning = data.air_conditioning
            state.data.tv = data.tv
            state.data.sound_isolation = data.sound_isolation
            state.data.heating = data.heating
            state.data.kitchen = data.kitchen
        },
        CLEAR_ROOM: (state) => {
            state.data.pk = null
            state.data.hotel = null
            state.data.choice = ''
            state.data.bed_numbers = ''
            state.data.floor_number = ''
            state.data.price = ''
            state.data.smoking_allowed = false
            state.data.people_with_disabilities_adapted = false
            state.data.room_number = ''
            state.data.room_size = ''
            state.data.terrace = false
            state.data.air_conditioning = false
            state.data.tv = false
            state.data.sound_isolation = false
            state.data.heating = false
            state.data.kitchen = false
        },
        ADD_ROOM: (state, data) => {
            state.list.push(data)
        }
    },
    getters: {
        getRoomList: state => state.list,
        getRoomData: state => state.data
    },
    actions: {
        async hotelrooms({ commit }, id) {
            const response = await room.hotelrooms(id)
            commit('SET_ROOMS', response.data)
        },
        async createroom({ commit }, data) {
            const response = await room.createroom(data)
            commit('ADD_ROOM', response.data)
        },
        async getroom({ commit }, id) {
            const response = await room.getroom(id)
            commit('SET_ROOM', response.data)
        },
        async updateroom({ commit }, params) {
            const response = await room.updateroom(params.pk, params.data)
            commit('SET_ROOM', response.data)
        },
        clearroom({ commit }) {
            commit('CLEAR_ROOM')
        }
    }
}
