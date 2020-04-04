import axios from '@/request/index'
export const loadsinger = (limit) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { limit },
      url: '/top/artists'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// export const loadsingertype = (limit) => {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'get',
//       params: { limit },
//       url: '/artist/list'
//     }).then(res => {
//       resolve(res.data)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

// 获取对应歌手的歌曲
export const loadsingermusic = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { id },
      url: '/artists'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
