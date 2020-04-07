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
