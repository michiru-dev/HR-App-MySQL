import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowOptions } from '../ShowOptions'
import { EmployeeWithoutDocId } from '../../../../redux/slicers/type'

export function DepartmentOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}) {
  const department = useAppSelector((state) => state.option.departmentType)
  return (
    <ShowOptions
      labelName={'部　　署'}
      id={'department'}
      optionItem={department}
      onChange={onChange}
      value={value}
    />
  )
}
