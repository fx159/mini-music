import axios from '../request/index'

export const loadtest = () => {
  return axios({
    url: '/search/hot',
    method: 'get'
  })
}
