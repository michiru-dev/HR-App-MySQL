import React, { useState } from 'react'
import { axiosInstance } from '../../../axios'
import { Button } from '../../common/UI/Button'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleChangeId = (e: any) => {
    setUser_id(e.target.value)
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const handleLoginButtonClick = async (user_id: string, password: string) => {
    await axiosInstance
      .post('/login', { user_id, password })
      .then((res) => {
        const token = res.data
        localStorage.setItem('token', token)
        navigate('/home')
      })
      .catch(async (err) => {
        console.log(err)
        setUser_id('')
        setPassword('')
      })
  }

  return (
    <div>
      <input
        type="text"
        placeholder="user ID"
        value={user_id}
        onChange={(e) => handleChangeId(e)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => handleChangePassword(e)}
      />
      {/* linkとonClickはどちらもクリック時の挙動を指してるので一緒にはおかない */}
      <Button
        text={'ログイン'}
        onClick={() => handleLoginButtonClick(user_id, password)}
      />
    </div>
  )
}
