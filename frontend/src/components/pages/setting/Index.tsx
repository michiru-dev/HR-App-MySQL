import React, { useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { ContractSetting } from './ContractSetting'
import { DepartmentSetting } from './DepartmentSetting'
import { PositionsSetting } from './PositionSetting'
import { RankSetting } from './RankSetting'
import Layout from '../../common/UI/Layout'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import LoadingSpinner from '../../common/UI/LoadingSpinner'
import { fetchHrOptionType } from '../../../redux/slicers/optionsSlice'

function Setting() {
  const isLoading = useAppSelector((state) => state.option.isLoading)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHrOptionType())
  }, [dispatch])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Layout>
        <div className="settingBox">
          <Tabs>
            <TabList>
              <Tab>契約形態</Tab>
              <Tab>部署</Tab>
              <Tab>等級</Tab>
              <Tab>役職</Tab>
            </TabList>

            <TabPanel>
              <ContractSetting />
            </TabPanel>
            <TabPanel>
              <DepartmentSetting />
            </TabPanel>
            <TabPanel>
              <RankSetting />
            </TabPanel>
            <TabPanel>
              <PositionsSetting />
            </TabPanel>
          </Tabs>
        </div>
      </Layout>
    </>
  )
}

export default Setting
