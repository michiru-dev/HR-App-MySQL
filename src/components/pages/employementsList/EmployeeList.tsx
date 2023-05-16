import React, { useEffect } from 'react'
import { fetchEmployeeData } from '../../../redux/employeeDataSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

function EmployeeList() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEmployeeData())
  }, [])

  const employeeData = useAppSelector((state) => state.employee.employeeData)

  return (
    <div>
      {employeeData.map((employee) => (
        <li key={employee.id}>
          <div>{employee.firstName}</div>
          <div>{employee.lastName}</div>
          <div>{employee.position}</div>
          <div>{employee.rank}</div>
        </li>
      ))}
    </div>
  )
}

export default EmployeeList
