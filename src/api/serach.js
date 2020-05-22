import axios from '@/request/index'
export const loadserachhot = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/search/hot'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loadserachlist = (keywords) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: { keywords },
      url: '/search'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
