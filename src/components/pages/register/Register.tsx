import React, { useState } from 'react'
import Button from '../../common/Button'
import ContractOptions from './ContractOptions'
import RankOptions from './RankOptions'
import PositionOptions from './PositionOptions'
import DepartmentOptions from './DepartmentOptions'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../../redux/employeeDataSlice'
import type { EmployeeWithoutId } from '../../../redux/employeeDataSlice'
import RegisterInput from './RegisterInput'
import RegisterNameInput from './RegisterNameInput'
import { SearchResult } from '../../common/SearchResult'

function Register() {
  const dispatch = useDispatch()
  const [registerInfo, setRegisterInfo] = useState<EmployeeWithoutId>({
    firstName: '',
    lastName: '',
    firstFurigana: '',
    lastFurigana: '',
    birthday: '',
    postalCode: '',
    education: '',
    hireDate: '',
    contractType: '',
    department: '',
    rank: '',
    position: '',
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

  const handleRegister = () => {
    alert('登録されました')
    dispatch(
      addEmployee({
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
      })
    ) //inputを空にする
    setRegisterInfo({
      firstName: '',
      lastName: '',
      firstFurigana: '',
      lastFurigana: '',
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

      <Button text={'登録'} onClick={handleRegister} />

      {/* <SearchResult /> */}
    </div>
  )
}

export default Register
