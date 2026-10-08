<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
</script>

<template>
  <AppNav />
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
