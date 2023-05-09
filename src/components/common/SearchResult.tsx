import React from 'react'
import { useAppSelector } from '../../redux/hooks'

function SearchResult() {
  const employeeData = useAppSelector((state) => state.employee.employeeData)
  console.log(employeeData)

  return (
    <div>
      <ul>
        {employeeData.map((data: any) => {
          return (
            <li key={data.id}>
              <li>{data.firstName}</li>
              <li>{data.lastName}</li>
              <li>{data.contractType}</li>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchResult
