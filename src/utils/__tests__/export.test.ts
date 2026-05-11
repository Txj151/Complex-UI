import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exportJson } from '../export'
import { getCapturedBlob, clearCapturedBlob } from './setup'

describe('exportJson', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearCapturedBlob()
  })

  it('serializes JSON data with correct formatting', async () => {
    const a = { href: '', download: '', click: vi.fn() }
    vi.spyOn(document, 'createElement').mockReturnValue(
      a as unknown as HTMLAnchorElement,
    )

    const data = { name: '测试', items: [1, 2, 3], nested: { a: true } }
    exportJson(data, 'test.json')

    const blob = getCapturedBlob()
    expect(blob).toBeDefined()
    expect(blob!.type).toBe('application/json')

    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsText(blob!)
    })
    const parsed = JSON.parse(text)
    expect(parsed).toEqual(data)

    // verify pretty-print (2-space indent)
    const lines = text.split('\n')
    expect(lines[1]).toMatch(/^ {2}"/)
  })

  it('creates a download link and triggers click', () => {
    const clickSpy = vi.fn()
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: clickSpy,
    } as unknown as HTMLAnchorElement)

    const data = { name: 'test', value: 123 }
    exportJson(data, 'test.json')

    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(URL.createObjectURL).toHaveBeenCalledOnce()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock')
  })

  it('uses default filename when not specified', () => {
    const a = { href: '', download: '', click: vi.fn() }
    vi.spyOn(document, 'createElement').mockReturnValue(
      a as unknown as HTMLAnchorElement,
    )

    exportJson({ foo: 'bar' })

    expect(a.download).toBe('data.json')
  })

  it('accepts custom filename', () => {
    const a = { href: '', download: '', click: vi.fn() }
    vi.spyOn(document, 'createElement').mockReturnValue(
      a as unknown as HTMLAnchorElement,
    )

    exportJson({ foo: 'bar' }, 'custom.json')

    expect(a.download).toBe('custom.json')
  })
})
