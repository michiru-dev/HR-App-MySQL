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
import { useNavigate, useSearchParams } from 'react-router-dom'

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

  //クエリパラメーター作成
  const navigate = useNavigate()
  const goToSearchResult = () =>
    navigate({
      pathname: '/',
      search: `?searchedName=${searchInput}`,
    })

  //クエリパラメータ取得
  const [searchParams, setSearchParams] = useSearchParams()
  const searchedName = searchParams.get('searchedName') //ここの方は自動解決。stringを設定してもnullは消えない

  //検索ボタンが押された時
  const handleSearchButtonClick = () => {
    dispatch(fetchSearchedEmployee(searchInput))
    setSearchInput('')
    setIsSearchResultShow(true)
    goToSearchResult()
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
    if (typeof docId === 'undefined' || searchedName === null) return
    await dispatch(editEmployeeData({ employee, docId }))
    await dispatch(fetchSearchedEmployee(searchedName)) //編集して上書きしてきたデータを取得
    setEditEmployeeIndex(null)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
  }

  //削除ボタンが押された時
  const handleDeleteButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined' || searchedName === null) return
    await dispatch(deleteEmployeeData(docId))
    await dispatch(fetchSearchedEmployee(searchedName)) //古いデータを見た目からもなくす
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
        <div className="employeeInfoListWrapper">
          <EmployeeInfoList
            employeeData={foundEmployee}
            handleEditClick={handleEditClick}
            handleSaveButtonClick={handleSaveButtonClick}
            handleCloseButton={handleCloseButton}
            handleDeleteButton={handleDeleteButton}
            editEmployeeIndex={editEmployeeIndex}
          />
        </div>
      )}
    </>
  )
}

export { Search }
