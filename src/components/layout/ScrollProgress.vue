<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll()
const { height } = useWindowSize()

const progress = computed(() => {
  const max = document.documentElement.scrollHeight - height.value
  if (max <= 0) return 0
  return Math.min(100, (y.value / max) * 100)
})
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[130] h-0.5 bg-transparent"
    aria-hidden="true"
  >
    <div
      class="scroll-bar h-full transition-[width] duration-75"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
