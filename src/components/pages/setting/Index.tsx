import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { ContractSetting } from './ContractSetting'
import { DepartmentSetting } from './DepartmentSetting'
import { PositionsSetting } from './PositionSetting'
import { RankSetting } from './RankSetting'

function Setting() {
  return (
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
  )
}

export default Setting
