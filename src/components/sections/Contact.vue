<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Copy, Check, Github, Linkedin, Mail, type LucideIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { vEditable } from '@/directives/vEditable'
import { socials } from '@/data/socials'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const { copy } = useClipboard()
const copiedId = ref<string | null>(null)
function copyValue(id: string, value: string): void {
  copy(value)
  copiedId.value = id
  ui.toast('COPIED to clipboard', 'success')
  window.setTimeout(() => (copiedId.value = null), 1500)
}

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail }
function iconFor(n: string): LucideIcon | null {
  return iconMap[n] ?? null
}
</script>

<template>
  <section id="contact" class="section-shell">
    <SectionHeading prompt="> ./contact --send" title="Contact" />

    <div class="mx-auto max-w-3xl">
      <div class="card p-8">
        <p class="mb-6 font-mono text-sm text-muted">direct</p>
        <ul v-editable="'src/data/socials.ts → socials'" class="space-y-4">
          <li
            v-for="s in socials"
            :key="s.id"
            class="flex items-center gap-4 rounded-sm border border-white/10 bg-ink-800 px-5 py-4"
          >
            <component
              :is="iconFor(s.icon)"
              v-if="iconFor(s.icon)"
              :size="24"
              class="shrink-0 text-brand"
            />
            <a
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="truncate font-mono text-base text-white hover:text-brand sm:text-lg"
            >
              {{ s.label }}
            </a>
            <button
              type="button"
              class="ml-auto shrink-0 text-muted hover:text-brand"
              :aria-label="`copy ${s.label}`"
              @click="copyValue(s.id, s.href.replace('mailto:', ''))"
            >
              <Check v-if="copiedId === s.id" :size="20" class="text-green-400" />
              <Copy v-else :size="20" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
