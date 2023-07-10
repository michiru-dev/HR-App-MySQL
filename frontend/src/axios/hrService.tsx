import { axiosInstance } from '.'
import { getTokenInfo } from '../utils'

//contract取得
export const fetchContract = async () => {
  const { headers } = getTokenInfo()
  return await axiosInstance
    .get('/contract', { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//departments取得
export const fetchDepartments = async () => {
  const { headers } = getTokenInfo()
  return await axiosInstance
    .get('/departments', { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//degree取得
export const fetchdegree = async () => {
  const { headers } = getTokenInfo()
  return await axiosInstance
    .get('/degree', { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//positions取得
export const fetchPositions = async () => {
  const { headers } = getTokenInfo()
  return await axiosInstance
    .get('/positions', { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}
