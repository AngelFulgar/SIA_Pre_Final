import type { ToastMessage } from '../../types/toast'
import { Button } from '../ui'

export function Toast({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  return (
    <div className={`toast toast--${toast.kind}`} role={toast.kind === 'error' ? 'alert' : 'status'}>
      <span>{toast.message}</span>
      <Button variant="ghost" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>×</Button>
    </div>
  )
}
