<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const links = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#contact', label: 'contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 24)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const close = () => (menuOpen.value = false)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'border-b border-line bg-void/85 backdrop-blur-md'
        : 'border-b border-transparent'
    "
  >
    <nav
      class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 md:px-8"
    >
      <a
        href="#top"
        class="group flex items-center gap-2 font-mono text-sm text-fg"
      >
        <span class="text-accent">$</span>
        <span class="font-semibold">ian</span
        ><span class="text-fg-faint">@csu-sec</span>
        <span
          class="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent align-middle"
          aria-hidden="true"
        ></span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="font-mono text-sm text-fg-dim transition-colors hover:text-accent"
          >
            <span class="text-accent/60">#</span>{{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded border border-line text-fg-dim md:hidden"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <template v-if="!menuOpen">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </template>
          <template v-else>
            <path d="M6 6l12 12M18 6 6 18" />
          </template>
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-if="menuOpen"
        class="border-b border-line bg-void/95 px-5 py-3 backdrop-blur-md md:hidden"
      >
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block py-2.5 font-mono text-sm text-fg-dim transition-colors hover:text-accent"
            @click="close"
          >
            <span class="text-accent/60">#</span>{{ link.label }}
          </a>
        </li>
      </ul>
    </Transition>
  </header>
</template>
