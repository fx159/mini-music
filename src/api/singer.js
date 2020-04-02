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
