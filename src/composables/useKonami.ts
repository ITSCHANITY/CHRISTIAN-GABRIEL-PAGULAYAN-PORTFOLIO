import { onMounted, onBeforeUnmount } from 'vue'

export const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami(onUnlock: () => void): void {
  let progress = 0

  function handler(e: KeyboardEvent): void {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
    const expected = KONAMI_SEQUENCE[progress]
    if (key === expected) {
      progress++
      if (progress === KONAMI_SEQUENCE.length) {
        progress = 0
        onUnlock()
      }
    } else {
      progress = key === KONAMI_SEQUENCE[0] ? 1 : 0
    }
  }

  onMounted(() => window.addEventListener('keydown', handler))
  onBeforeUnmount(() => window.removeEventListener('keydown', handler))
}
