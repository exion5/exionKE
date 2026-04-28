type KeyDef = { l: string; c: string; w?: string; s?: string }
type LayoutKey = { l: string; c: string; w?: string; s?: string }
type CustomLayout = LayoutKey[][]

type Keymap = {
  [layer: number]: {
    [rowIndex: number]: {
      [keyIndex: number]: KeyDef
    }
  }
}

export function exportKeymap(keymap: Keymap, layout?: CustomLayout): void {
  const payload = {
    version: 1,
    layout: '65percent',
    customLayout: layout ?? null,
    timestamp: new Date().toISOString(),
    keymap,
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `exionKE-keymap-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importKeymap(file: File): Promise<{ keymap: Keymap; customLayout: CustomLayout | null }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string)
        if (!raw.keymap) throw new Error('Invalid keymap file')
        resolve({ keymap: raw.keymap, customLayout: raw.customLayout ?? null })
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}