import React, { useEffect, useState } from 'react'
import {
  deleteEmployeeData,
  editEmployeeData,
  fetchEmployeeData,
} from '../../../redux/slicers/employeeDataSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { EmployeeWithoutDocId } from '../../../redux/slicers/type'
import EmployeeInfoList from '../../common/EmployeeInfoList.tsx'
import Layout from '../../common/UI/Layout'

function EmployeeList() {
  const dispatch = useAppDispatch()
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )

  const employeeData = useAppSelector((state) => state.employee.employeeData)

  useEffect(() => {
    dispatch(fetchEmployeeData())
  }, [])

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
    await dispatch(editEmployeeData({ employee, docId }))
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
    <Layout>
      <div className="employeeListBox">
        <EmployeeInfoList
          employeeData={employeeData}
          handleEditClick={handleEditClick}
          handleSaveButtonClick={handleSaveButtonClick}
          handleCloseButton={handleCloseButton}
          handleDeleteButton={handleDeletButton}
          editEmployeeIndex={editEmployeeIndex}
        />
      </div>
    </Layout>
  )
}

export default EmployeeList
