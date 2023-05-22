import React from 'react'
import { useSettingInputs } from '../../../../hooks/useSettingInputs'
import { SettingActions } from '../../../../hooks/useSettingInputs' //type
import { OptionBase } from '../../../../redux/slicers/optionsSlice' //type
import { Button } from '../../../common/UI/Button'

//各種設定の画面

export function ShowSettingList({ settingType, ...rest }: SettingActions) {
  const {
    addInput,
    editIndex,
    editedName,
    handleAddClick,
    handleDeleteClick,
    handleChangeInput,
    handleEditClick,
    handleEditInputChange,
    handleEditSubmit,
  } = useSettingInputs({ settingType, ...rest })

  return (
    <div>
      {settingType.map((setting: OptionBase, index: number) => {
        return (
          <li key={setting.id}>
            {editIndex === index ? (
              //編集中のindexとmapのindexが一緒だったら編集画面
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={handleEditInputChange}
                />
                <Button
                  text={'保存'}
                  onClick={() => handleEditSubmit(setting.docId)}
                />
              </>
            ) : (
              //編集中のindexとmapのindexが異なれば編集不可能な画面
              <>
                {setting.name}
                <Button text={'編集'} onClick={() => handleEditClick(index)} />
                <Button
                  text={'削除'}
                  onClick={() => handleDeleteClick(setting.docId)}
                />
              </>
            )}
          </li>
        )
      })}
      <input
        type="text"
        value={addInput}
        onChange={(e) => handleChangeInput(e)}
      />
      <Button text={'追加'} onClick={handleAddClick} />
    </div>
  )
}
