import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'

function RankOptions() {
  const rank = useAppSelector((state) => state.option.rank)
  return <ShowOptions labelName={'等級'} id={'rank'} optionItem={rank} />
}

export default RankOptions
