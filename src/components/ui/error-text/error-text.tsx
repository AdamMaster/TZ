import React from 'react'
import s from './error-text.module.css'

interface Props {
  text: string
  className?: string
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={`${s.wrapper} ${className ? className : ''}`}>{text}</p>
}
