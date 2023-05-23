import React from 'react'
import {
  EmployeeInfoRegister,
  employeeInfoBase,
} from '../../common/EmployeeInforRegister'

export function EmployeeInfoEditModal(props: employeeInfoBase) {
  return (
    <div>
      <EmployeeInfoRegister {...props} />
    </div>
  )
}

//...propsは渡ってきたプロップスと渡すプロップスの名前が全て一緒だったらこんな感じでできる
