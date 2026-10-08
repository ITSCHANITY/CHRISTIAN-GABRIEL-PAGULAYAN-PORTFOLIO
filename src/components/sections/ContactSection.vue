<script setup lang="ts">
import { profile, socials } from '@/data/profile'
import SectionHeader from '../SectionHeader.vue'
import TerminalWindow from '../TerminalWindow.vue'
import AppIcon from '../AppIcon.vue'
import { vReveal } from '@/directives/reveal'
</script>

<template>
  <section id="contact" class="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
    <div v-reveal>
      <SectionHeader
        index="04 — contact"
        command="./connect.sh"
        title="Get in touch"
        subtitle="Open to internships, security roles, and collaboration. Reach out through any channel below."
      />
    </div>

    <div v-reveal="80">
      <TerminalWindow title="visitor@csu-sec: ~/contact" glow scanlines>
        <div class="p-5 md:p-6">
          <p class="mb-5 font-mono text-sm text-fg-dim">
            <span class="text-accent">$</span> echo "let's talk"
            <span class="ml-1 animate-blink text-accent">_</span>
          </p>

          <ul class="grid gap-3 sm:grid-cols-2">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-3 rounded border border-line bg-panel-2/50 px-4 py-3 transition-colors hover:border-accent/40"
              >
                <span
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line text-fg-dim transition-colors group-hover:border-accent/40 group-hover:text-accent"
                >
                  <AppIcon :name="social.icon" :size="18" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm text-fg">{{ social.label }}</span>
                  <span class="block truncate font-mono text-xs text-fg-dim">
                    {{ social.handle }}
                  </span>
                </span>
              </a>
            </li>
          </ul>

          <p class="mt-6 font-mono text-xs text-fg-faint">
            # {{ profile.location }} · {{ profile.status }}
          </p>
        </div>
      </TerminalWindow>
    </div>
  </section>
</template>
