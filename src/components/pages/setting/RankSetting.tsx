import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'

function RankSetting() {
  const rank = useAppSelector((state) => state.option.rankType)

  return <ShowInputs settingType={rank} collectionName={'rankType'} />
}

export default RankSetting
