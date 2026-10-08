<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/data/types'
import { statusMeta, trackAccent } from '@/lib/presentation'
import AppIcon from './AppIcon.vue'

const props = defineProps<{ project: Project }>()

const expanded = ref(false)
const toggle = () => (expanded.value = !expanded.value)

const accent = trackAccent[props.project.track]
const status = statusMeta[props.project.status]
const panelId = `proj-${props.project.id}`
</script>

<template>
  <article
    class="group relative flex flex-col rounded-lg border bg-panel/70 backdrop-blur-sm transition-colors duration-300"
    :class="[accent.border, accent.hoverBorder]"
  >
    <!-- Header (button toggles expand) -->
    <button
      type="button"
      class="flex w-full cursor-pointer flex-col gap-3 p-5 text-left"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="toggle"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          <span
            class="h-1.5 w-1.5 shrink-0 rounded-full"
            :class="accent.dot"
            aria-hidden="true"
          ></span>
          <h3
            class="truncate font-semibold tracking-tight text-fg"
            :class="project.featured ? 'text-lg' : 'text-base'"
          >
            {{ project.name }}
          </h3>
        </div>
        <span
          class="shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider"
          :class="status.classes"
        >
          {{ status.label }}
        </span>
      </div>

      <p class="text-sm leading-relaxed text-fg-dim">
        {{ project.tagline }}
      </p>

      <!-- Stack chips -->
      <ul class="flex flex-wrap gap-1.5">
        <li
          v-for="tech in project.stack"
          :key="tech"
          class="rounded border border-line bg-panel-2/60 px-2 py-0.5 text-[11px] text-fg-dim"
        >
          {{ tech }}
        </li>
      </ul>

      <!-- Expand affordance -->
      <div
        class="mt-1 flex items-center gap-1.5 text-xs"
        :class="accent.text"
      >
        <span class="font-mono">{{ expanded ? '$ collapse' : '$ cat details' }}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform duration-300"
          :class="expanded ? 'rotate-180' : ''"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </button>

    <!-- Expandable body -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[40rem]"
      leave-from-class="opacity-100 max-h-[40rem]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="expanded" :id="panelId" class="overflow-hidden">
        <div class="border-t border-line px-5 pb-5 pt-4">
          <p v-if="project.period" class="mb-3 font-mono text-xs text-fg-faint">
            <span :class="accent.text"># </span>{{ project.period }}
          </p>
          <p class="mb-4 text-sm leading-relaxed text-fg">
            {{ project.summary }}
          </p>

          <ul class="space-y-2">
            <li
              v-for="(point, i) in project.highlights"
              :key="i"
              class="flex gap-2.5 text-sm leading-relaxed text-fg-dim"
            >
              <span class="mt-1 shrink-0 font-mono text-xs" :class="accent.text"
                >&gt;</span
              >
              <span>{{ point }}</span>
            </li>
          </ul>

          <!-- Links -->
          <div
            v-if="project.links?.length"
            class="mt-5 flex flex-wrap gap-2"
          >
            <a
              v-for="link in project.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded border border-line bg-panel-2/60 px-3 py-1.5 text-xs text-fg transition-colors hover:border-fg-faint hover:text-fg"
            >
              <AppIcon v-if="link.icon" :name="link.icon" :size="14" />
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </article>
</template>
