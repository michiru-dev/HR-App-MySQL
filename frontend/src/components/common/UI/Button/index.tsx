import React, { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  text: string | JSX.Element
}
//ComponentProps<'button'> これでbuttonの全ての型を自動で割り当て

export function Button({ text, ...rest }: ButtonProps) {
  //buttonprops何が入っても大丈夫
  return (
    <button {...rest} className={`basicButton ${rest.className}`}>
      {text}
    </button>
  )
}
