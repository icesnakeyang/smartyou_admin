import axios from 'axios'
import store from '../store/index'

let host = 'http://localhost:8090'
// let host = 'https://www.wegou1688.com'

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
  return axios.post(`${host}/admin/createMemberType`, params, {
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

export const apiGetMemberType = params => {
  return axios.post(`${host}/admin/getMemberType`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiUpdateMemberType = params => {
  return axios.post(`${host}/admin/updateMemberType`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiDeleteMemberType = params => {
  return axios.post(`${host}/admin/deleteMemberType`, params, {
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

export const apiListAllApiTrainOrder = params => {
  return axios.post(`${host}/admin/listAllApiTrainOrder`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiGetTrainOrderDetail = params => {
  return axios.post(`${host}/admin/getTrainOrderDetail`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiStatisticTrain = params => {
  return axios.post(`${host}/admin/statisticTrain`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiSyncTrainOrder = params => {
  return axios.post(`${host}/admin/syncTrainOrder`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiGetTourDetail = params => {
  return axios.post(`${host}/tour/getTourDetail`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListRentVehicle = params => {
  return axios.post(`${host}/admin/listRentVehicle`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiGetRentVehicle = params => {
  return axios.post(`${host}/admin/getRentVehicle`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiProcessRentVehicle = params => {
  return axios.post(`${host}/admin/processRentVehicle`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiUpdateTour = params => {
  return axios.post(`${host}/tour/updateTour`, params, {
    headers: {
      token: store.state.gogo_smartyou_token
    }
  })
}

export const apiListTourOrder=params=>{
  return axios.post(`${host}/admin/tour/listTourOrder`, params,{
    headers:{
      token:store.state.gogo_smartyou_token
    }
  })
}


