import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

function RegisterNameInput({
  label,
  idFirst,
  idLast,
  type = 'text',
  valueFirst,
  valueLast,
  onChangeFirst,
  onChangeLast,
  placeholderFirst,
  placeholderLast,
}: {
  label: string
  idFirst: string
  idLast: string
  type: HTMLInputTypeAttribute
  valueFirst: string | number | readonly string[] | undefined
  valueLast: string | number | readonly string[] | undefined
  onChangeFirst: ChangeEventHandler<HTMLInputElement>
  onChangeLast: ChangeEventHandler<HTMLInputElement>
  placeholderFirst: string
  placeholderLast: string
}) {
  return (
    <>
      <label htmlFor={idFirst}>{label}</label>
      <input
        id={idFirst}
        name={idFirst}
        type={type}
        value={valueFirst}
        onChange={onChangeFirst}
        placeholder={placeholderFirst}
      />
      <input
        id={idLast}
        name={idLast}
        type={type}
        value={valueLast}
        onChange={onChangeLast}
        placeholder={placeholderLast}
      />
    </>
  )
}

export default RegisterNameInput
