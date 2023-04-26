import React from 'react'

function Button({ text }: { text: string }) {
  return (
    <div>
      <button>{text}</button>
    </div>
  )
}

export default Button
