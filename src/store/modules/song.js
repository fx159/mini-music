
const state = {
  songlist: [],
  fullscreen: false,
  currentindex: '',
  playsong: '',
  playing: 'false'
}

const mutations = {
  SET_SONGLIST: (state, list) => {
    state.songlist = list
  },
  SET_FULLSCREEN: (state, item) => {
    state.fullscreen = item
  },
  SET_CURRENTINDEX: (state, item) => {
    state.currentindex = item
  },
  SET_PLAYSONG: (state, item) => {
    state.playsong = item
  },
  SET_PLAY: (state, item) => {
    state.playing = item
  }
}

const actions = {
  playmusic: ({ commit, state }, { list, index }) => {
    commit('SET_SONGLIST', list)
    commit('SET_FULLSCREEN', true)
    commit('SET_CURRENTINDEX', index)
    commit('SET_PLAYSONG', list[index])
    commit('SET_PLAY', true)
  }
}

export default {
  state,
  mutations,
  actions
}
