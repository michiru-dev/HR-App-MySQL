import React from 'react'
import { Search } from '../../common/Search'
import LinkButton from '../../common/LinkButton'

function LandingPage() {
  return (
    <div>
      <Search />
      <LinkButton link={'register'} text={'新規登録'} />
      <LinkButton link={'setting'} text={'各種設定'} />
    </div>
  )
}

export default LandingPage
