<script setup lang="ts">
import { computed } from 'vue'
import { useTilt } from '@/composables/useTilt'
import { useUiStore } from '@/stores/ui'

const props = withDefaults(
  defineProps<{
    max?: number
    glare?: boolean
  }>(),
  { max: 8, glare: true },
)

const ui = useUiStore()
const { tiltRef, style, glarePos, onMove, onLeave } = useTilt({
  max: props.max,
  glare: props.glare,
})

const bind = computed(() =>
  ui.reducedMotion ? {} : { onPointermove: onMove, onPointerleave: onLeave },
)
</script>

<template>
  <div
    ref="tiltRef"
    class="relative transition-transform duration-150 will-change-transform"
    :style="ui.reducedMotion ? undefined : style"
    v-bind="bind"
  >
    <slot />
    <div
      v-if="glare && !ui.reducedMotion"
      class="pointer-events-none absolute inset-0 rounded-md"
      :style="{
        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 55%)`,
      }"
      aria-hidden="true"
    />
  </div>
</template>
