import type { ReactNode } from 'react'
import { Modal } from './Modal'

interface DrawerProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Drawer({ title, isOpen, onClose, children }: DrawerProps) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="drawer__content">{children}</div>
    </Modal>
  )
}
