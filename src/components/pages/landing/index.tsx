import React from 'react'
import { Search } from '../Search'
import { LinkButton } from '../../common/UI/LinkButtonTest'
import Layout from '../../common/UI/Layout'
import { useAppSelector } from '../../../redux/hooks'
import LoadingSpinner from '../../common/UI/LoadingSpinner'

function LandingPage() {
  const isLoading = useAppSelector((state) => state.employee.isLoading)

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Layout>
        <div className="landingPageWrapper">
          <div className="menu">
            <LinkButton link={'employeeList'} text={'社員一覧'} />
            <LinkButton link={'register'} text={'社員登録'} />
            <LinkButton link={'setting'} text={'各種設定'} />
          </div>
          <div className="searchWrapper">
            <Search />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default LandingPage
