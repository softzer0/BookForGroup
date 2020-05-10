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
            let collections = []
            data.collections.forEach(function(item) {
                let collection = {
                    accommodations__acco_type: item.value,
                    accommodations__quantity: item.quantity,
                    accommodations__bed_count: item.bedCount,
                    accommodations__smoking_allowed: item.smokingAllowed,
                    accommodations__people_with_disabilities_adapted: item.peopleWithDisabilitiesAdapted,
                    accommodations__terrace: item.terrace,
                    accommodations__air_conditioning: item.airConditioning,
                    accommodations__tv: item.tv,
                    accommodations__sound_isolation: item.soundIsolation,
                    accommodations__heating: item.heating,
                    accommodations__kitchen: item.kitchen
                }
                if(item.value == 'AP' && item.bedCount > 1){
                    collection.accommodations__room_count = item.roomCount
                }
                collections.push(collection)
            })
            const date = {
                or: [
                    {
                        accommodations__reserved_from__gt: data.rangeDate[1]
                    },
                    {
                        accommodations__reserved_until__lt: data.rangeDate[0]
                    }
                ]
            }
            let jsonData = {
                and: [date, { city: data.city.name }]}

            jsonData.and.push(...collections)
            const response = await service.get_filtered_hotel(jsonData)
            commit('SET_HOTELS', response.data)
        },
        reset({ commit }) {
            commit('SET_HOTELS', [])
        }
    }
}
