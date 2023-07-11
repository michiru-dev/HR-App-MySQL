import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Button'
import { getTokenInfo } from '../../../../utils'

function Header() {
  const handleLogoutButton = () => {
    localStorage.removeItem('token')
  }

  //tokenがあればログイン後ということ
  const isLogin = getTokenInfo().token

  return (
    <>
      <header>
        <Link to={'/home'} className="headerHomeButton">
          <h3>
            <img
              src="../../../../../../meetingIcon.png"
              alt="headerIcon"
              className="icon"
            ></img>
            人事管理 HR app
          </h3>
          {isLogin && (
            <Button
              text={'ログアウト'}
              onClick={handleLogoutButton}
              className="logoutButton"
            />
          )}
        </Link>
      </header>
    </>
  )
}

export default Header
