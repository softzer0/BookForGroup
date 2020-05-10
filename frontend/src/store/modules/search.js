import service from '@/services/accommodation'
import Accommodation from '@/models/accommodation'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        SET_ACCOMMODATIONS: (state, data) => {
            state.list = []
            data.forEach(accommodation => { state.list.push(new Accommodation(accommodation) ) })
        }
    },
    getters: {
        getAccommodationList: state => state.list
    },
    actions: {
        async get_filtered_accommodation({ commit }, data) {
            const date = {
                or: [
                    {
                        reserved_from__gt: data.rangeDate[1]
                    },
                    {
                        reserved_until__lt: data.rangeDate[0]
                    }
                ]
            }
            const jsonData = data.city ?{
                and: [date,
                {
                    hotel__city: data.city.name
                }
            ]} : date
            const response = await service.get_filtered_accommodation(jsonData)
            commit('SET_ACCOMMODATIONS', response.data)
        },
        reset({ commit }) {
            commit('SET_ACCOMMODATIONS', [])
        }
    }
}
