import React, { useState } from 'react'
import RegisterNameInput from '../pages/register/RegisterNameInput'
import RegisterInput from '../pages/register/RegisterInput'
import ContractOptions from '../pages/register/ContractOptions'
import DepartmentOptions from '../pages/register/DepartmentOptions'
import RankOptions from '../pages/register/RankOptions'
import PositionOptions from '../pages/register/PositionOptions'
import { EmployeeBase, EmployeeWithoutId } from '../../redux/employeeDataSlice'
import Button from './Button'

type employeeInfoBase = {
  buttonText: string
  employee: EmployeeBase
  handleButtonClick: any
}

function EmployeeInfoRegister({
  buttonText,
  employee,
  handleButtonClick,
}: employeeInfoBase) {
  const [registerInfo, setRegisterInfo] = useState<EmployeeWithoutId>({
    firstName: employee.firstName,
    lastName: employee.lastName,
    firstFurigana: employee.firstFurigana,
    lastFurigana: employee.lastFurigana,
    birthday: employee.birthday,
    postalCode: employee.postalCode,
    education: employee.education,
    hireDate: employee.hireDate,
    contractType: employee.contractType,
    department: employee.department,
    rank: employee.rank,
    position: employee.position,
  })

  const {
    firstName,
    lastName,
    firstFurigana,
    lastFurigana,
    birthday,
    postalCode,
    education,
    hireDate,
    contractType,
    department,
    rank,
    position,
  } = registerInfo

  return (
    <div>
      <RegisterNameInput
        label="名前"
        idFirst="KanjiSei"
        idLast="KanjiMei"
        type="string"
        valueFirst={firstName}
        valueLast={lastName}
        placeholderFirst="性"
        placeholderLast="名"
        onChangeFirst={(e) =>
          setRegisterInfo((prev) => ({
            ...prev, //今の値を展開してfirstName以外に更新をかけないようにする
            firstName: e.target.value,
          }))
        }
        onChangeLast={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            lastName: e.target.value,
          }))
        }
      />

      <RegisterNameInput
        label="フリガナ"
        idFirst="KatakanaSei"
        idLast="KatakanaMei"
        type="string"
        valueFirst={firstFurigana}
        valueLast={lastFurigana}
        placeholderFirst="セイ"
        placeholderLast="メイ"
        onChangeFirst={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            firstFurigana: e.target.value,
          }))
        }
        onChangeLast={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            lastFurigana: e.target.value,
          }))
        }
      />

      <RegisterInput
        label="生年月日"
        id="birthday"
        type="date"
        value={birthday}
        onChange={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            birthday: e.target.value,
          }))
        }
      />

      <label htmlFor="address">住所</label>
      <RegisterInput
        label="郵便番号"
        id="postalCode"
        type="number"
        value={postalCode}
        onChange={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            postalCode: e.target.value,
          }))
        }
      />
      <RegisterInput
        label="最終学歴"
        id="finalEducation"
        type="text"
        value={education}
        onChange={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            education: e.target.value,
          }))
        }
      />

      <RegisterInput
        label="入社日"
        id="enterDate"
        type="date"
        value={hireDate}
        onChange={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            hireDate: e.target.value,
          }))
        }
      />
      <ContractOptions onChange={setRegisterInfo} value={contractType} />
      <DepartmentOptions onChange={setRegisterInfo} value={department} />
      <RankOptions onChange={setRegisterInfo} value={rank} />
      <PositionOptions onChange={setRegisterInfo} value={position} />

      <Button
        text={buttonText}
        onClick={() => handleButtonClick(registerInfo)}
      />
    </div>
  )
}

export default EmployeeInfoRegister
