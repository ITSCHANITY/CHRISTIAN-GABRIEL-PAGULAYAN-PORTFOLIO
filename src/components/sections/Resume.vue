<script setup lang="ts">
import { ref } from 'vue'
import { Download, FileText, Eye, EyeOff, ExternalLink } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { vEditable } from '@/directives/vEditable'
import { profile } from '@/data/profile'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const showPreview = ref(false)

function download(): void {
  void ui.downloadCv(profile.cvUrl)
}
function togglePreview(): void {
  showPreview.value = !showPreview.value
}
</script>

<template>
  <section id="resume" class="section-shell">
    <SectionHeading prompt="> ./cv --open" title="Resume / CV" />

    <div
      class="card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-start gap-4">
        <div class="rounded-md border border-brand/40 bg-brand/10 p-3 text-brand">
          <FileText :size="26" />
        </div>
        <div v-editable="'src/data/profile.ts → cvUrl'">
          <p class="font-semibold text-white">{{ profile.fullName }} — CV</p>
          <p class="mt-1 text-sm text-muted">
            {{ profile.tagline }}
          </p>
          <p class="mt-1 font-mono text-[11px] text-muted">file: {{ profile.cvUrl }}</p>
        </div>
      </div>

      <div class="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          class="btn glitch-rgb border border-brand/50 bg-brand/10 text-white hover:bg-brand/20"
          :aria-expanded="showPreview"
          @click="togglePreview"
        >
          <component :is="showPreview ? EyeOff : Eye" :size="16" />
          {{ showPreview ? 'Hide Preview' : 'View CV' }}
        </button>
        <button type="button" class="btn btn-primary glitch-rgb" @click="download">
          <Download :size="16" />
          Download CV
        </button>
      </div>
    </div>

    <Transition name="preview">
      <div v-if="showPreview" class="mt-4">
        <div class="card overflow-hidden p-0">
          <div class="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span class="flex items-center gap-2 font-mono text-xs text-muted">
              <FileText :size="14" class="text-brand" />
              {{ profile.cvUrl.split('/').pop() }}
            </span>
            <a
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 font-mono text-xs text-muted hover:text-brand"
            >
              open in new tab <ExternalLink :size="13" />
            </a>
          </div>
          <iframe
            :src="`${profile.cvUrl}#view=FitH`"
            title="Resume preview"
            class="h-[80vh] w-full bg-white"
            loading="lazy"
          />
        </div>
      </div>
    </Transition>

    <p class="mt-3 font-mono text-xs text-muted">
      tip: you can also type <span class="text-brand">cv</span> in the terminal (press `)
    </p>
  </section>
</template>

<style scoped>
.preview-enter-active,
.preview-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.preview-enter-from,
.preview-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
