import axios from 'axios'
import store from '../store/index'

let host = 'http://localhost:8090'

export const apiRegister = params => {
  return axios.post(`${host}/admin/register`, params)
}

export const apiLogin = params => {
  return axios.post(`${host}/admin/login`, params)
}
