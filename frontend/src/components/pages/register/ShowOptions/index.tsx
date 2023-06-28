import React from 'react'
import { EmployeeWithoutId, OptionBase } from '../../../../redux/slicers/type'

type ShowOptionsType = {
  labelName: string
  id: string
  optionItem: OptionBase[]
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string | null
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
          //e.target.valueはform要素のvalueを返す.valueがない場合はタグ内のテキストを返す
          onChange((prev) => ({
            ...prev, //すでにある値を展開
            [id]: e.target.value, //[id]この書き方はobjectにキーでアクセスするやり方と一緒
            //objectはどこかというと、引数（今回はprev）もう関数の中だからprev[id]みたいな書き方は不要
          }))
        }}
        name={id}
        id={id}
        value={value || ''}
        className="registerSelectOptionInput"
      >
        <option value=""></option>
        {optionItem.map((option: OptionBase) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
