import React from 'react'
import { Link } from 'react-router-dom'

type linkButtonProps = {
  link: string
  text: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const LinkButton = ({ link, text, onClick }: linkButtonProps) => {
  return (
    <Link to={link} className="link-button" onClick={onClick}>
      {text}
    </Link>
  )
}
