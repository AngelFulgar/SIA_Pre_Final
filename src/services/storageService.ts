export function readStorage<T>(
  key: string,
  isValue: (value: unknown) => value is T,
  fallback: T,
): T {
  try {
    const serialized = window.localStorage.getItem(key)
    if (serialized === null) return fallback
    const parsed: unknown = JSON.parse(serialized)
    if (isValue(parsed)) return parsed
    console.error(`Ignoring invalid local storage data for "${key}".`)
  } catch (error) {
    console.error(`Unable to read local storage key "${key}".`, error)
  }
  return fallback
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Unable to save local storage key "${key}".`, error)
  }
}
