import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'

function ContractSetting() {
  const contractType = useAppSelector((state) => state.option.contractType)

  return (
    <ShowInputs settingType={contractType} collectionName={'contractType'} />
  )
}

export default ContractSetting
