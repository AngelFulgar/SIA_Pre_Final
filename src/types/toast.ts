export type ToastKind = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  message: string
  kind: ToastKind
}
