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
export const loadbanner = (type) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/banner',
      parms: { type }
    }).then(res => {
      resolve(res.data.banners)
    }).catch(err => {
      reject(err)
    })
  })
}
export const loadplayhot = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/playlist/hot',
      method: 'get'
    }).then(res => {
      resolve(res.data.tags)
    }).catch(err => {
      reject(err)
    })
  })
}
export const loaddetail = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/playlist/detail',
      params: { id },
      method: 'get'// 封装的get请求注意传入的参数名为parms，且属性值为对象
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
