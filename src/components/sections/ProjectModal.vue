<script setup lang="ts">
import { watch, computed } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import type { Project } from '@/types'
import { skills } from '@/data/skills'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()

onKeyStroke('Escape', () => {
  if (props.project) emit('close')
})

watch(
  () => props.project,
  (p) => {
    document.body.style.overflow = p ? 'hidden' : ''
  },
)

const usedSkills = computed(() => {
  if (!props.project) return []
  return props.project.skillIds
    .map((id) => skills.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
})
</script>

<template>
  <Transition name="modal">
    <div
      v-if="project"
      class="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="card max-h-[85vh] w-full max-w-2xl overflow-y-auto"
        role="dialog"
        :aria-label="project.title"
      >
        <div
          class="sticky top-0 flex items-center justify-between border-b border-white/10 bg-ink-800/95 px-5 py-3 backdrop-blur"
        >
          <div class="flex items-center gap-2 font-mono text-sm">
            <span class="text-accent">visitor@itschanity:~$</span>
            <span class="text-white">cat {{ project.id }}.md</span>
          </div>
          <button
            type="button"
            class="text-muted hover:text-brand"
            aria-label="close"
            @click="emit('close')"
          >
            <X :size="18" />
          </button>
        </div>

        <div class="space-y-5 p-6">
          <div>
            <p class="font-mono text-xs text-brand">codename: {{ project.codename }}</p>
            <h3 class="mt-1 text-2xl font-bold text-white">
              {{ project.title }}
            </h3>
            <p class="mt-2 leading-relaxed text-gray-300">
              {{ project.description }}
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-sm border border-white/10 bg-black/30 p-4">
              <p class="mb-1 font-mono text-xs uppercase text-brand">problem</p>
              <p class="text-sm text-gray-300">
                {{ project.problem }}
              </p>
            </div>
            <div class="rounded-sm border border-white/10 bg-black/30 p-4">
              <p class="mb-1 font-mono text-xs uppercase text-accent">approach</p>
              <p class="text-sm text-gray-300">
                {{ project.approach }}
              </p>
            </div>
          </div>

          <div v-if="project.features.length">
            <p class="mb-2 font-mono text-xs uppercase text-muted">features</p>
            <ul class="space-y-1.5">
              <li
                v-for="(f, i) in project.features"
                :key="i"
                class="flex gap-2 text-sm text-gray-300"
              >
                <span class="text-brand">▸</span>{{ f }}
              </li>
            </ul>
          </div>

          <div v-if="project.lessons.length">
            <p class="mb-2 font-mono text-xs uppercase text-muted">lessons learned</p>
            <ul class="space-y-1.5">
              <li
                v-for="(l, i) in project.lessons"
                :key="i"
                class="flex gap-2 text-sm text-gray-300"
              >
                <span class="text-accent">$</span>{{ l }}
              </li>
            </ul>
          </div>

          <div>
            <p class="mb-2 font-mono text-xs uppercase text-muted">stack</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in project.tech" :key="t" class="chip">{{ t }}</span>
            </div>
          </div>

          <div v-if="usedSkills.length">
            <p class="mb-2 font-mono text-xs uppercase text-muted">skills used</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="s in usedSkills" :key="s.id" class="chip !text-[11px] text-brand">{{
                s.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
