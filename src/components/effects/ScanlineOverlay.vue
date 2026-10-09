<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const classes = computed(() => ({
  'fx-scanlines': ui.effectsActive,
  'fx-grain': ui.effectsActive,
}))
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-[55]"
    :class="classes"
    aria-hidden="true"
  />
</template>
