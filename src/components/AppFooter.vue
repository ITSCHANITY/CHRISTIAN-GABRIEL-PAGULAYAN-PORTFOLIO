<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line px-5 py-8 md:px-8">
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-fg-faint sm:flex-row"
    >
      <p>
        <span class="text-accent">$</span> built with Vue 3 · TypeScript ·
        Tailwind CSS
      </p>
      <p>© {{ year }} Ian — all systems nominal</p>
    </div>
  </footer>
</template>
