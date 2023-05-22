import React, { useState } from 'react'
import { SearchResult } from './SearchResult'
import { useAppDispatch } from '../../../redux/hooks'
import { fetchSearchedEmployee } from '../../../redux/slicers/employeeDataSlice'
import { Button } from '../UI/Button'

function Search() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useAppDispatch()

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleOnclick = () => {
    dispatch(fetchSearchedEmployee(searchInput))
    setSearchInput('')
  }

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
