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
  handleButtonClick: (registerInfo: any) => void //???質問
  employee?: EmployeeBase
  isClearInput?: boolean
  handleCloseButton?: any
  handleDeletButton?: any
}

function EmployeeInfoRegister({
  buttonText,
  employee,
  handleButtonClick,
  isClearInput,
  handleCloseButton,
  handleDeletButton,
}: employeeInfoBase) {
  const [registerInfo, setRegisterInfo] = useState<EmployeeWithoutId>({
    firstName: employee?.firstName ?? '', //employeeがあれば.firstNameなければ空
    lastName: employee?.lastName ?? '',
    firstFurigana: employee?.firstFurigana ?? '',
    lastFurigana: employee?.lastFurigana ?? '',
    birthday: employee?.birthday ?? '',
    postalCode: employee?.postalCode ?? '',
    education: employee?.education ?? '',
    hireDate: employee?.hireDate ?? '',
    contractType: employee?.contractType ?? '',
    department: employee?.department ?? '',
    rank: employee?.rank ?? '',
    position: employee?.position ?? '',
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
        idLast="KanjiSei"
        idFirst="KanjiMei"
        type="string"
        valueLast={lastName}
        valueFirst={firstName}
        placeholderLast="姓"
        placeholderFirst="名"
        onChangeLast={(e) =>
          setRegisterInfo((prev) => ({
            ...prev, //今の値を展開してlastName以外に更新をかけないようにする
            lastName: e.target.value,
          }))
        }
        onChangeFirst={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
      />

      <RegisterNameInput
        label="フリガナ"
        idLast="KatakanaMei"
        idFirst="KatakanaSei"
        type="string"
        valueLast={lastFurigana}
        valueFirst={firstFurigana}
        placeholderLast="セイ"
        placeholderFirst="メイ"
        onChangeLast={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            lastFurigana: e.target.value,
          }))
        }
        onChangeFirst={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            firstFurigana: e.target.value,
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
        onClick={() => {
          handleButtonClick(registerInfo)
          if (isClearInput) {
            //inputを空にする
            setRegisterInfo({
              lastName: '',
              firstName: '',
              lastFurigana: '',
              firstFurigana: '',
              birthday: '',
              postalCode: '',
              education: '',
              hireDate: '',
              contractType: '',
              department: '',
              rank: '',
              position: '',
            })
          }
        }}
      />
      {!isClearInput && ( //社員一覧にのみ表示のボタン
        <>
          <Button text={'閉じる'} onClick={handleCloseButton} />
          <Button text={'データを削除'} onClick={handleDeletButton} />
        </>
      )}
    </div>
  )
}

export default EmployeeInfoRegister
