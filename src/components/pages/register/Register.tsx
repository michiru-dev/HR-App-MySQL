import React from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { addEmployee } from '../../../redux/employeeDataSlice'
import type { EmployeeWithoutId } from '../../../redux/employeeDataSlice'
import EmployeeInfoRegister from '../../common/EmployeeInfoRegister'

function Register() {
  const dispatch = useAppDispatch()

  const handleRegister = (registerInfo: EmployeeWithoutId) => {
    alert('登録されました')
    dispatch(addEmployee(registerInfo))
  }

  return (
    <div>
      <EmployeeInfoRegister
        buttonText="登録"
        handleButtonClick={handleRegister}
        isClearInput={true}
      />
    </div>
  )
}

export default Register
