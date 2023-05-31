import React from 'react'
import { Link } from 'react-router-dom'

type linkButtonProps = { link: string; text: string }

export const LinkButton = ({ link, text }: linkButtonProps) => {
  return (
    <Link to={link} className="link-button">
      {text}
    </Link>
  )
}
