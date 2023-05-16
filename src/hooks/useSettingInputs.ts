import { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { v4 as uuidv4 } from 'uuid'
import { OptionBase } from '../redux/optionsSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import firebase from 'firebase/compat/app'

export type SettingActions = {
  settingType: OptionBase[]
  onSave: ActionCreatorWithPayload<OptionBase>
  onDelete: ActionCreatorWithPayload<string>
  onAdd: ActionCreatorWithPayload<OptionBase>
}

//showinputsに繋がるhooks
export const useSettingInputs = ({
  settingType,
  onSave,
  onDelete,
  onAdd,
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
      onAdd({
        id: uuidv4(),
        name: addInput,
      })
    )
    setAddInput('')
  }

  //削除を押した時
  const handleDeleteClick = (id: string) => {
    dispatch(onDelete(id))
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
  const handleEditSubmit = (index: number) => {
    dispatch(
      onSave({
        id: settingType[index].id,
        name: editedName,
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
