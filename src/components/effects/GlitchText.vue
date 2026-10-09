<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useGlitch, DEFAULT_SCRAMBLE_CHARS } from '@/composables/useGlitch'
import { useUiStore } from '@/stores/ui'

const props = withDefaults(
  defineProps<{
    texts: string[]

    interval?: number

    scrambleChars?: string

    duration?: number

    hoverFlip?: boolean

    lockable?: boolean

    rgb?: boolean

    tag?: string
  }>(),
  {
    interval: 4000,
    scrambleChars: DEFAULT_SCRAMBLE_CHARS,
    duration: 900,
    hoverFlip: false,
    lockable: false,
    rgb: true,
    tag: 'span',
  },
)

const ui = useUiStore()
const idx = ref(0)
const locked = ref(false)
const { output, running, decodeTo, setInstant } = useGlitch(props.texts[0] ?? '', {
  scrambleChars: props.scrambleChars,
  duration: props.duration,
})

let timer = 0

function scheduleNext(): void {
  if (props.interval <= 0 || props.texts.length < 2) return
  timer = window.setTimeout(cycle, props.interval)
}

async function cycle(): Promise<void> {
  if (locked.value || ui.reducedMotion) {
    scheduleNext()
    return
  }
  idx.value = (idx.value + 1) % props.texts.length
  await decodeTo(props.texts[idx.value])
  scheduleNext()
}

async function flip(): Promise<void> {
  if (!props.hoverFlip || locked.value || ui.reducedMotion || running.value) return
  idx.value = (idx.value + 1) % props.texts.length
  await decodeTo(props.texts[idx.value])
}

function toggleLock(): void {
  if (!props.lockable) return
  locked.value = !locked.value
  ui.toast(locked.value ? 'identity LOCKED' : 'identity unlocked', 'info')
}

watch(
  () => ui.glitchPulse,
  () => {
    if (ui.reducedMotion) return
    decodeTo(props.texts[idx.value])
  },
)

onMounted(() => {
  if (ui.reducedMotion) {
    setInstant(props.texts[0] ?? '')
  } else {
    scheduleNext()
  }
})
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <component
    :is="tag"
    class="relative inline-flex items-center gap-2"
    :class="{ 'glitch-rgb': rgb, 'glitch-active': running, 'cursor-pointer': lockable }"
    @mouseenter="flip"
    @click="toggleLock"
  >
    <span>{{ output }}</span>
    <span
      v-if="locked"
      class="rounded-sm border border-brand/60 px-1 py-0.5 font-mono text-[0.5em] tracking-widest text-brand"
      aria-label="identity locked"
    >
      LOCKED
    </span>
  </component>
</template>
