import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { ShowOptions } from '../ShowOptions'
import { EmployeeWithoutId } from '../../../../redux/slicers/type'

export function ContractOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string | null
}) {
  const contract = useAppSelector((state) => state.option.contract)
  //reduxのcontractの配列を取得
  return (
    <ShowOptions
      labelName={'契約形態'}
      id={'contract_id'}
      optionItem={contract}
      onChange={onChange}
      value={value}
    />
  )
}
