import React from 'react'
import { ShowSettingList } from '../ShowSettingList'
import { useAppSelector } from '../../../../redux/hooks'

export function RankSetting() {
  const rank = useAppSelector((state) => state.option.level)

  return <ShowSettingList settingType={rank} collectionName={'level'} />
}
