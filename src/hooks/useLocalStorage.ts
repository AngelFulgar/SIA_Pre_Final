import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../services/storageService'

export function useLocalStorage<T>(
  key: string,
  isValue: (value: unknown) => value is T,
  fallback: T,
) {
  const [value, setValue] = useState<T>(() => readStorage(key, isValue, fallback))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
