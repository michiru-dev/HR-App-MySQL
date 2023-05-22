import React, { useEffect, useState } from 'react'
import {
  EmployeeBase,
  EmployeeWithoutDocId,
  deleteEmployeeData,
  editEmployeeData,
  fetchEmployeeData,
} from '../../../redux/employeeDataSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Button from '../../common/Button'
import EmployeeInfoRegister from '../../common/EmployeeInfoRegister'

function EmployeeList() {
  const dispatch = useAppDispatch()
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )
  const employeeData = useAppSelector((state) => state.employee.employeeData)

  useEffect(() => {
    dispatch(fetchEmployeeData())
  }, [])

  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
  }

  //保存ボタンが押された時
  const handleButtonClick = async (
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

  // const handleButtonClick2 = (registerInfo: EmployeeBase) =>
  // handleButtonClick(registerInfo, employee.docId)

  return (
    <div>
      {employeeData.map((employee, index) => {
        return (
          <li key={employee.docId}>
            {editEmployeeIndex === index ? (
              //編集中のindexとmapのindexが一緒だったら編集画面
              <EmployeeInfoRegister
                buttonText="保存"
                handleButtonClick={(registerInfo) =>
                  handleButtonClick(registerInfo, employee.docId)
                } //この無名関数は上のhandleButtonClick2と同じ
                handleCloseButton={handleCloseButton}
                handleDeletButton={() => handleDeletButton(employee.docId)}
                employee={employee}
              />
            ) : (
              <>
                <div>{employee.lastName}</div>
                <div>{employee.firstName}</div>
                <div>{employee.position}</div>
                <div>{employee.rank}</div>
                <Button text={'編集'} onClick={() => handleEditClick(index)} />
              </>
            )}
          </li>
        )
      })}
    </div>
  )
}

export default EmployeeList
