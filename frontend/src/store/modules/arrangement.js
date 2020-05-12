import service from '@/services/arrangement'
import Arrangement from '@/models/arrangement'

export default {
    namespaced: true,
    state: {
        list: [],
        data: new Arrangement()
    },
    mutations: {
        SET_ARRANGEMENTS: (state, data) => {
            state.list = []
            data.forEach(arrangement => { state.list.push(new Arrangement(arrangement) ) })
        },
        SET_ARRANGEMENT: (state, data) => {
            state.data = new Arrangement(data)
        },
        ADD_ARRANGEMENT: (state, data) => {
            state.list.push(new Arrangement(data))
        }
    },
    getters: {
        getArrangementList: state => state.list,
        getArrangementData: state => state.data
    },
    actions: {
        async get_accommodation_arrangements({ commit }, id) {
            const response = await service.get_accommodation_arrangements(id)
            commit('SET_ARRANGEMENTS', response.data)
        },
        async create_arrangement({ commit , state }) {
            const response = await service.create_arrangement(state.data.prepareForRequest())
            commit('ADD_ARRANGEMENT', response.data)
        },
        async get_arrangement({ commit }, id) {
            const response = await service.get_arrangement(id)
            commit('SET_ARRANGEMENT', response.data)
        },
        async update_arrangement({ commit , state }) {
            const response = await service.update_arrangement(state.data.id, state.data.prepareForRequest())
            commit('SET_ARRANGEMENT', response.data)
        },
        reset_arrangement({ commit }, accommodationId) {
            commit('SET_ARRANGEMENT', { accommodation: accommodationId })
        },
        reset({ commit }) {
            commit('SET_ARRANGEMENT')
            commit('SET_ARRANGEMENTS', [])
        },
        model_changed({ state }, model) {
            state.data = model
        }
    }
}
