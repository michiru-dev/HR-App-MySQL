import React from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { addEmployeeData } from '../../../redux/slicers/employeeDataSlice'
import { EmployeeInfoRegister } from '../../common/EmployeeInforRegister'
import { EmployeeWithoutId } from '../../../redux/slicers/type'
import Layout from '../../common/UI/Layout'

function Register() {
  const dispatch = useAppDispatch()

  const handleRegister = (registerInfo: EmployeeWithoutId) => {
    alert('登録されました')
    dispatch(addEmployeeData(registerInfo))
  }

  return (
    <Layout>
      <div className="registerBox">
        <EmployeeInfoRegister
          buttonText="登録"
          handleButtonClick={handleRegister}
          isClearInput={true}
        />
      </div>
    </Layout>
  )
}

export default Register
