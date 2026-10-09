<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { profile } from '@/data/profile'
import { useUiStore } from '@/stores/ui'

const emit = defineEmits<{ done: [] }>()
const ui = useUiStore()

const SESSION_KEY = 'itschanity:loaded'
const visible = ref(false)
const progress = ref(0)
const assetIndex = ref(0)
const ready = ref(false)
let raf = 0
let assetTimer = 0

const loader = profile.loader
const currentAsset = computed(() => loader.assets[assetIndex.value] ?? '')
const barBlocks = 24
const filledBlocks = computed(() => Math.round((progress.value / 100) * barBlocks))

function finish(): void {
  if (!visible.value) return
  visible.value = false
  sessionStorage.setItem(SESSION_KEY, '1')
  cleanup()
  emit('done')
}

function onInput(): void {
  if (ready.value) finish()
}

function cleanup(): void {
  cancelAnimationFrame(raf)
  window.clearInterval(assetTimer)
  window.removeEventListener('keydown', onInput)
}

function run(): void {
  const start = performance.now()
  const duration = 2600

  assetTimer = window.setInterval(() => {
    assetIndex.value = (assetIndex.value + 1) % loader.assets.length
  }, 300)

  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / duration)

    const eased = 1 - Math.pow(1 - t, 2.2)
    progress.value = Math.round(eased * 100)
    if (t < 1) {
      raf = requestAnimationFrame(step)
    } else {
      progress.value = 100
      window.clearInterval(assetTimer)
      assetIndex.value = loader.assets.length - 1
      ready.value = true
    }
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const already = sessionStorage.getItem(SESSION_KEY)
  if (already) {
    emit('done')
    return
  }
  visible.value = true

  if (ui.reducedMotion) {

    progress.value = 100
    assetIndex.value = loader.assets.length - 1
    ready.value = true
  } else {
    run()
  }
  window.addEventListener('keydown', onInput)
})

onBeforeUnmount(cleanup)
</script>

<template>
  <Transition name="loader">
    <div
      v-if="visible"
      class="fixed inset-0 z-[210] flex items-center justify-center overflow-hidden bg-ink-900 px-6"
      role="dialog"
      aria-label="loading screen"
      :aria-busy="!ready"
      @click="onInput"
    >
      
      <div
        class="loader-scan pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      <div class="relative w-full max-w-md text-center">
        
        
        <h1 class="glitch-rgb glitch-active font-mono text-4xl font-extrabold tracking-widest text-brand sm:text-5xl">
          {{ loader.title }}
        </h1>
        <p class="mt-2 font-mono text-xs uppercase tracking-[0.4em] text-muted">
          {{ loader.subtitle }}
        </p>

        
        <div class="mt-10">
          <div
            class="flex items-center justify-center gap-[3px] font-mono text-brand"
            aria-hidden="true"
          >
            <span
              v-for="n in barBlocks"
              :key="n"
              class="h-4 w-2.5 rounded-[1px] transition-colors duration-150"
              :class="n <= filledBlocks ? 'bg-brand' : 'bg-white/10'"
            />
          </div>
          <div class="mt-3 flex items-center justify-between font-mono text-xs text-muted">
            <span class="truncate text-left text-accent">
              <span v-if="!ready">&gt; {{ currentAsset }}<span class="animate-pulse">_</span></span>
              <span
                v-else
                class="text-brand"
              >&gt; ready.</span>
            </span>
            <span class="shrink-0 tabular-nums text-white">{{ progress }}%</span>
          </div>
        </div>

        
        <div class="mt-10 h-6">
          <p
            v-if="ready"
            class="animate-pulse font-mono text-sm font-bold tracking-widest text-white"
          >
            ▶ {{ loader.startPrompt }}
          </p>
          <p
            v-else
            class="font-mono text-[10px] text-muted/60"
          >
            initializing...
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-scan {
  background: repeating-linear-gradient(
    to bottom,
    rgb(var(--c-brand) / 0.08) 0px,
    rgb(var(--c-brand) / 0.08) 1px,
    transparent 1px,
    transparent 4px
  );
}
.loader-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.loader-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
