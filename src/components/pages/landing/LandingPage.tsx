import React from 'react'
import Search from '../../common/Search'
import Button from '../../common/Button'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <Search />
      <Link to={'register'}>
        <Button text={'新規登録'} />
      </Link>
      <Link to={'setting'}>
        <Button text={'設定'} />
      </Link>
    </div>
  )
}

export default LandingPage
