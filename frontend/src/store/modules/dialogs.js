export default {
    namespaced: true,
    state: {
        show: false,
        deleteResponse: false,
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
        SET_DATA_FOR_DELETE: (state) => {
            state.params.title = 'Delete'
            state.params.text = 'Are you sure you want to delete this object?'
            state.deleteResponse = false
            state.show = true
        },
        SET_DELETE_RESPONSE_AND_CLOSE: (state) => {
            state.deleteResponse = true
            state.show = false
            state.params.title = ''
            state.params.text = null
        },
        RESET_DATA: (state) => {
            state.show = false
            state.deleteResponse = false
            state.params.title = ''
            state.params.text = null
        }
    },
    getters: {
        getDialogState: state => state.show,
        getDialogDeleteResponse: state => state.deleteResponse,
        getDialogParams: state => state.params
    },
    actions: {
        show_error({ commit }, text) {
            commit('SET_DATA', {title: "Error", text})
        },
        show_delete_dialog({ commit }) {
            commit('SET_DATA_FOR_DELETE')
        },
        set_delete_response({ commit }) {
            commit('SET_DELETE_RESPONSE_AND_CLOSE')
        },
        close_dialog({ commit }) {
            commit('RESET_DATA')
        }
    }
}