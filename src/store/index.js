import Vue from 'vue'
import Vuex from 'vuex'
import song from './modules/song'
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
    song
  }
})
