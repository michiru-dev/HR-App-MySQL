import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'

function PositionsSetting() {
  const position = useAppSelector((state) => state.option.positionType)

  return <ShowInputs settingType={position} collectionName={'positionType'} />
}

export default PositionsSetting
