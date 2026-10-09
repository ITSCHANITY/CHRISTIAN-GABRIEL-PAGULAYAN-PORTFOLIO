<script setup lang="ts">
import GlitchText from '@/components/effects/GlitchText.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <Transition name="breach">
    <div
      v-if="ui.breachActive"
      class="breach-overlay fixed inset-0 z-[180] flex items-center justify-center"
      role="alert"
      aria-label="system breach"
    >
      <div class="text-center">
        <p class="glitch-rgb glitch-active font-mono text-4xl font-extrabold text-red-500 sm:text-6xl">
          <GlitchText
            :texts="['SYSTEM BREACH', 'ACCESS GRANTED', 'ITSCHANITY']"
            :interval="500"
            :duration="300"
          />
        </p>
        <p class="mt-4 font-mono text-sm text-yellow-400">
          hidden theme unlocked
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.breach-enter-active,
.breach-leave-active {
  transition: opacity 0.3s ease;
}
.breach-enter-from,
.breach-leave-to {
  opacity: 0;
}
</style>
