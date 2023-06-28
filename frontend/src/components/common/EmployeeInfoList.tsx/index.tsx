import React from 'react'
import { EmployeeInfoEditModal } from '../../pages/employementsList/EmployeeInfoEditModal'
import { Button } from '../UI/Button'
import { EmployeeBase, EmployeeWithoutId } from '../../../redux/slicers/type'

export type HandleSaveButtonClick = (
  registerInfo: EmployeeWithoutId,
  id: string | undefined
) => void

type EmployeeInfoListBase = {
  employeeData: EmployeeBase[]
  handleEditClick: (index: number) => void
  handleSaveButtonClick: HandleSaveButtonClick
  handleCloseButton: React.MouseEventHandler<HTMLButtonElement>
  handleDeleteButton: (id: string | undefined) => void
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
          {employeeData.map((employee, index) => {
            return (
              <tr key={employee.employee_id}>
                <td>{employee.last_name}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_furigana}</td>
                <td>{employee.first_furigana}</td>
                <td>{employee.position_name}</td>
                <td>{employee.department_name}</td>
                <td>{employee.degree_name}</td>
                <td>{employee.contract_name}</td>
                <td>
                  <span className="employeeInfoNum">{employee.hire_date}</span>
                </td>
                <td>
                  <span className="employeeInfoNum">{employee.birthday}</span>
                </td>
                <td>{employee.education}</td>
                <td>
                  <span className="employeeInfoNum">
                    {employee.phone_number}
                  </span>
                </td>
                <td>
                  <Button
                    text={'編集'}
                    onClick={() => handleEditClick(index)}
                    className="employeeListEditButton"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {editEmployeeIndex !== null && (
        <div id="modal" className="modal">
          <EmployeeInfoEditModal
            buttonText="保存"
            handleButtonClick={(registerInfo) => {
              handleSaveButtonClick(
                registerInfo,
                employeeData[editEmployeeIndex].employee_id
                //propsで渡ってきたemployeeDataの配列にindexでアクセスする
              )
            }}
            // const handleButtonClick2 = (registerInfo: EmployeeBase) =>
            // handleButtonClick(registerInfo, employee.docId)
            //handleButtonClickを実行する時にregisterInfoの引数が必要docIdはここで渡してるから不要
            handleCloseButton={handleCloseButton}
            handleDeleteButton={() =>
              handleDeleteButton(employeeData[editEmployeeIndex].employee_id)
            }
            employee={employeeData[editEmployeeIndex]}
          />
        </div>
      )}
    </div>
  )
}

export default EmployeeInfoList
