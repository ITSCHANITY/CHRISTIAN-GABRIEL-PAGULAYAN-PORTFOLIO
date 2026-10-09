<script setup lang="ts">
import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import {
  Zap,
  ZapOff,
  Palette,
  Pencil,
  Download,
  Menu,
  X,
  Terminal as TerminalIcon,
} from 'lucide-vue-next'
import GlitchText from '@/components/effects/GlitchText.vue'
import { navSections } from '@/data/commands'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useUiStore } from '@/stores/ui'
import { useTerminalStore } from '@/stores/terminal'

const ui = useUiStore()
const term = useTerminalStore()
const { y } = useWindowScroll()
const { activeId, scrollTo } = useScrollSpy(navSections.map((s) => s.id))
const menuOpen = ref(false)

const isDev = import.meta.env.DEV

function go(id: string): void {
  scrollTo(id)
  menuOpen.value = false
}

function downloadCv(): void {
  void ui.downloadCv(profile.cvUrl)
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[120] border-b transition-colors duration-300"
    :class="y > 40 ? 'border-white/10 bg-ink-900/85 backdrop-blur' : 'border-transparent'"
  >
    <nav class="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-10 sm:py-4">
      <button
        type="button"
        class="flex w-[8.5rem] shrink-0 justify-start overflow-hidden whitespace-nowrap font-mono text-lg font-bold text-white sm:w-[10rem] sm:text-2xl"
        @click="go('hero')"
      >
        <GlitchText :texts="['CGP', 'ITSCHANITY']" :interval="5200" :duration="700" />
      </button>

      <ul class="hidden items-center gap-6 md:flex lg:gap-8">
        <li v-for="s in navSections" :key="s.id">
          <button
            type="button"
            class="glitch-rgb font-mono text-sm uppercase tracking-wide transition-colors"
            :class="activeId === s.id ? 'text-brand' : 'text-gray-400 hover:text-white'"
            @click="go(s.id)"
          >
            {{ s.label }}
          </button>
        </li>
      </ul>

      <div class="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
        <button
          type="button"
          class="rounded-sm p-2 text-gray-400 hover:text-brand sm:p-2.5"
          :aria-label="`open terminal`"
          title="Terminal (`)"
          @click="term.toggleTerminal()"
        >
          <TerminalIcon class="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>
        <button
          type="button"
          class="rounded-sm p-2 text-gray-400 hover:text-brand sm:p-2.5"
          :aria-label="ui.fxEnabled ? 'disable effects' : 'enable effects'"
          title="FX (scanlines/grain/particles)"
          @click="ui.toggleFx()"
        >
          <Zap v-if="ui.fxEnabled" class="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          <ZapOff v-else class="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>
        <button
          type="button"
          class="rounded-sm p-2 text-gray-400 hover:text-brand sm:p-2.5"
          aria-label="cycle theme"
          title="Cycle theme"
          @click="ui.cycleTheme()"
        >
          <Palette class="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>

        <button
          type="button"
          class="ml-1 hidden items-center gap-2 rounded-sm border border-brand/50 bg-brand/10 px-4 py-2 font-mono text-sm text-white hover:bg-brand/20 sm:inline-flex"
          aria-label="download CV"
          @click="downloadCv"
        >
          <Download :size="17" />
          CV
        </button>
        <button
          v-if="isDev"
          type="button"
          class="hidden rounded-sm p-2.5 sm:block"
          :class="ui.editMode ? 'text-accent' : 'text-gray-400 hover:text-accent'"
          aria-label="toggle edit mode"
          title="Edit Mode (dev only)"
          @click="ui.toggleEditMode()"
        >
          <Pencil :size="22" />
        </button>

        <button
          type="button"
          class="rounded-sm p-2 text-gray-300 hover:text-brand md:hidden"
          :aria-label="menuOpen ? 'close menu' : 'open menu'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <Transition name="slide">
      <ul v-if="menuOpen" class="border-t border-white/10 bg-ink-900/95 px-4 py-3 md:hidden">
        <li v-for="s in navSections" :key="s.id">
          <button
            type="button"
            class="block w-full py-3 text-left font-mono text-base"
            :class="activeId === s.id ? 'text-brand' : 'text-gray-300'"
            @click="go(s.id)"
          >
            {{ s.prompt }}
          </button>
        </li>

        <li class="mt-2 border-t border-white/10 pt-3">
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-sm border border-brand/50 bg-brand/10 px-3 py-3 font-mono text-sm text-white"
            @click="downloadCv"
          >
            <Download :size="16" />
            Download CV
          </button>
        </li>
      </ul>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
