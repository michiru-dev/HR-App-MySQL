import React, { useState } from 'react'
import Button from './Button'
import { SearchResult } from './SearchResult'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { searchEmployee } from '../../redux/employeeDataSlice'

function Search() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useAppDispatch()

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleOnclick = () => {
    setSearchInput('')
    dispatch(searchEmployee(searchInput))
  }
  // const employeeData = useAppSelector((state) => state.employee.employeeData)
  // const searchedEmployeeData = useAppSelector(
  //   (state) => state.employee.searchedEmployeeData
  // )

  // console.log(employeeData)

  // console.log(searchedEmployeeData)

  // console.log(searchInput)

  return (
    <>
      <input
        value={searchInput}
        type="search"
        onChange={(e) => {
          handleSearchInput(e)
        }}
        placeholder="社員名を入力してください"
      />
      <Button type="button" text={'検索'} onClick={handleOnclick} />
      <SearchResult />
    </>
  )
}

export { Search }
