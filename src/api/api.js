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


export const apiCreateMemberType = params => {
  return axios.post(`${host}/member/createMemberType`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListMemberType = params => {
  return axios.post(`${host}/member/listMemberType`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListAllUser = params => {
  return axios.post(`${host}/admin/listAllUser`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiCreateTour = params => {
  return axios.post(`${host}/tour/createTour`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListSpecialPriceTour = params => {
  return axios.post(`${host}/tour/listSpecialPriceTour`, params)
}
