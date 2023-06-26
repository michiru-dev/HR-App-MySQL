import React from 'react'
import { useSettingInputs } from '../../../../hooks/useSettingInputs'
import { SettingActions } from '../../../../hooks/useSettingInputs'
import { Button } from '../../../common/UI/Button'
import { OptionBase } from '../../../../redux/slicers/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

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
          <li key={setting.id} className="settingItem">
            {editIndex === index ? (
              //編集中のindexとmapのindexが一緒だったら編集画面
              <div className="editSetting">
                <input
                  type="text"
                  value={editedName}
                  onChange={handleEditInputChange}
                />
                <Button
                  text={'保存'}
                  onClick={() => handleEditSubmit(setting.id)}
                />
              </div>
            ) : (
              //編集中のindexとmapのindexが異なれば編集不可能な画面
              <div className="showItem">
                {setting.name}
                <div className="editAndTrashButtonBox">
                  <Button
                    text={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={() => handleEditClick(index)}
                    className={'settingEditButton'}
                  />
                  <Button
                    text={<FontAwesomeIcon icon={faTrashCan} />}
                    onClick={() => handleDeleteClick(setting.id)}
                    className={'settingDeleteButton'}
                  />
                </div>
              </div>
            )}
          </li>
        )
      })}
      <div className="addSettingItem">
        <input
          type="text"
          value={addInput}
          onChange={(e) => handleChangeInput(e)}
          className="optionAddInput"
        />
        <Button text={'追加'} onClick={handleAddClick} />
      </div>
    </div>
  )
}
