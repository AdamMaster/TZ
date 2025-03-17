import React, { ReactNode } from 'react'
import s from './button.module.css'
import clsx from 'clsx'
import { Loader } from 'lucide-react'

type Variants = 'red' | 'stroked'
type Sizes = 'big' | 'small'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
  variant?: Variants
  size?: Sizes
  disabled?: boolean
  isLoading?: boolean
}

export const Button: React.FC<Props> = ({
  className,
  children,
  type = 'button',
  variant = 'red',
  size = 'big',
  disabled,
  isLoading,
  onClick
}) => {
  const variants = {
    red: s.red,
    stroked: s.stroked
  }[variant]
  const sizes = {
    big: s.big,
    small: s.small
  }[size]

  const classNames = clsx(className, s.wrapper, variants, sizes)

  return (
    <button className={classNames} type={type} disabled={disabled} onClick={onClick}>
      <span>{!isLoading ? children : <Loader className={s.loader} />}</span>
    </button>
  )
}
