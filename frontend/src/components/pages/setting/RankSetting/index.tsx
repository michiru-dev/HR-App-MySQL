import React from 'react'
import { ShowSettingList } from '../ShowSettingList'
import { useAppSelector } from '../../../../redux/hooks'

export function RankSetting() {
  const degree = useAppSelector((state) => state.option.degree)

  return <ShowSettingList settingType={degree} collectionName={'degree'} />
}
