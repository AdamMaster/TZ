import React from 'react'
import s from './field.module.css'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text/error-text'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  name: string
}

export const Field: React.FC<Props> = ({ className, type = 'text', name, placeholder, onInput }) => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string
  return (
    <div className={clsx(className, s.wrapper)}>
      <input
        className={clsx(s.input, errors[name] && s.error)}
        value={value}
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        {...register(name)}
      />
      <ErrorText text={errorText} />
    </div>
  )
}
