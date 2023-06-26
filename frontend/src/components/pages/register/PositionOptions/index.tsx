import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../../redux/slicers/type'
import { ShowOptions } from '../ShowOptions'

export function PositionOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}) {
  const position = useAppSelector((state) => state.option.positions)
  return (
    <ShowOptions
      labelName={'役　　職'}
      id={'position'}
      optionItem={position}
      onChange={onChange}
      value={value}
    />
  )
}
