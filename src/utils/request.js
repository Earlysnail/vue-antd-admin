import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'
const service = axios.create({
  // baseURL: 'http://192.168.199.245:8080',
  baseURL: 'http://aliyun.surine.cn:8082',
  // baseURL: 'http://192.168.199.169:8080',
  timeout: 100000,
})
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
service.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
service.interceptors.request.use(
  config => {
    if (store.getters.token || localStorage.getItem('token')) {
      config.headers['token'] = store.getters.token || localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 2001) {
      console.log('出错啦' + res.msg)
      return Promise.reject(new Error(res.msg || '出错啦'))
    } else {
      return res
    }
  },
  error => {
    console.log('出错啦' + error)
    return Promise.reject(error)
  }
)

export default service