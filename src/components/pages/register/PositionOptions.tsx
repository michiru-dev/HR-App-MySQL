import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'

function PositionOptions() {
  const position = useAppSelector((state) => state.option.position)
  return (
    <ShowOptions labelName={'役職'} id={'position'} optionItem={position} />
  )
}

export default PositionOptions
