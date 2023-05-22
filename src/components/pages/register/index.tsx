import React from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { addEmployeeData } from '../../../redux/slicers/employeeDataSlice'
import { EmployeeInfoRegister } from '../../common/EmployeeInforRegister'
import { EmployeeWithoutDocId } from '../../../redux/slicers/type'

function Register() {
  const dispatch = useAppDispatch()

  const handleRegister = (registerInfo: EmployeeWithoutDocId) => {
    alert('登録されました')
    dispatch(addEmployeeData(registerInfo))
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
