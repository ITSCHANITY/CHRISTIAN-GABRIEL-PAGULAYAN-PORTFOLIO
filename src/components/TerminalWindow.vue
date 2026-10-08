<script setup lang="ts">
// Terminal-style window chrome with title bar + traffic-light dots.
// Slot content is the "terminal body".
withDefaults(
  defineProps<{
    title?: string
    /** Show the subtle scanline overlay. */
    scanlines?: boolean
    /** Adds accent glow to the border. */
    glow?: boolean
  }>(),
  { title: 'shell', scanlines: false, glow: false },
)
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg border border-line bg-panel/80 backdrop-blur-sm"
    :class="glow ? 'box-glow' : ''"
  >
    <!-- Title bar -->
    <div
      class="flex items-center gap-2 border-b border-line bg-panel-2/80 px-4 py-2.5"
    >
      <span class="flex gap-1.5" aria-hidden="true">
        <span class="h-3 w-3 rounded-full bg-danger/80"></span>
        <span class="h-3 w-3 rounded-full bg-amber/80"></span>
        <span class="h-3 w-3 rounded-full bg-accent/80"></span>
      </span>
      <span class="ml-2 truncate text-xs text-fg-dim">
        {{ title }}
      </span>
    </div>

    <!-- Body -->
    <div class="relative" :class="scanlines ? 'scanlines' : ''">
      <div class="relative z-[2]">
        <slot />
      </div>
    </div>
  </div>
</template>
