<script setup lang="ts">
import { navSections } from '@/data/commands'
import { useScrollSpy } from '@/composables/useScrollSpy'

const { activeId, scrollTo } = useScrollSpy(navSections.map((s) => s.id))
</script>

<template>
  <nav
    class="fixed right-5 top-1/2 z-[110] hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    aria-label="section navigation"
  >
    <button
      v-for="s in navSections"
      :key="s.id"
      type="button"
      class="group relative flex items-center justify-end"
      :aria-label="`go to ${s.label}`"
      :aria-current="activeId === s.id ? 'true' : undefined"
      @click="scrollTo(s.id)"
    >
      <span
        class="pointer-events-none absolute right-5 whitespace-nowrap rounded-sm bg-ink-700 px-2 py-0.5 font-mono text-[10px] text-gray-300 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {{ s.label }}
      </span>
      <span
        class="h-2.5 w-2.5 rounded-full border transition-all"
        :class="
          activeId === s.id
            ? 'scale-125 border-brand bg-brand'
            : 'border-white/30 bg-transparent group-hover:border-brand'
        "
      />
    </button>
  </nav>
</template>
