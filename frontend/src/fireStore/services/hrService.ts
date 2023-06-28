import { axiosInstance } from '../../axios'

//contract取得
export const fetchContract = async () => {
  return await axiosInstance
    .get('/contract')
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//departments取得
export const fetchDepartments = async () => {
  return await axiosInstance
    .get('/departments')
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//degree取得
export const fetchdegree = async () => {
  return await axiosInstance
    .get('/degree')
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

//positions取得
export const fetchPositions = async () => {
  return await axiosInstance
    .get('/positions')
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}
