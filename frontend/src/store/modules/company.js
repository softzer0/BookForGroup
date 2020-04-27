import companyserv from "@/services/companyserv";

export default {
    namespaced: true,
    state: {
        exists: false,
        data: {
            name: '',
            phone: '',
            pib: '',
            city: '',
            address: ''
        }
    },
    mutations: {
        SET_COMPANY: (state, data) => {
            state.data.name = data.name
            state.data.phone = data.phone
            state.data.pib = data.pib
            state.data.city = data.city
            state.data.address = data.address
            state.exists = true
        },
        CLEAR_COMPANY: (state) => {
            state.exists = false
            state.data.name = ''
            state.data.phone = ''
            state.data.pib = ''
            state.data.city = ''
            state.data.address = ''
        }
    },
    getters: {
        doesExist: state => () => state.exists,
        getCompanyData: state => () => state.data
    },
    actions: {
        async setusercompany({ commit, state }, data) {
            const response = await (state.exists ?
                companyserv.updateusercompany(data) :
                companyserv.createusercompany(data))
            commit('SET_COMPANY', response.data)
        },
        async getusercompany({ commit }) {
            try {
                const response = await companyserv.getusercompany()
                commit('SET_COMPANY', response.data)
            } catch (e) {
                commit('CLEAR_COMPANY')
            }
        }
    }
}
