import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { EmployeeWithoutId } from '../../../../redux/slicers/type'
import { ShowOptions } from '../ShowOptions'

export function RankOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string
}) {
  const degree = useAppSelector((state) => state.option.degree)
  return (
    <ShowOptions
      labelName={'等　　級'}
      id={'degree_id'}
      optionItem={degree}
      onChange={onChange}
      value={value}
    />
  )
}
