<script setup lang="ts">
import { profile } from '@/data/profile'
import TerminalWindow from '../TerminalWindow.vue'
import TypedText from '../TypedText.vue'
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 pb-16 md:px-8"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto w-full max-w-5xl">
      <p class="mb-5 font-mono text-sm text-fg-dim">
        <span class="text-accent">visitor@csu-sec</span
        ><span class="text-fg-faint">:</span><span class="text-cyan">~</span
        ><span class="text-fg-faint">$</span> whoami
      </p>

      <h1
        class="text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl md:text-6xl"
      >
        {{ profile.name }}
        <span class="text-accent text-glow">// {{ profile.role }}</span>
      </h1>

      <!-- Typed tagline -->
      <div
        class="mt-6 flex items-center gap-2 font-mono text-base text-fg-dim sm:text-lg"
      >
        <span class="text-accent">&gt;</span>
        <TypedText :phrases="profile.taglines" />
      </div>

      <p class="mt-6 max-w-2xl text-sm leading-relaxed text-fg-dim md:text-base">
        {{ profile.pitch }}
      </p>

      <!-- Meta row -->
      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span class="flex items-center gap-2 text-fg-dim">
          <span
            class="h-2 w-2 animate-flicker rounded-full bg-accent"
            aria-hidden="true"
          ></span>
          {{ profile.status }}
        </span>
        <span class="text-fg-faint">·</span>
        <span class="text-fg-dim">{{ profile.location }}</span>
      </div>

      <!-- CTAs -->
      <div class="mt-9 flex flex-wrap gap-3">
        <a
          href="#projects"
          class="inline-flex items-center gap-2 rounded border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
        >
          $ view --projects
        </a>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 rounded border border-line bg-panel/60 px-5 py-2.5 font-mono text-sm text-fg-dim transition-colors hover:border-fg-faint hover:text-fg"
        >
          $ contact
        </a>
      </div>

      <!-- Boot-style terminal card -->
      <div class="mt-12 max-w-xl">
        <TerminalWindow title="~/init.sh" scanlines>
          <pre
            class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fg-dim sm:text-sm"
          ><span class="text-fg-faint">$</span> ./init.sh
<span class="text-accent">[ ok ]</span> loading identity ..... computer engineering @ CSU
<span class="text-accent">[ ok ]</span> mounting tracks ...... security · embedded/iot · web
<span class="text-cyan">[ .. ]</span> focus ............... SOC / detection engineering + pentesting
<span class="text-accent">[ ok ]</span> org ................. ICpEP.SE — CSU Chapter
<span class="text-accent">[ ok ]</span> ready. scroll to continue <span class="animate-blink">_</span></pre>
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>
