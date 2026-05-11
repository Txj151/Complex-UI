import { vi } from 'vitest'

let _capturedBlob: Blob | undefined

URL.createObjectURL = vi.fn((blob: Blob) => {
  _capturedBlob = blob
  return 'blob:mock'
}) as unknown as typeof URL.createObjectURL

URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

export function getCapturedBlob(): Blob | undefined {
  return _capturedBlob
}

export function clearCapturedBlob(): void {
  _capturedBlob = undefined
}
