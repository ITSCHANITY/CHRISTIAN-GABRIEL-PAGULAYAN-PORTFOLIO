<script setup lang="ts">
import { skillGroups } from '@/data/profile'
import SectionHeader from '../SectionHeader.vue'
import TerminalWindow from '../TerminalWindow.vue'
import { vReveal } from '@/directives/reveal'
</script>

<template>
  <section id="skills" class="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
    <div v-reveal>
      <SectionHeader
        index="03 — skills"
        command="cat skills.txt"
        title="Skills & Tooling"
        subtitle="The stack I build, break, and defend with."
      />
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="(group, i) in skillGroups"
        :key="group.label"
        v-reveal="i * 70"
      >
        <TerminalWindow :title="group.label">
          <div class="p-4">
            <p class="mb-3 font-mono text-xs text-fg-faint">
              <span class="text-accent">$</span> {{ group.command }}
            </p>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded border border-line bg-panel-2/60 px-2.5 py-1 text-xs text-fg-dim transition-colors hover:border-accent/40 hover:text-fg"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>
