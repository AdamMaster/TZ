import { ReactNode } from 'react'
import { create } from 'zustand'

interface State {
  isOpen: boolean
  content: ReactNode
  setOpen: (content: React.ReactNode) => void
  setClose: () => void
}

export const useStoreModal = create<State>(set => ({
  isOpen: false,
  content: null,
  setOpen: content => set(() => ({ isOpen: true, content: content })),
  setClose: () => {
    set(() => ({ isOpen: false }))
    setTimeout(() => {
      set(() => ({ content: null }))
    }, 200)
  }
}))
