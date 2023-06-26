import React from 'react'
import {
  EmployeeWithoutDocId,
  OptionBase,
} from '../../../../redux/slicers/type'

type ShowOptionsType = {
  labelName: string
  id: string
  optionItem: OptionBase[]
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutDocId>>
  value: string
}

export function ShowOptions({
  labelName,
  id,
  optionItem,
  onChange,
  value,
}: ShowOptionsType) {
  return (
    <div>
      <label htmlFor={id}>{labelName}</label>
      <select
        onChange={(e) => {
          onChange((prev) => ({
            ...prev,
            [id]: e.target.value, //[id]この書き方はobjectにキーでアクセスするやり方と一緒
            //objectはどこかというと、引数（今回はprev）もう関数の中だからprev[id]みたいな書き方は不要
          }))
        }}
        name={id}
        id={id}
        value={value}
        className="registerSelectOptionInput"
      >
        <option value=""></option>
        {optionItem.map((option: OptionBase) => {
          return <option key={option.id}>{option.name}</option>
        })}
      </select>
    </div>
  )
}
