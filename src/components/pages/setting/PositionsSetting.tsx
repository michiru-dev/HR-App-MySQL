import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'
import {
  addPositionType,
  deletePositionType,
  editPositionType,
} from '../../../redux/optionsSlice'

function PositionsSetting() {
  const position = useAppSelector((state) => state.option.position)

  return (
    <ShowInputs
      settingType={position}
      onSave={editPositionType}
      onDelete={deletePositionType}
      onAdd={addPositionType}
    />
  )
}

export default PositionsSetting
