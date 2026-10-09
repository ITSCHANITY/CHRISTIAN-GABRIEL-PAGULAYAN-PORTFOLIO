<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import ProjectModal from '@/components/sections/ProjectModal.vue'
import { vEditable } from '@/directives/vEditable'
import { projects, projectFilters, projectCount } from '@/data/projects'
import type { Project, ProjectCategory } from '@/types'

const activeFilter = ref<ProjectCategory | 'all'>('all')
const selected = ref<Project | null>(null)
const hoveredId = ref<string | null>(null)

const filtered = computed(() => {
  return projects.filter((p) => activeFilter.value === 'all' || p.category === activeFilter.value)
})

function open(project: Project): void {
  selected.value = project
}
function close(): void {
  selected.value = null
}
</script>

<template>
  <section id="projects" class="section-shell">
    <SectionHeading prompt="> ./projects --list" title="Projects" />

    <p class="mb-6 font-mono text-xs text-muted">{{ filtered.length }} of {{ projectCount }} shown</p>

    <div class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="f in projectFilters"
        :key="f.id"
        type="button"
        class="rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors"
        :class="
          activeFilter === f.id
            ? 'border-brand bg-brand/10 text-brand'
            : 'border-white/10 text-gray-400 hover:text-white'
        "
        @click="activeFilter = f.id"
      >
        {{ f.label }}
      </button>
    </div>

    <TransitionGroup
      v-editable="'src/data/projects.ts → projects'"
      tag="div"
      name="proj"
      class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProjectCard
        v-for="project in filtered"
        :key="project.id"
        :project="project"
        :dimmed="hoveredId !== null && hoveredId !== project.id"
        @open="open"
        @hover="hoveredId = $event"
      />
    </TransitionGroup>

    <p v-if="filtered.length === 0" class="py-10 text-center font-mono text-sm text-muted">
      no projects in this category
    </p>

    <ProjectModal :project="selected" @close="close" />
  </section>
</template>

<style scoped>
.proj-move,
.proj-enter-active,
.proj-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.proj-enter-from,
.proj-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
.proj-leave-active {
  position: absolute;
}
</style>
