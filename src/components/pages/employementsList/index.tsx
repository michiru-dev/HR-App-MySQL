import React, { useEffect, useState } from 'react'
import {
  deleteEmployeeData,
  editEmployeeData,
  fetchEmployeeData,
} from '../../../redux/slicers/employeeDataSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { EmployeeInfoRegister } from '../../common/EmployeeInforRegister'
import { Button } from '../../common/UI/Button'
import { EmployeeWithoutDocId } from '../../../redux/slicers/type'

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
      <table className="employeeList">
        <thead>
          <tr>
            <th>姓</th>
            <th>名</th>
            <th>役職</th>
            <th>等級</th>
            <th>契約形態</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => {
            return (
              <tr key={employee.docId}>
                <td>{employee.lastName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.position}</td>
                <td>{employee.rank}</td>
                <td>{employee.contractType}</td>
                <td>
                  {editEmployeeIndex === index ? (
                    <EmployeeInfoRegister
                      buttonText="保存"
                      handleButtonClick={(registerInfo) =>
                        handleButtonClick(registerInfo, employee.docId)
                      }
                      handleCloseButton={handleCloseButton}
                      handleDeletButton={() =>
                        handleDeletButton(employee.docId)
                      }
                      employee={employee}
                    />
                  ) : (
                    <Button
                      text={'編集'}
                      onClick={() => handleEditClick(index)}
                    />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
