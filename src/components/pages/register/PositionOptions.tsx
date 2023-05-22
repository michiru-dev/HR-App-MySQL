import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../redux/employeeDataSlice'

function PositionOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}) {
  const position = useAppSelector((state) => state.option.positionType)
  return (
    <ShowOptions
      labelName={'役職'}
      id={'position'}
      optionItem={position}
      onChange={onChange}
      value={value}
    />
  )
}

export default PositionOptions
