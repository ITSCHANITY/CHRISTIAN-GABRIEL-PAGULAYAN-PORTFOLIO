<script setup lang="ts">
import { ref, computed } from 'vue'
import TiltCard from '@/components/ui/TiltCard.vue'
import type { Project, ProjectStatus } from '@/types'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ open: [project: Project] }>()

const ui = useUiStore()
const hovered = ref(false)

const highlighted = computed(() => ui.activeProjectId === props.project.id)

const statusMeta: Record<ProjectStatus, { label: string; cls: string }> = {
  completed: { label: 'COMPLETED', cls: 'border-green-500/50 text-green-400' },
  'in-progress': { label: 'IN PROGRESS', cls: 'border-yellow-500/50 text-yellow-400' },
  planned: { label: 'PLANNED', cls: 'border-sky-500/50 text-sky-400' },
  thesis: { label: 'THESIS', cls: 'border-brand/60 text-brand' },
}
</script>

<template>
  <TiltCard :max="7">
    <article
      class="card group flex h-full cursor-pointer flex-col overflow-hidden p-5 transition-colors"
      :class="highlighted ? 'border-brand ring-1 ring-brand/50' : 'hover:border-brand/50'"
      role="button"
      :aria-label="`open ${project.title}`"
      tabindex="0"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click="emit('open', project)"
      @keydown.enter="emit('open', project)"
    >
      <header class="mb-3 flex items-start justify-between gap-3">
        <h3 class="glitch-rgb font-mono text-base font-semibold text-white">
          <span v-if="!hovered">{{ project.title }}</span>
          <span
            v-else
            class="text-brand"
          >{{ project.codename }}</span>
        </h3>
        <span
          class="shrink-0 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-wide"
          :class="statusMeta[project.status].cls"
        >
          {{ statusMeta[project.status].label }}
        </span>
      </header>

      <p class="mb-4 text-sm text-gray-400">
        {{ project.summary }}
      </p>

      
      <div
        class="mb-4 min-h-[5.5rem] rounded-sm border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-green-400 transition-opacity"
        :class="hovered ? 'opacity-100' : 'opacity-50'"
      >
        <p
          v-for="(l, i) in project.terminalPreview"
          :key="i"
          class="whitespace-pre-wrap"
        >
          {{ l }}
        </p>
      </div>

      <footer class="mt-auto flex flex-wrap gap-1.5">
        <span
          v-for="t in project.tech.slice(0, 4)"
          :key="t"
          class="chip !text-[10px]"
        >{{ t }}</span>
        <span
          v-if="project.tech.length > 4"
          class="chip !text-[10px]"
        >+{{ project.tech.length - 4 }}</span>
      </footer>
    </article>
  </TiltCard>
</template>
