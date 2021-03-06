import { playmode } from '@/utils/config'

const state = {
  songlist: [],
  sequenlist: [],
  fullscreen: false,
  currentindex: '',
  playsong: '',
  playing: 'false',
  mode: playmode.loop,
  collect: []
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
    console.log(item)
    if (item.songs) {
      state.playsong = item.songs[0]
    } else {
      state.playsong = item
    }
  },
  SET_PLAY: (state, item) => {
    state.playing = item
  },
  SET_MODE: (state, item) => {
    state.mode = item
  },
  SET_SEQUENLIST: (state, item) => {
    state.sequenlist = item
  },
  SET_COLLECT: (state, item) => {
    state.collect = item
  }
}

const actions = {
  playmusic: ({ commit, state }, { list, index, playsong }) => {
    commit('SET_SONGLIST', list)
    commit('SET_FULLSCREEN', true)
    commit('SET_SEQUENLIST', list)
    commit('SET_CURRENTINDEX', index)
    commit('SET_PLAYSONG', list[index])
    commit('SET_PLAY', true)
  },
  playnext: ({ commit, state }, { index, item }) => {
    commit('SET_CURRENTINDEX', index)
    commit('SET_PLAYSONG', state.songlist[index])
    commit('SET_PLAY', item)
  }
}

export default {
  state,
  mutations,
  actions
}
