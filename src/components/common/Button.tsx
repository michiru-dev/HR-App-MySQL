import React, { useState } from 'react'

type ButtonProps = { text: string }

function Button({ text }: ButtonProps) {
  return (
    <div>
      <button>{text}</button>
    </div>
  )
}

export default Button
