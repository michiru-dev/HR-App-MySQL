import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <header>
        <Link to={'/home'} className="headerHomeButton">
          <h3>
            <img src="../../../../../../meetingIcon.png" className="icon"></img>
            人事管理 HR app
          </h3>
        </Link>
      </header>
    </>
  )
}

export default Header
