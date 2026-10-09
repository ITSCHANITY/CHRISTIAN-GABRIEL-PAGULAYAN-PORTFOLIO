<script setup lang="ts">
import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'

const open = ref(false)

const shortcuts: { keys: string; desc: string }[] = [
  { keys: '`', desc: 'open / close the terminal' },
  { keys: 'Ctrl / ⌘ + K', desc: 'command palette (jump to section/project)' },
  { keys: '?', desc: 'toggle this shortcuts overlay' },
  { keys: '↑ ↑ ↓ ↓ ← → ← → B A', desc: 'the Konami code (try it)' },
  { keys: 'Esc', desc: 'close any open overlay' },
]

onKeyStroke('?', (e) => {
  const el = e.target as HTMLElement
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return
  e.preventDefault()
  open.value = !open.value
})
onKeyStroke('Escape', () => {
  if (open.value) open.value = false
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[160] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      @click.self="open = false"
    >
      <div class="card w-full max-w-md p-6" role="dialog" aria-label="keyboard shortcuts">
        <h3 class="mb-4 font-mono text-sm text-brand" />
        <ul class="space-y-3">
          <li v-for="s in shortcuts" :key="s.keys" class="flex items-center justify-between gap-4">
            <kbd class="chip text-[11px]">{{ s.keys }}</kbd>
            <span class="text-right text-sm text-gray-300">{{ s.desc }}</span>
          </li>
        </ul>
        <button type="button" class="btn mt-6 w-full" @click="open = false">close</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
