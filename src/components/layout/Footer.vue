<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { ArrowUp, Download } from 'lucide-vue-next'
import GlitchText from '@/components/effects/GlitchText.vue'
import { profile } from '@/data/profile'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const start = Date.now()
const uptime = ref('00d 00h 00m 00s')
let timer = 0

const year = new Date().getFullYear()

function tick(): void {
  const diff = Date.now() - start
  const s = Math.floor(diff / 1000) % 60
  const m = Math.floor(diff / 60000) % 60
  const h = Math.floor(diff / 3600000) % 24
  const d = Math.floor(diff / 86400000)
  const pad = (n: number): string => String(n).padStart(2, '0')
  uptime.value = `${pad(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`
}

const copyrightPair = computed(() => [`© ${year} ${profile.handle}`, 'ALL YOUR BASE'])

function toTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function downloadCv(): void {
  void ui.downloadCv(profile.cvUrl)
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 1000)
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <footer class="border-t border-white/10 bg-ink-900">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 sm:flex-row sm:justify-between sm:px-8"
    >
      <p class="font-mono text-xs text-muted">
        uptime: <span class="text-brand">{{ uptime }}</span>
      </p>

      <p class="font-mono text-xs text-muted">
        <GlitchText :texts="copyrightPair" :interval="6000" :duration="800" :rgb="false" />
      </p>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-brand"
          aria-label="download CV"
          @click="downloadCv"
        >
          <Download :size="13" /> CV
        </button>

        <span class="font-mono text-[10px] text-muted/60" title="try the Konami code, or press ?">
          press ? for shortcuts
        </span>
        <button type="button" class="btn !px-3 !py-2" aria-label="back to top" @click="toTop">
          <ArrowUp :size="16" />
        </button>
      </div>
    </div>
  </footer>
</template>
