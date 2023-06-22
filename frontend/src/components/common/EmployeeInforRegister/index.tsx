import React, { useState } from 'react'
import RegisterNameInput from './RegisterNameInput'
import { ContractOptions } from '../../pages/register/ContractOptions'
import { DepartmentOptions } from '../../pages/register/DepartmentOptions'
import { PositionOptions } from '../../pages/register/PositionOptions'
import { RankOptions } from '../../pages/register/RankOptions'
import { Button } from '../UI/Button'
import RegisterInput from './RegisterInput'
import { EmployeeBase, EmployeeWithoutDocId } from '../../../redux/slicers/type'

export type EmployeeInfoBase = {
  buttonText: string
  handleButtonClick: (registerInfo: EmployeeWithoutDocId) => void
  employee?: EmployeeBase
  isClearInput?: boolean
  handleCloseButton?: React.MouseEventHandler<HTMLButtonElement>
  handleDeleteButton?: React.MouseEventHandler<HTMLButtonElement>
}

export function EmployeeInfoRegister({
  buttonText,
  employee,
  handleButtonClick,
  isClearInput,
  handleCloseButton,
  handleDeleteButton,
}: EmployeeInfoBase) {
  const [registerInfo, setRegisterInfo] = useState<EmployeeWithoutDocId>({
    firstName: employee?.firstName ?? '', //employeeがあれば.firstNameなければ空
    lastName: employee?.lastName ?? '',
    firstFurigana: employee?.firstFurigana ?? '',
    lastFurigana: employee?.lastFurigana ?? '',
    birthday: employee?.birthday ?? '',
    phoneNumber: employee?.phoneNumber ?? '',
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
    phoneNumber,
    education,
    hireDate,
    contractType,
    department,
    rank,
    position,
  } = registerInfo

  return (
    <div className="registerEmployeeInfo">
      <RegisterNameInput
        label="名&emsp;&emsp;前"
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

      <RegisterInput
        label="電話番号"
        id="phoneNumber"
        type="number"
        value={phoneNumber}
        onChange={(e) =>
          setRegisterInfo((prev) => ({
            ...prev,
            phoneNumber: e.target.value,
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
        label="入&nbsp;社&nbsp;日&nbsp;&nbsp;"
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
      <div className="employeeListButtons">
        {/* 保存・登録ボタン */}
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
                phoneNumber: '',
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
            <Button
              text={'✖️'}
              onClick={handleCloseButton}
              className="closeButton"
            />
            <Button
              text={'データを削除'}
              onClick={handleDeleteButton}
              className="deleteButton"
            />
          </>
        )}
      </div>
    </div>
  )
}
