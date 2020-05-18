import axios from '@/request/index'
export const loadserachlist = (keywords) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { keywords },
      url: '/search/hot'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
