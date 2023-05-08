import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'
import {
  addDepartmentType,
  deleteDepartmentType,
  editDepartmentType,
} from '../../../redux/optionsSlice'

function DepartmentSetting() {
  const department = useAppSelector((state) => state.option.department)

  return (
    <ShowInputs
      settingType={department}
      onSave={editDepartmentType}
      onDelete={deleteDepartmentType}
      onAdd={addDepartmentType}
    />
  )
}

export default DepartmentSetting
