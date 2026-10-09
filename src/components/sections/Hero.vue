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
  <section
    id="hero"
    class="relative flex min-h-screen items-center overflow-hidden"
  >
    <div class="section-shell w-full">
      
      <p class="mb-4 font-mono text-sm text-brand">
        <span class="text-accent">visitor@itschanity</span>:~$ ./whoami
      </p>

      
      
      <h1
        v-editable="'src/data/profile.ts → fullName / handle'"
        class="font-mono text-[2.1rem] font-extrabold leading-tight text-white sm:text-6xl md:text-7xl"
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
        class="mt-4 max-w-xl text-base text-gray-300"
      >
        {{ profile.tagline }}
      </p>

      
      <p
        v-editable="'src/data/profile.ts → roles'"
        class="mt-3 h-7 font-mono text-lg text-gray-300 sm:text-xl"
        aria-live="polite"
      >
        <span class="text-brand">&gt;</span> {{ role }}<span class="animate-pulse">_</span>
      </p>

      
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <span
          v-editable="'src/data/profile.ts → university'"
          class="chip"
        >
          <GlitchText
            :texts="uniTexts"
            :interval="0"
            hover-flip
            :rgb="false"
          />
        </span>
        <span
          v-editable="'src/data/profile.ts → org'"
          class="chip"
        >
          <GlitchText
            :texts="orgTexts"
            :interval="0"
            hover-flip
            :rgb="false"
          />
        </span>
      </div>

      
      <div
        v-editable="'src/data/socials.ts → socials'"
        class="mt-5 flex items-center gap-3"
      >
        <a
          v-for="s in socials"
          :key="s.id"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="glitch-rgb flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-gray-300 transition-colors hover:border-brand hover:text-brand"
          :aria-label="s.label"
          :title="s.label"
        >
          <component
            :is="iconFor(s.icon)"
            v-if="iconFor(s.icon)"
            :size="17"
          />
          <span
            v-else
            class="font-mono text-xs"
          >{{ s.label[0] }}</span>
        </a>
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
