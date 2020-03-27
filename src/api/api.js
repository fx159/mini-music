import axios from '../request/index'

export const loadserachhot = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/search/hot',
      method: 'get'
    }).then(res => {
      resolve(res.data.result.hots)
    }).catch(err => {
      reject(err)
    })
  })
}
export const loadbanner = (parms) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/banner',
      type: parms
    }).then(res => {
      resolve(res.data.banners)
    }).catch(err => {
      reject(err)
    })
  })
}
