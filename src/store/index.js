import Vue from 'vue'
import Vuex from 'vuex'
import singer from './mudules/singer'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    singer
  }
})
