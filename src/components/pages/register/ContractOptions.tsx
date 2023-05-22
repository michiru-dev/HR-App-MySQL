import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../redux/employeeDataSlice'

function ContractOptions({
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

export default ContractOptions
