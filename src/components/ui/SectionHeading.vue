<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useGlitch } from '@/composables/useGlitch'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  
  prompt: string
  
  title: string
}>()

const ui = useUiStore()
const root = ref<HTMLElement | null>(null)
const decoded = ref(false)
const { output, decodeTo, setInstant, running } = useGlitch(props.prompt, { duration: 700 })

onMounted(() => {
  if (ui.reducedMotion) {
    setInstant(props.prompt)
    decoded.value = true
    return
  }
  setInstant(''.padEnd(props.prompt.length, '_'))
  const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
      if (entry?.isIntersecting && !decoded.value) {
        decoded.value = true
        decodeTo(props.prompt)
        stop()
      }
    },
    { threshold: 0.4 },
  )
})

function onHover(): void {
  if (ui.reducedMotion || running.value) return
  decodeTo(props.prompt)
}
</script>

<template>
  <div
    ref="root"
    class="mb-12"
  >
    <h2
      class="glitch-rgb font-mono text-sm text-brand"
      :class="{ 'glitch-active': running }"
      @mouseenter="onHover"
    >
      {{ output }}
    </h2>
    <p class="mt-2 font-sans text-3xl font-bold text-white sm:text-4xl">
      {{ title }}
    </p>
    <div class="mt-4 h-px w-24 bg-gradient-to-r from-brand to-transparent" />
  </div>
</template>
