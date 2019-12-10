import axios from 'axios'
import store from '../store/index'

let host = 'http://localhost:8090'

export const apiRegister = params => {
  return axios.post(`${host}/admin/register`, params)
}

export const apiLogin = params => {
  return axios.post(`${host}/admin/login`, params)
}

export const apiStatisticUsers = params => {
  return axios.post(`${host}/admin/statisticUsers`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListAllTrainOrder = params => {
  return axios.post(`${host}/admin/listAllTrainOrder`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiUpdateTrainMemberSettings = params => {
  return axios.post(`${host}/admin/updateTrainMemberSettings`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}
