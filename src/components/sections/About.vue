<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TiltCard from '@/components/ui/TiltCard.vue'
import { vEditable } from '@/directives/vEditable'
import { profile } from '@/data/profile'
import { projectCount } from '@/data/projects'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const root = ref<HTMLElement | null>(null)

const typedLines = ref<string[]>([])
const started = ref(false)

const stats = computed(() =>
  profile.stats.map((s, i) => (i === 0 ? { ...s, value: projectCount } : s)),
)
const counts = ref<number[]>(profile.stats.map(() => 0))

function typeBio(): void {
  if (ui.reducedMotion) {
    typedLines.value = [...profile.bioLines]
    return
  }
  let i = 0
  const next = (): void => {
    if (i >= profile.bioLines.length) return
    typedLines.value.push(profile.bioLines[i])
    i++
    window.setTimeout(next, 420)
  }
  next()
}

function runCounts(): void {
  stats.value.forEach((stat, idx) => {
    if (ui.reducedMotion) {
      counts.value[idx] = stat.value
      return
    }
    const duration = 1200
    const start = performance.now()
    const step = (now: number): void => {
      const p = Math.min(1, (now - start) / duration)
      counts.value[idx] = Math.round(stat.value * p)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting && !started.value) {
      started.value = true
      typeBio()
      runCounts()
    }
  },
  { threshold: 0.3 },
)
</script>

<template>
  <section
    id="about"
    ref="root"
    class="section-shell"
  >
    <SectionHeading
      prompt="> cat about.txt"
      title="About"
    />

    <div class="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      
      <div class="card overflow-hidden">
        <div class="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span class="h-3 w-3 rounded-full bg-red-500/80" />
          <span class="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span class="h-3 w-3 rounded-full bg-green-500/80" />
          <span class="ml-2 font-mono text-xs text-muted">about.txt — $ whoami</span>
        </div>
        <div
          v-editable="'src/data/profile.ts → bioLines'"
          class="min-h-[14rem] space-y-1 p-5"
        >
          <p
            v-for="(line, i) in typedLines"
            :key="i"
            class="term-text text-gray-300"
          >
            <span class="mr-2 text-brand">$</span>{{ line }}
          </p>
          <span
            class="inline-block h-4 w-2 animate-pulse bg-brand align-middle"
            aria-hidden="true"
          />
        </div>

        
        <div
          v-editable="'src/data/profile.ts → details'"
          class="border-t border-white/10 p-5"
        >
          <dl class="space-y-2">
            <div
              v-for="d in profile.details"
              :key="d.label"
              class="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
            >
              <dt class="shrink-0 font-mono text-xs uppercase text-accent sm:w-32">
                {{ d.label }}
              </dt>
              <dd class="text-sm text-gray-300">
                {{ d.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      
      <div class="space-y-6">
        <TiltCard :max="10">
          <div
            v-editable="'src/data/profile.ts → handle / nickname'"
            class="card p-5"
          >
            <p class="font-mono text-xs text-muted">

            </p>
            <p class="mt-2 text-2xl font-bold text-white">
              {{ profile.handle }}
            </p>
            <p class="font-mono text-sm text-brand">
              aka "{{ profile.nickname }}"
            </p>
            <div class="mt-4 space-y-1 font-mono text-xs text-gray-400">
              <p><span class="text-accent">role:</span> {{ profile.careerGoal }}</p>
              <p><span class="text-accent">os:</span> Kali Linux</p>
              <p><span class="text-accent">tracks:</span> security · web · gamedev</p>
            </div>
          </div>
        </TiltCard>

        
        <div
          v-editable="'src/data/profile.ts → stats'"
          class="grid grid-cols-3 gap-3"
        >
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="card p-3 text-center"
          >
            <p class="font-mono text-2xl font-bold text-brand">
              {{ counts[i] }}<span v-if="stat.suffix">{{ stat.suffix }}</span>
            </p>
            <p class="mt-1 text-[11px] uppercase tracking-wide text-muted">
              {{ stat.label }}
            </p>
          </div>
        </div>

        
        <div
          v-editable="'src/data/profile.ts → currentlyLearning'"
          class="card p-5"
        >
          <p class="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
            <span class="h-2 w-2 animate-pulse rounded-full bg-brand" />
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="t in profile.currentlyLearning"
              :key="t"
              class="chip !text-[11px]"
            >{{
              t
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
