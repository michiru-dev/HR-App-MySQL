import React from 'react'
import {
  EmployeeInfoRegister,
  EmployeeInfoBase,
} from '../../common/EmployeeInforRegister'

export function EmployeeInfoEditModal(props: EmployeeInfoBase) {
  return (
    <div className="employeeModalBox">
      <EmployeeInfoRegister {...props} />
    </div>
  )
}

//...propsは渡ってきたプロップスと渡すプロップスの名前が全て一緒だったらこんな感じでできる
