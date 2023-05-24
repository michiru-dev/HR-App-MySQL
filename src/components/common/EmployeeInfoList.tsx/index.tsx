import React from 'react'
import { EmployeeInfoEditModal } from '../../pages/employementsList/EmployeeInfoEditModal'
import { Button } from '../UI/Button'
import { EmployeeBase, EmployeeWithoutDocId } from '../../../redux/slicers/type'
import { useNavigate } from 'react-router-dom'

type EmployeeInfoListBase = {
  employeeData: EmployeeBase[]
  handleEditClick: (index: number) => void
  handleSaveButtonClick: (
    registerInfo: EmployeeWithoutDocId,
    docId: string
  ) => void
  handleCloseButton: React.MouseEventHandler<HTMLButtonElement>
  handleDeleteButton: (docId: string) => void
  editEmployeeIndex: number | null
}

function EmployeeInfoList({
  employeeData,
  handleEditClick,
  handleSaveButtonClick,
  handleCloseButton,
  handleDeleteButton,
  editEmployeeIndex,
}: EmployeeInfoListBase) {
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
          {/* {console.log(employeeData)} */}
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
                      // const handleButtonClick2 = (registerInfo: EmployeeBase) =>
                      // handleButtonClick(registerInfo, employee.docId)
                      //handleButtonClickを実行する時にregisterInfoの引数が必要docIdはここで渡してるから不要
                      handleCloseButton={handleCloseButton}
                      handleDeleteButton={() =>
                        handleDeleteButton(employee.docId)
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

export default EmployeeInfoList
