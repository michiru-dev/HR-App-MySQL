//token設置
export const getTokenInfo = () => {
  const token = localStorage.getItem('token')
  return { token, headers: { Authorization: `Bearer ${token}` } }
}
