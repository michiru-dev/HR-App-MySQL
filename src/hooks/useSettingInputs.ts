import { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { v4 as uuidv4 } from 'uuid'
import {
  OptionBase,
  addHrOptionData,
  deleteOptionData,
  editOption,
} from '../redux/slicers/optionsSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export type collectionNameBase =
  | 'contractType'
  | 'departmentType'
  | 'positionType'
  | 'rankType'

export type SettingActions = {
  settingType: OptionBase[]
  collectionName: collectionNameBase
}

//showinputsに繋がるhooks
export const useSettingInputs = ({
  settingType,
  collectionName,
}: SettingActions) => {
  const dispatch = useAppDispatch()
  const [addInput, setAddInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedName, setEditedName] = useState<string>('')

  //inputの値が変わった時
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInput(e.target.value)
  }

  //追加を押した時
  const handleAddClick = () => {
    dispatch(
      addHrOptionData({
        optionData: {
          id: uuidv4(),
          name: addInput,
        },
        collectionName: collectionName,
      })
    )
    setAddInput('')
  }

  //削除を押した時
  const handleDeleteClick = (docId: string | undefined) => {
    if (typeof docId !== 'undefined')
      dispatch(deleteOptionData({ docId, collectionName }))
  }

  //編集クリックされた時
  const handleEditClick = (index: number) => {
    // これらが更新されることによってレンダリングがかかりretrun内のmapが再始動する
    setEditIndex(index)
    setEditedName(settingType[index].name)
  }

  //編集のinputの値が変わった時
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value)
  }

  //保存を押した時
  const handleEditSubmit = (docId: string | undefined) => {
    if (typeof docId !== 'undefined')
      dispatch(
        editOption({
          docId,
          collectionName,
          newName: editedName,
        })
      )
    setEditIndex(null)
  }

  return {
    addInput,
    setAddInput,
    editIndex,
    setEditIndex,
    editedName,
    setEditedName,
    handleAddClick,
    handleDeleteClick,
    handleChangeInput,
    handleEditClick,
    handleEditInputChange,
    handleEditSubmit,
  }
}
