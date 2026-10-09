<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Copy, Check, Github, Linkedin, Mail, type LucideIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { vEditable } from '@/directives/vEditable'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const FORMSPREE_ID = ''

const name = ref('')
const email = ref('')
const message = ref('')
const touched = ref(false)
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const errors = computed(() => ({
  name: name.value.trim().length < 2 ? 'enter your name' : '',
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? 'enter a valid email' : '',
  message: message.value.trim().length < 10 ? 'message too short (min 10)' : '',
}))
const isValid = computed(() => !errors.value.name && !errors.value.email && !errors.value.message)

async function submit(): Promise<void> {
  touched.value = true
  if (!isValid.value) return
  state.value = 'sending'
  try {
    if (FORMSPREE_ID) {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: name.value, email: email.value, message: message.value }),
      })
      if (!res.ok) throw new Error('formspree error')
    } else {
      const subject = encodeURIComponent(`Portfolio contact from ${name.value}`)
      const body = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    }
    state.value = 'sent'
    ui.toast('message sent — thanks!', 'success')
    name.value = ''
    email.value = ''
    message.value = ''
    touched.value = false
    window.setTimeout(() => (state.value = 'idle'), 2500)
  } catch {
    state.value = 'error'
    ui.toast('send failed — try the email link', 'error')
    window.setTimeout(() => (state.value = 'idle'), 2500)
  }
}

const { copy } = useClipboard()
const copiedId = ref<string | null>(null)
function copyValue(id: string, value: string): void {
  copy(value)
  copiedId.value = id
  ui.toast('COPIED // in clipboard', 'success')
  window.setTimeout(() => (copiedId.value = null), 1500)
}

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail }
function iconFor(n: string): LucideIcon | null {
  return iconMap[n] ?? null
}

const sendLabel = computed(() => {
  if (state.value === 'sending') return 'sending...'
  if (state.value === 'sent') return 'sent ✓'
  if (state.value === 'error') return 'retry'
  return './send --message'
})
</script>

<template>
  <section
    id="contact"
    class="section-shell"
  >
    <SectionHeading
      prompt="> ./contact --send"
      title="Contact"
    />

    <div class="grid gap-10 lg:grid-cols-2">
      
      <form
        class="space-y-4"
        novalidate
        @submit.prevent="submit"
      >
        <div>
          <label
            class="mb-1 block font-mono text-xs text-muted"
            for="c-name"
          >name</label>
          <input
            id="c-name"
            v-model="name"
            type="text"
            class="w-full rounded-sm border border-white/10 bg-ink-800 px-3 py-2 font-mono text-sm text-white focus:border-brand focus:outline-none"
          >
          <p
            v-if="touched && errors.name"
            class="mt-1 font-mono text-xs text-red-400"
          >
            {{ errors.name }}
          </p>
        </div>
        <div>
          <label
            class="mb-1 block font-mono text-xs text-muted"
            for="c-email"
          >email</label>
          <input
            id="c-email"
            v-model="email"
            type="email"
            class="w-full rounded-sm border border-white/10 bg-ink-800 px-3 py-2 font-mono text-sm text-white focus:border-brand focus:outline-none"
          >
          <p
            v-if="touched && errors.email"
            class="mt-1 font-mono text-xs text-red-400"
          >
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label
            class="mb-1 block font-mono text-xs text-muted"
            for="c-msg"
          >message</label>
          <textarea
            id="c-msg"
            v-model="message"
            rows="5"
            class="w-full resize-none rounded-sm border border-white/10 bg-ink-800 px-3 py-2 font-mono text-sm text-white focus:border-brand focus:outline-none"
          />
          <p
            v-if="touched && errors.message"
            class="mt-1 font-mono text-xs text-red-400"
          >
            {{ errors.message }}
          </p>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-full"
          :class="{ 'glitch-active glitch-rgb': state === 'sending' }"
          :disabled="state === 'sending'"
        >
          {{ sendLabel }}
        </button>
      </form>

      
      <div class="space-y-6">
        
        <div class="card p-5">
          <p class="mb-3 font-mono text-xs text-muted">

          </p>
          <ul
            v-editable="'src/data/socials.ts → socials'"
            class="space-y-2"
          >
            <li
              v-for="s in socials"
              :key="s.id"
              class="flex items-center gap-2 rounded-sm border border-white/10 bg-ink-800 px-3 py-2"
            >
              <component
                :is="iconFor(s.icon)"
                v-if="iconFor(s.icon)"
                :size="16"
                class="shrink-0 text-brand"
              />
              <a
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                class="truncate font-mono text-sm text-white hover:text-brand"
              >
                {{ s.label }}
              </a>
              <button
                type="button"
                class="ml-auto shrink-0 text-muted hover:text-brand"
                :aria-label="`copy ${s.label}`"
                @click="copyValue(s.id, s.href.replace('mailto:', ''))"
              >
                <Check
                  v-if="copiedId === s.id"
                  :size="15"
                  class="text-green-400"
                />
                <Copy
                  v-else
                  :size="15"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
