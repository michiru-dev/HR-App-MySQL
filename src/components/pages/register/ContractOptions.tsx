import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'

function ContractOptions() {
  const contract = useAppSelector((state) => state.option.contractType)
  return (
    <ShowOptions
      labelName={'契約形態'}
      id={'contract-type'}
      optionItem={contract}
    />
  )
}

export default ContractOptions
