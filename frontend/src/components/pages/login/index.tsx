import React, { useState } from 'react'
import { LinkButton } from '../../common/UI/LinkButton'

export function Login() {
  const [idText, setIdText] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const handleChangeId = (e: any) => {
    setIdText(e.target.value)
  }

  const handleChangePassword = (e: any) => {
    setPasswordText(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="user ID"
        value={idText}
        onChange={(e) => handleChangeId(e)}
      />
      <input
        type="text"
        placeholder="password"
        value={passwordText}
        onChange={(e) => handleChangePassword(e)}
      />

      <LinkButton
        link={'home'}
        text={'ログイン'}
        onClick={() => console.log(idText, passwordText)}
      />
    </div>
  )
}
