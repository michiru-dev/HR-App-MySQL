import React from 'react'
import ShowOptions from './ShowOptions'
import { useAppSelector } from '../../../redux/hooks'

function DepartmentOptions() {
  const department = useAppSelector((state) => state.option.department)
  return (
    <ShowOptions labelName={'部署'} id={'department'} optionItem={department} />
  )
}

export default DepartmentOptions
