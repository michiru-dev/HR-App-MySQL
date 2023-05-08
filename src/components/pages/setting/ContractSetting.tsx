import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'
import {
  addContractType,
  deleteContractType,
  editContractType,
} from '../../../redux/optionsSlice'

function ContractSetting() {
  const contractType = useAppSelector((state) => state.option.contractType)

  return (
    <ShowInputs
      settingType={contractType}
      onSave={editContractType}
      onDelete={deleteContractType}
      onAdd={addContractType}
    />
  )
}

export default ContractSetting
