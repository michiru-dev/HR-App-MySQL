import React from 'react'
import { useAppSelector } from '../../redux/hooks'

function SearchResult() {
  const foundEmployee = useAppSelector(
    (state) => state.employee.searchedEmployeeData
  )

  if (foundEmployee.length === 0) {
    return null // データがない場合は何も表示しない
  }

  return (
    <div>
      <ul>
        {foundEmployee.map((data) => (
          <li key={data.id}>
            <ul>
              <li>{data.firstName}</li>
              <li>{data.lastName}</li>
              <li>{data.contractType}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { SearchResult }