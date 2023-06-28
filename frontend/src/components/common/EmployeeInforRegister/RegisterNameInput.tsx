import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

function RegisterNameInput({
  label,
  idLast,
  idFirst,
  type = 'text', //指定されなかった時はtext
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
  valueFirst: string | number | readonly string[] | null
  valueLast: string | number | readonly string[] | null
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
        value={valueLast || ''} //inputのvalueはnullを受け付けないため
        onChange={onChangeLast}
        placeholder={placeholderLast}
        className="registerNameInput"
      />
      <input
        id={idFirst}
        name={idFirst}
        type={type}
        value={valueFirst || ''}
        onChange={onChangeFirst}
        placeholder={placeholderFirst}
        className="registerNameInput"
      />
    </div>
  )
}

export default RegisterNameInput
