import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowSettingList } from '../ShowSettingList'
export function ContractSetting() {
  const contractType = useAppSelector((state) => state.option.contractType)

  return (
    <ShowSettingList
      settingType={contractType}
      collectionName={'contractType'}
    />
  )
}
