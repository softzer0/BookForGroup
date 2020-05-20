export default {
    namespaced: true,
    state: {
        show: false,
        resolve: null,
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
            state.resolve = null
        },
        SET_DATA_FOR_DELETE: (state, resolve) => {
            state.params.title = 'Delete Item'
            state.params.text = 'Are you sure you want to delete this item?'
            state.show = true
            state.resolve = resolve
        },
        SET_RESPONSE: (state, response) => {
            state.show = false
            state.resolve(response)
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
        show_delete_dialog({ commit }) {
            return new Promise((resolve) => {
                commit('SET_DATA_FOR_DELETE', resolve)
            })
        },
        set_dialog_response({ commit }, response) {
            commit('SET_RESPONSE', response)
        }
    }
}