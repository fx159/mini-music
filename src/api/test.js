import axios from '../request/index'

export const loadserachhot = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/search/hot',
      method: 'get'
    }).then(res => {
      resolve(res.data.result.hots)
    }).catch(err => {
      console.log(err)
    })
  })
}
