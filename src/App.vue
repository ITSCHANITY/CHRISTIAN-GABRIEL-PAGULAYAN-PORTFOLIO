<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { watch } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'
import SectionDots from '@/components/layout/SectionDots.vue'
import BreachOverlay from '@/components/layout/BreachOverlay.vue'
import ScanlineOverlay from '@/components/effects/ScanlineOverlay.vue'
import MatrixRain from '@/components/effects/MatrixRain.vue'
import AnimatedBackground from '@/components/effects/AnimatedBackground.vue'
import GameLoader from '@/components/effects/GameLoader.vue'
import Terminal from '@/components/sections/Terminal.vue'
import Toast from '@/components/ui/Toast.vue'
import CommandPalette from '@/components/ui/CommandPalette.vue'
import ShortcutsOverlay from '@/components/ui/ShortcutsOverlay.vue'
import { useUiStore } from '@/stores/ui'
import { useKonami } from '@/composables/useKonami'

const ui = useUiStore()
const booted = ref(false)

useKonami(() => ui.triggerBreach())

const editMode = computed(() => ui.editMode)
watch(editMode, (on) => {
  document.documentElement.classList.toggle('edit-mode', on)
})

onMounted(() => {
  ui.init()
})
</script>

<template>
  <AnimatedBackground />

  <MatrixRain />

  <GameLoader @done="booted = true" />

  <ScanlineOverlay />
  <ScrollProgress />
  <BreachOverlay />
  <Toast />
  <CommandPalette />
  <ShortcutsOverlay />

  <Navbar />
  <SectionDots />

  <RouterView />

  <Footer />

  <Terminal />
</template>
