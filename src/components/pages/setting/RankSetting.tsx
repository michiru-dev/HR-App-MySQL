import React from 'react'
import ShowInputs from './ShowInputs'
import { useAppSelector } from '../../../redux/hooks'
import {
  addRankType,
  deleteRankType,
  editRankType,
} from '../../../redux/optionsSlice'

function RankSetting() {
  const rank = useAppSelector((state) => state.option.rank)

  return (
    <ShowInputs
      settingType={rank}
      onSave={editRankType}
      onDelete={deleteRankType}
      onAdd={addRankType}
    />
  )
}

export default RankSetting
