<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-vue-next'
import type { ExperienceEntry } from '@/types'
import { useUiStore } from '@/stores/ui'

gsap.registerPlugin(ScrollTrigger)

defineProps<{ entries: ExperienceEntry[] }>()
const ui = useUiStore()
const expanded = ref<string | null>(null)
const lineRef = ref<HTMLElement | null>(null)
let trigger: ScrollTrigger | null = null

function toggle(id: string): void {
  expanded.value = expanded.value === id ? null : id
}

onMounted(() => {
  if (ui.reducedMotion || !lineRef.value) return

  const tween = gsap.fromTo(
    lineRef.value,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: lineRef.value,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    },
  )
  trigger = tween.scrollTrigger ?? null
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>

<template>
  <div class="relative ml-3 pl-8">
    
    <div
      class="absolute left-0 top-0 h-full w-px bg-white/10"
      aria-hidden="true"
    />
    <div
      ref="lineRef"
      class="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-brand to-accent"
      aria-hidden="true"
    />

    <div
      v-for="entry in entries"
      :key="entry.id"
      class="relative mb-8 last:mb-0"
    >
      
      <span
        class="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand bg-ink-900"
        aria-hidden="true"
      />

      <button
        type="button"
        class="w-full text-left"
        :aria-expanded="expanded === entry.id"
        @click="toggle(entry.id)"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="font-mono text-xs text-brand">
              {{ entry.period }}
            </p>
            <h3 class="mt-1 font-semibold text-white">
              {{ entry.role }}
            </h3>
            <p class="text-sm text-muted">
              {{ entry.org }}
            </p>
          </div>
          <ChevronDown
            :size="18"
            class="shrink-0 text-muted transition-transform"
            :class="{ 'rotate-180': expanded === entry.id }"
          />
        </div>
        <p class="mt-2 text-sm text-gray-400">
          {{ entry.summary }}
        </p>
      </button>

      <Transition name="expand">
        <div
          v-if="expanded === entry.id"
          class="mt-3 overflow-hidden"
        >
          <ul class="space-y-1.5 border-l border-brand/30 pl-4">
            <li
              v-for="(d, i) in entry.details"
              :key="i"
              class="text-sm text-gray-300"
            >
              <span class="mr-1 font-mono text-brand">&gt;</span>{{ d }}
            </li>
          </ul>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="t in entry.tags"
              :key="t"
              class="chip !text-[10px]"
            >{{ t }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 400px;
}
</style>
