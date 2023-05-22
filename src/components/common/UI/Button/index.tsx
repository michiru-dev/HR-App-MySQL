import React, { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & { text: string }
//ComponentProps<'button'> これでbuttonの全ての型を自動で割り当て

export function Button({ text, ...rest }: ButtonProps) {
  //buttonprops何が入っても大丈夫
  return (
    <div>
      <button {...rest}>{text}</button>
    </div>
  )
}
