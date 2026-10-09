<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useTerminalStore } from '@/stores/terminal'
import { useTerminal } from '@/composables/useTerminal'

const term = useTerminalStore()
const { execute, autocomplete, historyPrev, historyNext, banner } = useTerminal()

const input = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

function scrollToBottom(): void {
  nextTick(() => {
    if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  })
}

function submit(): void {
  execute(input.value)
  input.value = ''
  scrollToBottom()
}

function onTab(e: KeyboardEvent): void {
  e.preventDefault()
  input.value = autocomplete(input.value)
  scrollToBottom()
}

function onUp(e: KeyboardEvent): void {
  e.preventDefault()
  input.value = historyPrev()
}
function onDown(e: KeyboardEvent): void {
  e.preventDefault()
  input.value = historyNext()
}

onKeyStroke('`', (e) => {
  const el = e.target as HTMLElement
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {

    if (!term.open) return
  }
  e.preventDefault()
  term.toggleTerminal()
})
onKeyStroke('Escape', () => {
  if (term.open) term.closeTerminal()
})

watch(
  () => term.open,
  (isOpen) => {
    if (isOpen) {
      banner()
      scrollToBottom()
      nextTick(() => inputRef.value?.focus())
    }
  },
)
watch(() => term.lines.length, scrollToBottom)

onMounted(() => {

})
</script>

<template>
  <Transition name="term">
    <section
      v-if="term.open"
      class="fixed inset-x-0 bottom-0 z-[140] h-[55vh] border-t border-brand/40 bg-ink-900/97 backdrop-blur"
      role="dialog"
      aria-label="interactive terminal"
    >
      
      <div class="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full bg-red-500/80" />
          <span class="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span class="h-3 w-3 rounded-full bg-green-500/80" />
          <span class="ml-2 font-mono text-xs text-muted">visitor@itschanity: ~</span>
        </div>
        <button
          type="button"
          class="font-mono text-xs text-muted hover:text-brand"
          aria-label="close terminal"
          @click="term.closeTerminal()"
        >
          [x] close (esc)
        </button>
      </div>

      
      <div
        ref="bodyRef"
        class="h-[calc(55vh-5.6rem)] overflow-y-auto px-4 py-3"
        @click="inputRef?.focus()"
      >
        <p
          v-for="line in term.lines"
          :key="line.id"
          class="term-text whitespace-pre-wrap"
          :class="line.kind === 'input' ? 'text-gray-200' : 'text-brand'"
        >
          {{ line.text }}
        </p>
      </div>

      
      <form
        class="flex items-center gap-2 border-t border-white/10 px-4 py-2"
        @submit.prevent="submit"
      >
        <span class="shrink-0 font-mono text-sm text-accent">visitor@itschanity:~$</span>
        <input
          ref="inputRef"
          v-model="input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          class="w-full bg-transparent font-mono text-sm text-white caret-brand focus:outline-none"
          aria-label="terminal input"
          @keydown.tab="onTab"
          @keydown.up="onUp"
          @keydown.down="onDown"
        >
      </form>
    </section>
  </Transition>
</template>

<style scoped>
.term-enter-active,
.term-leave-active {
  transition: transform 0.25s ease;
}
.term-enter-from,
.term-leave-to {
  transform: translateY(100%);
}
</style>
