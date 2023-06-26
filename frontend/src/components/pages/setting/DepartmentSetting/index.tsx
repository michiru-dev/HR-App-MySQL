import React from 'react'
import { ShowSettingList } from '../ShowSettingList'
import { useAppSelector } from '../../../../redux/hooks'

export function DepartmentSetting() {
  const department = useAppSelector((state) => state.option.departments)

  return (
    <ShowSettingList settingType={department} collectionName={'departments'} />
  )
}
