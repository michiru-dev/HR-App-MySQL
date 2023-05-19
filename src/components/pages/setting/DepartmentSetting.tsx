import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'

function DepartmentSetting() {
  const department = useAppSelector((state) => state.option.departmentType)

  return (
    <ShowInputs settingType={department} collectionName={'departmentType'} />
  )
}

export default DepartmentSetting
