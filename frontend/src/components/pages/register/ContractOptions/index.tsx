import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowOptions } from '../ShowOptions'
import { EmployeeWithoutDocId } from '../../../../redux/slicers/type'

export function ContractOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}) {
  const contract = useAppSelector((state) => state.option.contractType)
  return (
    <ShowOptions
      labelName={'契約形態'}
      id={'contractType'}
      optionItem={contract}
      onChange={onChange}
      value={value}
    />
  )
}
