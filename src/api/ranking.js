import axios from '@/request/index'

export const loadranktoplist = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/toplist',
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loadranklistcontent = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/playlist/detail',
      method: 'get',
      params: { id }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
