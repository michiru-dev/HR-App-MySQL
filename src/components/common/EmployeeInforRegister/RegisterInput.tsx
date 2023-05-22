import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

function RegisterInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
}: {
  label: string
  id: string
  type: HTMLInputTypeAttribute
  value: string | number | readonly string[] | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} value={value} onChange={onChange} />
    </>
  )
}

export default RegisterInput
