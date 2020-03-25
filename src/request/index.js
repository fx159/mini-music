import axios from 'axios'

const baseurl = 'http://localhost:3000'
const instance = axios.create({
  baseURL: baseurl,
  withCredentials: true
})
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

export default instance
