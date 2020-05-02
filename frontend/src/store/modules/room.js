import room from '@/services/room'

export default {
    namespaced: true,
    state: {
        list: [],
        data: {
            id: null,
            hotel: null,
            choice: '',
            bedNumber: '',
            floorNumber: '',
            price: '',
            smokingAllowed: false,
            peopleWithDisabilitiesAdapted: false,
            roomNumber: '',
            roomSize: '',
            terrace: false,
            airConditioning: false,
            tv: false,
            soundIsolation: false,
            heating: false,
            kitchen: false
        }
    },
    mutations: {
        SET_ROOMS: (state, data) => {
            state.list = data
        },
        SET_ROOM: (state, data) => {
            state.data.id = data.pk
            state.data.hotel = data.hotel
            state.data.choice = data.choice
            state.data.bedNumber = data.bed_number
            state.data.floorNumber = data.floor_number
            state.data.price = data.price
            state.data.smokingAllowed = data.smoking_allowed
            state.data.peopleWithDisabilitiesAdapted = data.people_with_disabilities_adapted
            state.data.roomNumber = data.room_number
            state.data.roomSize = data.room_size
            state.data.terrace = data.terrace
            state.data.airConditioning = data.air_conditioning
            state.data.tv = data.tv
            state.data.soundIsolation = data.sound_isolation
            state.data.heating = data.heating
            state.data.kitchen = data.kitchen
        },
        CLEAR_ROOM: (state) => {
            state.data.id = null
            state.data.hotel = null
            state.data.choice = ''
            state.data.bedNumber = ''
            state.data.floorNumber = ''
            state.data.price = ''
            state.data.smokingAllowed = false
            state.data.peopleWithDisabilitiesAdapted = false
            state.data.roomNumber = ''
            state.data.roomSize = ''
            state.data.terrace = false
            state.data.airConditioning = false
            state.data.tv = false
            state.data.soundIsolation = false
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
            const response = await room.updateroom(params.id, params.data)
            commit('SET_ROOM', response.data)
        },
        clearroom({ commit }) {
            commit('CLEAR_ROOM')
        }
    }
}
