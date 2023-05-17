import React from 'react'
import Button from '../../common/Button'
import { useSettingInputs } from '../../../hooks/useSettingInputs'
import { SettingActions } from '../../../hooks/useSettingInputs' //type
import { OptionBase } from '../../../redux/optionsSlice' //type

function ShowInputs({ settingType, ...rest }: SettingActions) {
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
                <Button text={'保存'} onClick={() => handleEditSubmit(index)} />
              </>
            ) : (
              //編集中のindexとmapのindexが異なれば編集不可能な画面
              <>
                {setting.name}
                <Button text={'編集'} onClick={() => handleEditClick(index)} />
                <Button
                  text={'削除'}
                  onClick={() => handleDeleteClick(setting.id)}
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

export default ShowInputs
