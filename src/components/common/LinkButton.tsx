import React from 'react'
import { Link } from 'react-router-dom'

type linkButtonProps = { link: string; text: string }

const LinkButton = ({ link, text }: linkButtonProps) => {
  return <Link to={link}>{text}</Link>
}

export default LinkButton
