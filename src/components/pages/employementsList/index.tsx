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
import { EmployeeInfoEditModal } from './EmployeeInfoEditModal'

function EmployeeList() {
  const dispatch = useAppDispatch()
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const employeeData = useAppSelector((state) => state.employee.employeeData)

  useEffect(() => {
    dispatch(fetchEmployeeData())
  }, [])

  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
    setIsModalOpen(true)
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
    setIsModalOpen(false)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
    setIsModalOpen(false)
  }

  //削除ボタンが押された時
  const handleDeletButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined') return
    await dispatch(deleteEmployeeData(docId))
    await dispatch(fetchEmployeeData()) //古いデータを見た目からもなくす
    setEditEmployeeIndex(null)
    setIsModalOpen(false)
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
            <th>セイ</th>
            <th>メイ</th>
            <th>役職</th>
            <th>部署</th>
            <th>等級</th>
            <th>契約形態</th>
            <th>入社日</th>
            <th>生年月日</th>
            <th>最終学歴</th>
            <th>電話番号</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => {
            return (
              <tr key={employee.docId}>
                <td>{employee.lastName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastFurigana}</td>
                <td>{employee.firstFurigana}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.rank}</td>
                <td>{employee.contractType}</td>
                <td>{employee.hireDate}</td>
                <td>{employee.birthday}</td>
                <td>{employee.education}</td>
                <td>{employee.phoneNumber}</td>
                <Button text={'編集'} onClick={() => handleEditClick(index)} />
                {/* 編集ボタンを押したら */}
                {editEmployeeIndex === index && (
                  <td id="modal" className="modal">
                    <EmployeeInfoEditModal
                      buttonText="保存"
                      handleButtonClick={(registerInfo) =>
                        handleSaveButtonClick(registerInfo, employee.docId)
                      }
                      //handleButtonClickを実行する時にregisterInfoの引数が必要docIdはここで渡してるから不要
                      handleCloseButton={handleCloseButton}
                      handleDeletButton={() =>
                        handleDeletButton(employee.docId)
                      }
                      employee={employee}
                    />
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
