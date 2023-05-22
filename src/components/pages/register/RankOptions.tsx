import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../redux/employeeDataSlice'

function RankOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}) {
  const rank = useAppSelector((state) => state.option.rankType)
  return (
    <ShowOptions
      labelName={'等級'}
      id={'rank'}
      optionItem={rank}
      onChange={onChange}
      value={value}
    />
  )
}

export default RankOptions
