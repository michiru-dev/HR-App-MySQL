import React, { useState } from 'react'

type ButtonProps = { text: string; onClick?: () => void }

function Button({ text, onClick }: ButtonProps) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button
