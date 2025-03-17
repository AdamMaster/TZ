import React, { ReactNode } from 'react'
import s from './text-button.module.css'
import clsx from 'clsx'
import { Loader } from 'lucide-react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
  isLoading?: boolean
}

export const TextButton: React.FC<Props> = ({ className, children, type = 'button', isLoading, onClick }) => {
  const classNames = clsx(className, s.wrapper)

  return (
    <button className={classNames} type={type} onClick={onClick}>
      {!isLoading ? children : <Loader className={s.loader} />}
    </button>
  )
}
