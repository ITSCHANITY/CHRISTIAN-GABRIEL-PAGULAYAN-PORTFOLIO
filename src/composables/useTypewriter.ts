import { ref, onBeforeUnmount, type Ref } from 'vue'

export interface TypewriterOptions {
  
  typeSpeed?: number
  
  deleteSpeed?: number
  
  holdTime?: number
  
  loop?: boolean
}

interface TypewriterReturn {
  output: Ref<string>
  start: () => void
  stop: () => void
}

export function useTypewriter(
  phrases: string[],
  options: TypewriterOptions = {},
): TypewriterReturn {
  const typeSpeed = options.typeSpeed ?? 70
  const deleteSpeed = options.deleteSpeed ?? 35
  const holdTime = options.holdTime ?? 1400
  const loop = options.loop ?? true

  const output = ref('')
  let phraseIdx = 0
  let charIdx = 0
  let deleting = false
  let timer = 0
  let active = false

  function schedule(ms: number): void {
    timer = window.setTimeout(loopStep, ms)
  }

  function loopStep(): void {
    if (!active || phrases.length === 0) return
    const current = phrases[phraseIdx]

    if (!deleting) {
      charIdx++
      output.value = current.slice(0, charIdx)
      if (charIdx >= current.length) {
        if (!loop && phraseIdx === phrases.length - 1) return
        deleting = true
        schedule(holdTime)
        return
      }
      schedule(typeSpeed)
    } else {
      charIdx--
      output.value = current.slice(0, charIdx)
      if (charIdx <= 0) {
        deleting = false
        phraseIdx = (phraseIdx + 1) % phrases.length
        schedule(typeSpeed)
        return
      }
      schedule(deleteSpeed)
    }
  }

  function start(): void {
    if (active) return
    active = true
    schedule(typeSpeed)
  }

  function stop(): void {
    active = false
    if (timer) window.clearTimeout(timer)

    output.value = phrases[0] ?? ''
  }

  onBeforeUnmount(() => {
    active = false
    if (timer) window.clearTimeout(timer)
  })

  return { output, start, stop }
}
