export default {
    namespaced: true,
    state: {
        show: false,
        params: {
            title: '',
            text: null
        }
    },
    mutations: {
        SET_DATA: (state, data) => {
            state.params.title = data.title
            state.params.text = data.text
            state.show = true
        },
        RESET_DATA: (state) => {
            state.show = false
            state.params.title = ''
            state.params.text = null
        }
    },
    getters: {
        getDialogState: state => state.show,
        getDialogParams: state => state.params
    },
    actions: {
        show_error({ commit }, text) {
            commit('SET_DATA', {title: "Error", text})
        },
        close_dialog({ commit }) {
            commit('RESET_DATA')
        }
    }
}