<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { navSections } from '@/data/commands'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const { scrollTo } = useScrollSpy(navSections.map((s) => s.id))

interface PaletteItem {
  id: string
  label: string
  hint: string
  action: () => void
}

const allItems = computed<PaletteItem[]>(() => [
  ...navSections.map((s) => ({
    id: `nav-${s.id}`,
    label: s.label,
    hint: 'section',
    action: () => scrollTo(s.id),
  })),
  {
    id: 'action-cv',
    label: 'Download CV',
    hint: 'action',
    action: () => void ui.downloadCv(profile.cvUrl),
  },
  ...projects.map((p) => ({
    id: `proj-${p.id}`,
    label: p.title,
    hint: 'project',
    action: () => scrollTo('projects'),
  })),
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return allItems.value
  return allItems.value.filter((i) => i.label.toLowerCase().includes(q))
})

function openPalette(): void {
  open.value = true
  query.value = ''
  activeIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}
function closePalette(): void {
  open.value = false
}
function run(item: PaletteItem): void {
  item.action()
  closePalette()
}

onKeyStroke(['k', 'K'], (e) => {
  if (e.metaKey || e.ctrlKey) {
    e.preventDefault()
    if (open.value) closePalette()
    else openPalette()
  }
})
onKeyStroke('Escape', () => {
  if (open.value) closePalette()
})
onKeyStroke('ArrowDown', (e) => {
  if (!open.value) return
  e.preventDefault()
  activeIndex.value = Math.min(filtered.value.length - 1, activeIndex.value + 1)
})
onKeyStroke('ArrowUp', (e) => {
  if (!open.value) return
  e.preventDefault()
  activeIndex.value = Math.max(0, activeIndex.value - 1)
})
onKeyStroke('Enter', (e) => {
  if (!open.value) return
  e.preventDefault()
  const item = filtered.value[activeIndex.value]
  if (item) run(item)
})

watch(query, () => {
  activeIndex.value = 0
})

defineExpose({ openPalette })
</script>

<template>
  <Transition name="palette">
    <div
      v-if="open"
      class="fixed inset-0 z-[160] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      @click.self="closePalette"
    >
      <div
        class="card w-full max-w-lg overflow-hidden"
        role="dialog"
        aria-label="command palette"
      >
        <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span class="font-mono text-sm text-brand">&gt;</span>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="jump to section or project..."
            class="w-full bg-transparent font-mono text-sm text-white placeholder:text-muted focus:outline-none"
            aria-label="search"
          >
          <kbd class="chip text-[10px]">ESC</kbd>
        </div>
        <ul class="max-h-72 overflow-y-auto py-2">
          <li
            v-for="(item, i) in filtered"
            :key="item.id"
            class="flex cursor-pointer items-center justify-between px-4 py-2 font-mono text-sm"
            :class="i === activeIndex ? 'bg-brand/15 text-white' : 'text-gray-300'"
            @mouseenter="activeIndex = i"
            @click="run(item)"
          >
            <span>{{ item.label }}</span>
            <span class="text-[10px] uppercase text-muted">{{ item.hint }}</span>
          </li>
          <li
            v-if="filtered.length === 0"
            class="px-4 py-3 font-mono text-sm text-muted"
          >
            no matches
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.palette-enter-active,
.palette-leave-active {
  transition: opacity 0.15s ease;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
</style>
