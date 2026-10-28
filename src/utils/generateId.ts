export function generateId(): string {
  return `p-${globalThis.crypto.randomUUID()}`
}
