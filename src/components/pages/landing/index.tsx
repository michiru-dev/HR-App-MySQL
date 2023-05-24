import React from 'react'
import { Search } from '../../common/Search'
import { LinkButton } from '../../common/UI/LinkButton'

function LandingPage() {
  return (
    <div className="landingPageWrapper">
      <div className="menu">
        <LinkButton link={'employeeList'} text={'社員一覧'} />
        <LinkButton link={'register'} text={'社員登録'} />
        <LinkButton link={'setting'} text={'各種設定'} />
      </div>
      <div className="searchWrapper">
        <Search />
      </div>
      <footer>© 2023 Michiru.I</footer>
    </div>
  )
}

export default LandingPage
