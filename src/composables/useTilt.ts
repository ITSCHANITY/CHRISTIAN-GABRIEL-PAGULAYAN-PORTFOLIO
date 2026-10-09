import { ref, type Ref, type CSSProperties } from 'vue'

export interface TiltOptions {
  max?: number

  scale?: number

  glare?: boolean
}

interface TiltReturn {
  tiltRef: Ref<HTMLElement | null>
  style: Ref<CSSProperties>
  glarePos: Ref<{ x: number; y: number; opacity: number }>
  onMove: (e: PointerEvent) => void
  onLeave: () => void
}

export function useTilt(options: TiltOptions = {}): TiltReturn {
  const max = options.max ?? 10
  const scale = options.scale ?? 1.02

  const tiltRef = ref<HTMLElement | null>(null)
  const style = ref<CSSProperties>({ transform: '' })
  const glarePos = ref({ x: 50, y: 50, opacity: 0 })

  function onMove(e: PointerEvent): void {
    const el = tiltRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * max
    const rotateX = -(py - 0.5) * 2 * max
    style.value = {
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2,
      )}deg) scale(${scale})`,
    }
    if (options.glare) {
      glarePos.value = { x: px * 100, y: py * 100, opacity: 0.18 }
    }
  }

  function onLeave(): void {
    style.value = { transform: 'perspective(900px) rotateX(0) rotateY(0) scale(1)' }
    glarePos.value = { x: 50, y: 50, opacity: 0 }
  }

  return { tiltRef, style, glarePos, onMove, onLeave }
}
