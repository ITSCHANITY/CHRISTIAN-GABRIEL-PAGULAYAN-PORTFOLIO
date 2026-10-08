<script setup lang="ts">
// Section heading rendered as a terminal command:  user@host:~$ <command>
// with a section index label like "// 02".
defineProps<{
  index: string
  command: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="mb-8 md:mb-12">
    <div class="mb-3 flex items-center gap-3 text-xs text-fg-faint">
      <span class="text-accent/70">//</span>
      <span>{{ index }}</span>
      <span class="h-px flex-1 bg-line"></span>
    </div>

    <p class="mb-2 font-mono text-sm text-fg-dim">
      <span class="text-accent">visitor@csu-sec</span
      ><span class="text-fg-faint">:</span><span class="text-cyan">~</span
      ><span class="text-fg-faint">$</span>
      <span class="text-fg"> {{ command }}</span>
    </p>

    <h2 class="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-2 max-w-2xl text-sm text-fg-dim md:text-base">
      {{ subtitle }}
    </p>
  </header>
</template>
