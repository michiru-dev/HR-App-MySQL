import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../../redux/slicers/type'
import { ShowOptions } from '../ShowOptions'

export function RankOptions({
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
