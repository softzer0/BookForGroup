import service from '@/services/room'

export default {
    namespaced: true,
    state: {
        list: [],
        data: {
            id: null,
            hotel: null,
            floorNumber: 0,
            roomCount: 0,
            roomType: '',
            bedsNumber: 0,
            price: '',
            smokingAllowed: false,
            peopleWithDisabilitiesAdapted: false,
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
            data.forEach(room => {
                state.list.push({
                    id: room.pk,
                    hotel: room.hotel.pk,
                    floorNumber: room.floor_number,
                    roomCount: room.room_count,
                    roomType: room.room_type,
                    bedsNumber: room.beds_number,
                    price: room.price,
                    smokingAllowed: room.smoking_allowed,
                    peopleWithDisabilitiesAdapted: room.people_with_disabilities_adapted,
                    terrace: data.term,
                    airConditioning: data.air_conditioning,
                    tv: data.tv,
                    soundIsolation: data.sound_isolation,
                    heating: data.heating,
                    kitchen: data.kitchen
                })
            })
        },
        SET_ROOM: (state, data) => {
            state.data.id = data.pk
            state.data.hotel = data.hotel.pk
            state.data.floorNumber = data.floor_number
            state.data.roomCount = data.room_count
            state.data.roomType = data.room_type
            state.data.bedsNumber = data.beds_number
            state.data.price = data.price
            state.data.smokingAllowed = data.smoking_allowed
            state.data.peopleWithDisabilitiesAdapted = data.people_with_disabilities_adapted
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
            state.data.floorNumber = 0
            state.data.roomCount = 0
            state.data.roomType = ''
            state.data.bedsNumber = 0
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
