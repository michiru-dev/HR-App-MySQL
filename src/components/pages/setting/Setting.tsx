import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import ContractSetting from './ContractSetting'
import RankSetting from './RankSetting'
import PositionsSetting from './PositionsSetting'
import DepartmentSetting from './DepartmentSetting'

// const useContractTypeInputs = () => {
//   const {contractInput, setContractInput, editIndex, setEditIndex,editedName, setEditedName} = useSettingInputs()
//   const [saralyType, setSaralyType] = useState<string>('')

//   return {}
// }

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
