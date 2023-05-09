import React from 'react'
import { OptionBase } from '../../../redux/optionsSlice' //type

type ShowOptionsType = {
  labelName: string
  id: string
  optionItem: OptionBase[]
}

function ShowOptions({ labelName, id, optionItem }: ShowOptionsType) {
  return (
    <div>
      <label htmlFor={id}>{labelName}</label>
      <select name={id} id={id}>
        <option value=""></option>
        {optionItem.map((option: OptionBase) => {
          return <option key={option.id}>{option.name}</option>
        })}
      </select>
    </div>
  )
}

export default ShowOptions
