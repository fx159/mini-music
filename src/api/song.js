import axios from '@/request/index'

export const playmusic = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { id },
      url: '/song/url'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loadmusicmsg = (ids) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { ids },
      url: '/song/detail'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loadsongwords = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { id },
      url: '/lyric'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
