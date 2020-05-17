import service from '@/services/hotel'
import Hotel from '@/models/hotel'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        SET_HOTELS: (state, data) => {
            state.list = []
            data.forEach(hotel => { state.list.push(new Hotel(hotel) ) })
        }
    },
    getters: {
        getHotelList: state => state.list
    },
    actions: {
        async get_filtered_hotel({ commit }, data) {
            const jsonData = {and: [{
                hotel__city: data.city.name,
                hotel__position: data.position
            }]}
            data.collections.forEach(function(item) {
                const collection = {
                    acco_type: item.value,
                    quantity__gte: item.quantity,
                    bed_count: item.bedCount,
                    smoking_allowed: item.smokingAllowed,
                    people_with_disabilities_adapted: item.peopleWithDisabilitiesAdapted,
                    terrace: item.terrace,
                    air_conditioning: item.airConditioning,
                    tv: item.tv,
                    sound_isolation: item.soundIsolation,
                    heating: item.heating,
                    kitchen: item.kitchen
                }
                if(item.value == 'AP' && item.bedCount > 1){
                    collection.room_count = item.roomCount
                }
                jsonData.and.push(collection)
            })

            const response = await service.get_filtered_hotel(data.rangeDate[0], data.rangeDate[1], jsonData)
            commit('SET_HOTELS', response.data)
        },
        reset({ commit }) {
            commit('SET_HOTELS', [])
        }
    }
}
