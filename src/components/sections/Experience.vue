<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Timeline from '@/components/sections/Timeline.vue'
import { vEditable } from '@/directives/vEditable'
import { experience } from '@/data/experience'

</script>

<template>
  <section
    id="experience"
    class="section-shell"
  >
    <SectionHeading
      prompt="> ./timeline --draw"
      title="Involvement & Organization"
    />
    <div
      v-editable="'src/data/experience.ts → experience'"
      class="max-w-2xl"
    >
      <Timeline :entries="experience" />
    </div>
  </section>
</template>
