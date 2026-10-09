<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { vEditable } from '@/directives/vEditable'
import { skills, skillTabs } from '@/data/skills'
import { projects } from '@/data/projects'
import { useUiStore } from '@/stores/ui'
import { useScrollSpy } from '@/composables/useScrollSpy'
import type { Skill, SkillLevel } from '@/types'

const ui = useUiStore()
const root = ref<HTMLElement | null>(null)
const inView = ref(false)

const LEVEL_PERCENT: Record<SkillLevel, number> = {
  Learning: 65,
  Working: 80,
  Strong: 92,
}
function pct(s: Skill): number {
  return s.percent ?? LEVEL_PERCENT[s.level]
}

const grouped = computed(() =>
  skillTabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    items: skills.filter((s) => s.category === tab.id),
  })),
)

useIntersectionObserver(
  root,
  ([entry]) => {
    inView.value = Boolean(entry?.isIntersecting)
  },
  { threshold: 0.2 },
)

const { scrollTo } = useScrollSpy(['projects'])
const hovered = ref<string | null>(null)

const linkedProjects = computed(() => {
  if (!ui.activeSkillId) return []
  const skill = skills.find((s) => s.id === ui.activeSkillId)
  if (!skill) return []
  return projects.filter((p) => skill.projectIds.includes(p.id))
})
const activeSkillName = computed(() => skills.find((s) => s.id === ui.activeSkillId)?.name ?? '')
</script>

<template>
  <section id="skills" ref="root" class="section-shell">
    <SectionHeading prompt="> ./skills --matrix" title="Skill Matrix" />

    <p class="mb-6 font-mono text-xs text-muted">
      // click a skill to highlight the projects that used it
    </p>

    <Transition name="fade">
      <div
        v-if="ui.activeSkillId && linkedProjects.length"
        class="mb-6 flex flex-wrap items-center gap-2 rounded-sm border border-brand/40 bg-brand/5 p-3"
      >
        <span class="font-mono text-xs text-brand">{{ activeSkillName }} →</span>
        <button
          v-for="p in linkedProjects"
          :key="p.id"
          type="button"
          class="chip !text-[11px] hover:border-brand"
          @mouseenter="ui.setActiveProject(p.id)"
          @mouseleave="ui.setActiveProject(null)"
          @click="scrollTo('projects')"
        >
          {{ p.title }}
        </button>
        <button
          type="button"
          class="ml-auto font-mono text-[11px] text-muted hover:text-brand"
          @click="ui.setActiveSkill(null)"
        >
          [clear]
        </button>
      </div>
    </Transition>

    <div
      v-editable="'src/data/skills.ts → skills'"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="cat in grouped"
        :key="cat.id"
        class="card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg"
      >
        <h3 class="mb-5 flex items-center gap-2 font-mono text-brand">
          <span class="h-5 w-0.5 bg-brand" aria-hidden="true" />
          <span class="text-accent">[]</span> {{ cat.label }}
        </h3>

        <div class="flex flex-col gap-4">
          <button
            v-for="s in cat.items"
            :key="s.id"
            type="button"
            class="group flex flex-col gap-1.5 text-left"
            :aria-pressed="ui.activeSkillId === s.id"
            @click="ui.setActiveSkill(s.id)"
            @mouseenter="hovered = s.id"
            @mouseleave="hovered = null"
          >
            <div class="flex items-center justify-between gap-2">
              <span
                class="glitch-rgb font-mono text-sm"
                :class="
                  ui.activeSkillId === s.id ||
                  (ui.activeProjectId && s.projectIds.includes(ui.activeProjectId))
                    ? 'text-brand'
                    : 'text-gray-200'
                "
              >
                {{ hovered === s.id ? s.alias : s.name }}
              </span>
              <span class="font-mono text-[10px] uppercase text-muted">{{ s.level }}</span>
            </div>

            <div class="h-2 w-full overflow-hidden rounded-full bg-black/50">
              <div
                class="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-[width] duration-700 ease-out"
                :style="{ width: inView || ui.reducedMotion ? `${pct(s)}%` : '0%' }"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
