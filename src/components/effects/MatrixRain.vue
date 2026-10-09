<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const canvas = ref<HTMLCanvasElement | null>(null)
const { x: mouseX, y: mouseY } = useMouse({ type: 'client' })
const { width, height } = useWindowSize()

const GLYPHS = 'アイウエオカキクケコｱｲｳﾃﾅﾆﾇ0123456789<>[]{}#$%&*/\\'
const FONT_SIZE = 16
const BASE_SPEED = 0.6
const MOUSE_RADIUS = 120

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let columns = 0
let drops: number[] = []
let paused = false

function brandRgb(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--c-brand').trim()
  return v || '225 29 72'
}

function setup(): void {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.floor(width.value * dpr)
  el.height = Math.floor(height.value * dpr)
  el.style.width = `${width.value}px`
  el.style.height = `${height.value}px`
  ctx = el.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  columns = Math.ceil(width.value / FONT_SIZE)
  drops = new Array(columns).fill(0).map(() => Math.random() * -50)
}

function draw(): void {
  if (!ctx || paused) {
    raf = requestAnimationFrame(draw)
    return
  }
  const rgb = brandRgb()

  ctx.fillStyle = 'rgba(10, 10, 12, 0.08)'
  ctx.fillRect(0, 0, width.value, height.value)
  ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`

  for (let i = 0; i < columns; i++) {
    const xPos = i * FONT_SIZE
    const yPos = drops[i] * FONT_SIZE
    const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

    const dx = xPos - mouseX.value
    const dy = yPos - mouseY.value
    const dist = Math.hypot(dx, dy)
    const near = dist < MOUSE_RADIUS

    ctx.fillStyle = near ? `rgb(${rgb})` : `rgba(${rgb} / 0.55)`
    ctx.fillText(char, xPos, yPos)

    const speed = BASE_SPEED + (near ? 1.4 : 0)
    drops[i] += speed
    if (yPos > height.value && Math.random() > 0.975) {
      drops[i] = 0
    }
  }
  raf = requestAnimationFrame(draw)
}

function onVisibility(): void {
  paused = document.hidden
}

function start(): void {
  setup()
  paused = false
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(draw)
}

function stop(): void {
  cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  if (!ui.effectsActive) return
  start()
  document.addEventListener('visibilitychange', onVisibility)
})

watch([width, height], () => {
  if (ui.effectsActive) setup()
})

watch(
  () => ui.effectsActive,
  (active) => {
    if (active) {
      start()
      document.addEventListener('visibilitychange', onVisibility)
    } else {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)

      if (ctx) ctx.clearRect(0, 0, width.value, height.value)
    }
  },
)

onBeforeUnmount(() => {
  stop()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <canvas
    v-show="ui.effectsActive"
    ref="canvas"
    class="pointer-events-none fixed inset-0 -z-10 opacity-50"
    aria-hidden="true"
  />
</template>
