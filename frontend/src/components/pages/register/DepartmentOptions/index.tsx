import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowOptions } from '../ShowOptions'
import { EmployeeWithoutId } from '../../../../redux/slicers/type'

export function DepartmentOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string
}) {
  const department = useAppSelector((state) => state.option.departments)
  return (
    <ShowOptions
      labelName={'部　　署'}
      id={'department_id'}
      optionItem={department}
      onChange={onChange}
      value={value}
    />
  )
}
