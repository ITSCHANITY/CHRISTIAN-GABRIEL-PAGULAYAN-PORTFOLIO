<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import ProjectModal from '@/components/sections/ProjectModal.vue'
import { vEditable } from '@/directives/vEditable'
import { projects, projectFilters, projectCount } from '@/data/projects'
import type { Project, ProjectCategory } from '@/types'

const activeFilter = ref<ProjectCategory | 'all'>('all')
const query = ref('')
const selected = ref<Project | null>(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projects.filter((p) => {
    const matchesFilter = activeFilter.value === 'all' || p.category === activeFilter.value
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
    return matchesFilter && matchesQuery
  })
})

function open(project: Project): void {
  selected.value = project
}
function close(): void {
  selected.value = null
}
</script>

<template>
  <section
    id="projects"
    class="section-shell"
  >
    <SectionHeading
      prompt="> ./projects --list"
      title="Projects"
    />

    
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="font-mono text-xs text-muted">

      </p>
      <label class="flex items-center gap-2 rounded-sm border border-white/10 bg-ink-800 px-3 py-2">
        <Search
          :size="15"
          class="text-muted"
        />
        <input
          v-model="query"
          type="search"
          placeholder="search projects / tech..."
          class="w-full bg-transparent font-mono text-xs text-white placeholder:text-muted focus:outline-none sm:w-64"
          aria-label="search projects"
        >
      </label>
    </div>

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
        @open="open"
      />
    </TransitionGroup>

    <p
      v-if="filtered.length === 0"
      class="py-10 text-center font-mono text-sm text-muted"
    >
      no projects match "{{ query }}"
    </p>

    <ProjectModal
      :project="selected"
      @close="close"
    />
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
