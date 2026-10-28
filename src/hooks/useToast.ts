import { useCallback, useEffect, useRef, useState } from 'react'
import type { ToastKind, ToastMessage } from '../types/toast'
import { generateId } from '../utils/generateId'

const TOAST_DURATION = 3500

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const timers = useRef(new Map<string, number>())
  const dismissToast = useCallback((id: string) => {
    const timer = timers.current.get(id)
    if (timer !== undefined) window.clearTimeout(timer)
    timers.current.delete(id)
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])
  const notify = useCallback((message: string, kind: ToastKind = 'info') => {
    const id = generateId()
    setToasts((current) => [...current, { id, message, kind }])
    const timer = window.setTimeout(() => dismissToast(id), TOAST_DURATION)
    timers.current.set(id, timer)
  }, [dismissToast])
  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current.clear()
  }, [])
  return { toasts, notify, dismissToast }
}
