<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects } from '@/data/projects'
import { tracks } from '@/data/profile'
import type { TrackId } from '@/data/types'
import SectionHeader from '../SectionHeader.vue'
import ProjectCard from '../ProjectCard.vue'
import { trackAccent } from '@/lib/presentation'
import { vReveal } from '@/directives/reveal'

type Filter = TrackId | 'all'

const active = ref<Filter>('all')

const filters = computed(() => [
  { id: 'all' as Filter, label: 'all' },
  ...tracks.map((t) => ({ id: t.id as Filter, label: t.label })),
])

const visibleTracks = computed(() =>
  active.value === 'all'
    ? tracks
    : tracks.filter((t) => t.id === active.value),
)

const projectsFor = (id: TrackId) =>
  projects.filter((p) => p.track === id)
</script>

<template>
  <section
    id="projects"
    class="relative mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28"
  >
    <div v-reveal>
      <SectionHeader
        index="02 — projects"
        command="find ./projects -type track"
        title="Projects"
        subtitle="Work across three tracks — offensive & defensive security tooling, embedded/IoT hardware, and web apps. Click any card to expand the case study."
      />
    </div>

    <!-- Track filter -->
    <div v-reveal="60" class="mb-10 flex flex-wrap gap-2">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="rounded border px-3.5 py-1.5 font-mono text-xs transition-colors"
        :class="
          active === f.id
            ? 'border-accent/50 bg-accent/10 text-accent'
            : 'border-line bg-panel/50 text-fg-dim hover:border-fg-faint hover:text-fg'
        "
        @click="active = f.id"
      >
        <span class="opacity-60">#</span>{{ f.label }}
      </button>
    </div>

    <!-- Tracks -->
    <div class="space-y-14">
      <div v-for="track in visibleTracks" :key="track.id" v-reveal="80">
        <!-- Track header -->
        <div class="mb-5 flex items-center gap-3">
          <span
            class="h-2 w-2 rounded-full"
            :class="trackAccent[track.id].dot"
            aria-hidden="true"
          ></span>
          <h3
            class="font-mono text-sm font-semibold"
            :class="trackAccent[track.id].text"
          >
            {{ track.command }}
          </h3>
          <span class="h-px flex-1 bg-line"></span>
          <span class="font-mono text-xs text-fg-faint">
            {{ projectsFor(track.id).length }} entr{{
              projectsFor(track.id).length === 1 ? 'y' : 'ies'
            }}
          </span>
        </div>
        <p class="mb-5 text-sm text-fg-dim">{{ track.blurb }}</p>

        <!-- Cards -->
        <div class="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            v-for="project in projectsFor(track.id)"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </div>
  </section>
</template>
