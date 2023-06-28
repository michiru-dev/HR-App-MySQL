import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowSettingList } from '../ShowSettingList'
export function ContractSetting() {
  const contract = useAppSelector((state) => state.option.contract)

  return <ShowSettingList settingType={contract} collectionName={'contract'} />
}
