const getters = {
  songlist: state => state.song.songlist,
  fullscreen: state => state.song.fullscreen,
  playsong: state => state.song.playsong,
  playing: state => state.song.playing
}

export default getters
