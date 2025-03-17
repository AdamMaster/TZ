import React from 'react'
import { useFormContext } from 'react-hook-form'
import s from './group-variants.module.css'
import clsx from 'clsx'

export type Variant = {
  id: number
  value: string
}

interface Props {
  className?: string
  items: readonly Variant[]
  value?: Variant['value']
  onClick?: (value: Variant['value']) => void
  mode?: 'circle' | 'default'
}

export const GroupVariants: React.FC<Props> = ({ className, items, value, onClick, mode = 'circle' }) => {
  const modes = {
    circle: s.circle,
    default: s.default
  }[mode]

  return (
    <div className={clsx(className, s.wrapper)}>
      {items.map(item => (
        <button
          className={clsx(s.button, modes, item.value === value ? s.active : '')}
          key={item.id}
          onClick={() => onClick?.(item.value)}
          type='button'
        >
          {item.value}
        </button>
      ))}
    </div>
  )
}
