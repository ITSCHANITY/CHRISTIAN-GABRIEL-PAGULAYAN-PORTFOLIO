import { ref, onBeforeUnmount, type Ref } from 'vue'

export const DEFAULT_SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01010100ABCDEF%$&@'

export interface GlitchOptions {
  
  scrambleChars?: string
  
  duration?: number
  
  tick?: number
}

interface GlitchReturn {
  
  output: Ref<string>
  
  running: Ref<boolean>
  
  decodeTo: (target: string) => Promise<void>
  
  setInstant: (text: string) => void
  
  stop: () => void
}

export function useGlitch(initial = '', options: GlitchOptions = {}): GlitchReturn {
  const scrambleChars = options.scrambleChars ?? DEFAULT_SCRAMBLE_CHARS
  const duration = options.duration ?? 900
  const tick = options.tick ?? 32

  const output = ref(initial)
  const running = ref(false)
  let raf = 0
  let timer = 0

  function rand(): string {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
  }

  function stop(): void {
    running.value = false
    if (raf) cancelAnimationFrame(raf)
    if (timer) window.clearTimeout(timer)
    raf = 0
    timer = 0
  }

  function setInstant(text: string): void {
    stop()
    output.value = text
  }

  function decodeTo(target: string): Promise<void> {
    stop()
    running.value = true
    const from = output.value
    const length = Math.max(from.length, target.length)
    const start = performance.now()

    return new Promise<void>((resolve) => {
      const step = (): void => {
        const now = performance.now()
        const progress = Math.min(1, (now - start) / duration)

        const revealed = Math.floor(progress * length)
        let next = ''
        for (let i = 0; i < length; i++) {
          const targetChar = target[i] ?? ''
          if (i < revealed) {
            next += targetChar
          } else if (targetChar === ' ') {
            next += ' '
          } else {
            next += rand()
          }
        }
        output.value = next
        if (progress < 1) {
          timer = window.setTimeout(() => {
            raf = requestAnimationFrame(step)
          }, tick)
        } else {
          output.value = target
          running.value = false
          resolve()
        }
      }
      raf = requestAnimationFrame(step)
    })
  }

  onBeforeUnmount(stop)

  return { output, running, decodeTo, setInstant, stop }
}
