<script setup lang="ts">
import { about } from '@/data/profile'
import SectionHeader from '../SectionHeader.vue'
import TerminalWindow from '../TerminalWindow.vue'
import { vReveal } from '@/directives/reveal'
</script>

<template>
  <section id="about" class="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
    <div v-reveal>
      <SectionHeader
        index="01 — about"
        command="cat about.md"
        title="About"
      />
    </div>

    <div class="grid gap-8 md:grid-cols-5">
      <!-- Prose -->
      <div v-reveal="80" class="space-y-4 md:col-span-3">
        <p
          v-for="(para, i) in about.intro"
          :key="i"
          class="text-sm leading-relaxed text-fg-dim md:text-base"
        >
          {{ para }}
        </p>
      </div>

      <!-- whoami card -->
      <div v-reveal="160" class="md:col-span-2">
        <TerminalWindow title="~/whoami.json">
          <dl class="divide-y divide-line p-1">
            <div
              v-for="fact in about.facts"
              :key="fact.label"
              class="flex flex-col gap-0.5 px-4 py-3"
            >
              <dt class="font-mono text-xs text-accent">
                {{ fact.label }}
              </dt>
              <dd class="text-sm text-fg">{{ fact.value }}</dd>
            </div>
          </dl>
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>
