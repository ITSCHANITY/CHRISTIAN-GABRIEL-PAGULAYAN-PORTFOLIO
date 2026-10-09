<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlitchText from '@/components/effects/GlitchText.vue'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <p class="glitch-rgb glitch-active font-mono text-7xl font-extrabold text-brand sm:text-9xl">
      <GlitchText :texts="['404', 'ERR', 'LOST']" :interval="900" :duration="400" />
    </p>
    <p class="mt-4 font-mono text-sm text-muted">
      segmentation fault — the page you requested is not in memory.
    </p>
    <RouterLink to="/" class="btn btn-primary mt-8"> cd ~/ (go home) </RouterLink>
  </main>
</template>
