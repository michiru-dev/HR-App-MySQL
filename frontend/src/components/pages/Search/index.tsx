import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  deleteEmployeeData,
  editEmployeeData,
  fetchSearchedEmployee,
} from '../../../redux/slicers/employeeDataSlice'
import { Button } from '../../common/UI/Button'
import EmployeeInfoList, {
  HandleSaveButtonClick,
} from '../../common/EmployeeInfoList.tsx'
import EmployeeNotFound from './EmployeeNotFound'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )
  const foundEmployee = useAppSelector(
    (state) => state.employee.searchedEmployeeData
  )
  const isLoading = useAppSelector((state) => state.employee.isLoading)
  const dispatch = useAppDispatch()

  //検索インプットの値
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  //クエリパラメーター作成
  const navigate = useNavigate()
  const goToSearchResult = () =>
    navigate({
      pathname: '/home',
      search: `?searchedName=${searchInput}`,
    })

  //クエリパラメータ取得
  const [searchParams] = useSearchParams()
  const searchedName = searchParams.get('searchedName') //ここの方は自動解決。stringを設定してもnullは消えない

  //検索ボタンが押された時
  const handleSearchButtonClick = () => {
    dispatch(fetchSearchedEmployee(searchInput))
    setSearchInput('')
    goToSearchResult()
  }

  //更新がかかった時
  useEffect(() => {
    if (searchedName === null) return
    dispatch(fetchSearchedEmployee(searchedName))
  }, [])

  //編集ボタンが押された時
  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
  }

  //保存ボタンが押された時
  const handleSaveButtonClick: HandleSaveButtonClick = async (
    updatedEmployeeData,
    id
  ) => {
    if (typeof id === 'undefined' || searchedName === null) return
    await dispatch(editEmployeeData({ updatedEmployeeData, id }))
    await dispatch(fetchSearchedEmployee(searchedName)) //編集して上書きしてきたデータを取得
    //ここの引数がなぜsetStateのsearchInputではないかというと、searchInputはすでに変更している可能性があるため
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
        <div className="tooltip">
          漢字またはカタカナで氏名を検索してください
        </div>
        <Button type="button" text={'検索'} onClick={handleSearchButtonClick} />
      </div>
      {searchedName !== null &&
        (isLoading === false && foundEmployee.length === 0 ? (
          // isLoadingも条件に入れないとfoundemployeeがセットされるまでの時間にlengthが0になりnotfoundが表示されてしまう
          <EmployeeNotFound />
        ) : (
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
        ))}
    </>
  )
}

export { Search }
