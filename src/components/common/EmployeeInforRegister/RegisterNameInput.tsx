import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

function RegisterNameInput({
  label,
  idLast,
  idFirst,
  type = 'text',
  valueFirst,
  valueLast,
  onChangeFirst,
  onChangeLast,
  placeholderLast,
  placeholderFirst,
}: {
  label: string
  idLast: string
  idFirst: string
  type: HTMLInputTypeAttribute
  valueFirst: string | number | readonly string[] | undefined
  valueLast: string | number | readonly string[] | undefined
  onChangeFirst: ChangeEventHandler<HTMLInputElement>
  onChangeLast: ChangeEventHandler<HTMLInputElement>
  placeholderLast: string
  placeholderFirst: string
}) {
  return (
    <div>
      <label htmlFor={idLast}>{label}</label>
      <input
        id={idLast}
        name={idLast}
        type={type}
        value={valueLast}
        onChange={onChangeLast}
        placeholder={placeholderLast}
      />
      <input
        id={idFirst}
        name={idFirst}
        type={type}
        value={valueFirst}
        onChange={onChangeFirst}
        placeholder={placeholderFirst}
      />
    </div>
  )
}

export default RegisterNameInput
