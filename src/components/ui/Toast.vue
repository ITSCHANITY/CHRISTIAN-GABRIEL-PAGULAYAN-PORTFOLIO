<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

function kindClass(kind: string): string {
  if (kind === 'success') return 'border-green-500/50 text-green-300'
  if (kind === 'error') return 'border-red-500/50 text-red-300'
  return 'border-brand/50 text-brand'
}
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-5 right-5 z-[150] flex flex-col gap-2"
    role="status"
    aria-live="polite"
  >
    <TransitionGroup name="toast">
      <div
        v-for="t in ui.toasts"
        :key="t.id"
        class="glitch-rgb pointer-events-auto rounded-sm border bg-ink-800/95 px-4 py-2 font-mono text-xs shadow-lg backdrop-blur"
        :class="kindClass(t.kind)"
      >
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
