import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import s from './modal.module.css'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { useStoreModal } from '@/store'

interface Props {
  className?: string
}

export const Modal: React.FC<Props> = ({ className }) => {
  const { isOpen, content, setClose } = useStoreModal()
  const wrapperClassNames = `${s.wrapper} ${isOpen ? s.show : ''}`
  const containerClassNames = `${s.container} ${isOpen ? s.smooth : ''} scrollbar`
  const wrapperRef = useRef(null)
  const onClickCloseButton = () => {
    setClose()
  }

  useEffect(() => {
    const onClickDocument = (e: MouseEvent) => {
      if (wrapperRef.current && e.target === wrapperRef.current) {
        setClose()
      }
    }

    const onEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClose()
      }
    }

    document.addEventListener('mousedown', onClickDocument)
    document.addEventListener('keydown', onEscapeKeyDown)

    return () => {
      document.removeEventListener('mousedown', onClickDocument)
      document.removeEventListener('keydown', onEscapeKeyDown)
    }
  }, [])

  return ReactDOM.createPortal(
    <div className={clsx(className, wrapperClassNames)} ref={wrapperRef}>
      <div className={containerClassNames}>
        <button className={s.closeButton} onClick={() => onClickCloseButton()}>
          <X className={s.closeButtonIcon} width={36} height={36} />
        </button>
        {content}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}
