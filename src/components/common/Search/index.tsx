import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  deleteEmployeeData,
  editEmployeeData,
  fetchEmployeeData,
  fetchSearchedEmployee,
} from '../../../redux/slicers/employeeDataSlice'
import { Button } from '../UI/Button'
import EmployeeInfoList from '../EmployeeInfoList.tsx'
import { EmployeeWithoutDocId } from '../../../redux/slicers/type'
import EmployeeNotFound from './EmployeeNotFound'

function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )
  const [isSearchResultShow, setIsSearchResultShow] = useState(false)

  const dispatch = useAppDispatch()

  //検索インプットの値
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  //検索ボタンが押された時
  const handleSearchButtonClick = () => {
    dispatch(fetchSearchedEmployee(searchInput))
    setSearchInput('')
    setIsSearchResultShow(true)
  }

  const foundEmployee = useAppSelector(
    (state) => state.employee.searchedEmployeeData
  )
  //編集ボタンが押された時
  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
  }

  //保存ボタンが押された時
  const handleSaveButtonClick = async (
    employee: EmployeeWithoutDocId,
    docId: string | undefined
  ) => {
    if (typeof docId === 'undefined') return
    await dispatch(editEmployeeData({ newData: { ...employee, docId } }))
    await dispatch(fetchEmployeeData()) //編集して上書きしてきたデータを取得
    setEditEmployeeIndex(null)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
  }

  //削除ボタンが押された時
  const handleDeletButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined') return
    await dispatch(deleteEmployeeData(docId))
    await dispatch(fetchEmployeeData()) //古いデータを見た目からもなくす
    setEditEmployeeIndex(null)
  }

  return (
    <>
      <div className="searchInputAndButton">
        <input
          value={searchInput}
          type="search"
          onChange={(e) => {
            handleSearchInput(e)
          }}
          placeholder="社員名を入力してください"
          className="searchInput"
        />
        <Button type="button" text={'検索'} onClick={handleSearchButtonClick} />
      </div>
      {isSearchResultShow && foundEmployee.length === 0 && <EmployeeNotFound />}
      {isSearchResultShow && foundEmployee.length > 0 && (
        <EmployeeInfoList
          employeeData={foundEmployee}
          handleEditClick={handleEditClick}
          handleSaveButtonClick={handleSaveButtonClick}
          handleCloseButton={handleCloseButton}
          handleDeletButton={handleDeletButton}
          editEmployeeIndex={editEmployeeIndex}
        />
      )}
    </>
  )
}

export { Search }
