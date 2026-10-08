<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    phrases: string[]
    typeSpeed?: number
    deleteSpeed?: number
    holdTime?: number
  }>(),
  { typeSpeed: 55, deleteSpeed: 28, holdTime: 1600 },
)

const output = ref('')
let phraseIndex = 0
let charIndex = 0
let deleting = false
let timer: ReturnType<typeof setTimeout> | undefined

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function tick() {
  const current = props.phrases[phraseIndex] ?? ''

  if (!deleting) {
    output.value = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      deleting = true
      timer = setTimeout(tick, props.holdTime)
      return
    }
    timer = setTimeout(tick, props.typeSpeed)
  } else {
    output.value = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % props.phrases.length
    }
    timer = setTimeout(tick, props.deleteSpeed)
  }
}

onMounted(() => {
  if (reduceMotion) {
    // Show the first phrase statically for reduced-motion users.
    output.value = props.phrases[0] ?? ''
    return
  }
  timer = setTimeout(tick, 400)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <span class="inline-flex items-center">
    <span>{{ output }}</span>
    <span
      class="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] bg-accent"
      :class="reduceMotion ? '' : 'animate-blink'"
      aria-hidden="true"
    ></span>
  </span>
</template>
