<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-vue-next'
import GlitchText from '@/components/effects/GlitchText.vue'
import { vEditable } from '@/directives/vEditable'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { useTypewriter } from '@/composables/useTypewriter'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { output: role, start, stop } = useTypewriter(profile.roles)

onMounted(() => {
  if (ui.reducedMotion) stop()
  else start()
})
onBeforeUnmount(stop)

const uniTexts = ref([profile.university.base, profile.university.alias])
const orgTexts = ref([profile.org.base, profile.org.alias])

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail }
function iconFor(n: string): LucideIcon | null {
  return iconMap[n] ?? null
}
</script>

<template>
  <section id="hero" class="relative flex min-h-screen items-center overflow-hidden">
    <div
      class="section-shell flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-14 lg:gap-20"
    >
      <div class="group relative w-64 shrink-0 sm:w-72 md:w-80 lg:w-[24rem]">
        <div
          class="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand/30 to-accent/20 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <img
          src="/final-pic.png"
          :alt="`${profile.fullName} — ${profile.nickname}`"
          class="relative w-full object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>

      <div class="min-w-0 max-w-2xl text-center md:text-left">
        <p class="mb-4 font-mono text-sm text-brand sm:text-base">
          <span class="text-accent">visitor@itschanity</span>:~$ ./whoami
        </p>

        <h1
          v-editable="'src/data/profile.ts → fullName / handle'"
          class="flex items-start justify-center break-words font-mono text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:justify-start md:text-6xl"
        >
          <GlitchText
            :texts="[profile.fullName, profile.handle]"
            :interval="4000"
            :duration="1100"
            hover-flip
            lockable
          />
        </h1>

        <p
          v-editable="'src/data/profile.ts → tagline'"
          class="mx-auto mt-5 max-w-2xl text-lg text-gray-300 sm:text-xl md:mx-0"
        >
          {{ profile.tagline }}
        </p>

        <p
          v-editable="'src/data/profile.ts → roles'"
          class="mt-4 h-8 font-mono text-xl text-gray-300 sm:text-2xl"
          aria-live="polite"
        >
          <span class="text-brand">&gt;</span> {{ role }}<span class="animate-pulse">_</span>
        </p>

        <div class="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <span v-editable="'src/data/profile.ts → university'" class="chip text-sm sm:text-base">
            <GlitchText :texts="uniTexts" :interval="0" hover-flip :rgb="false" />
          </span>
          <span v-editable="'src/data/profile.ts → org'" class="chip text-sm sm:text-base">
            <GlitchText :texts="orgTexts" :interval="0" hover-flip :rgb="false" />
          </span>
        </div>

        <div
          v-editable="'src/data/socials.ts → socials'"
          class="mt-6 flex items-center justify-center gap-4 md:justify-start"
        >
          <a
            v-for="s in socials"
            :key="s.id"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="glitch-rgb flex h-12 w-12 items-center justify-center rounded-sm border border-white/10 text-gray-300 transition-colors hover:border-brand hover:text-brand"
            :aria-label="s.label"
            :title="s.label"
          >
            <component :is="iconFor(s.icon)" v-if="iconFor(s.icon)" :size="20" />
            <span v-else class="font-mono text-sm">{{ s.label[0] }}</span>
          </a>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted"
      aria-hidden="true"
    >
      scroll ↓
    </div>
  </section>
</template>
