import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import user from './modules/user'
import hotel from './modules/hotel'
import company from './modules/company'
import accommodation from './modules/accommodation'
import search from './modules/search'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export default new Vuex.Store({
    modules: {
        user,
        hotel,
        company,
        accommodation,
        search
    },
    plugins: [vuexLocalStorage.plugin]
})