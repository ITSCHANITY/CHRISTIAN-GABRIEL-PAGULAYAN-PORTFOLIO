<script setup lang="ts">
import { Download, FileText } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { vEditable } from '@/directives/vEditable'
import { profile } from '@/data/profile'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
function download(): void {
  void ui.downloadCv(profile.cvUrl)
}
</script>

<template>
  <section
    id="resume"
    class="section-shell"
  >
    <SectionHeading
      prompt="> ./cv --open"
      title="Resume / CV"
    />

    <div class="card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-4">
        <div class="rounded-md border border-brand/40 bg-brand/10 p-3 text-brand">
          <FileText :size="26" />
        </div>
        <div v-editable="'src/data/profile.ts → cvUrl'">
          <p class="font-semibold text-white">
            {{ profile.fullName }} — CV
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ profile.tagline }}
          </p>
          <p class="mt-1 font-mono text-[11px] text-muted">
            file: {{ profile.cvUrl }}
          </p>
        </div>
      </div>

      
      <button
        type="button"
        class="btn btn-primary glitch-rgb shrink-0"
        @click="download"
      >
        <Download :size="16" />
        Download CV
      </button>
    </div>

    <p class="mt-3 font-mono text-xs text-muted">

    </p>
  </section>
</template>
