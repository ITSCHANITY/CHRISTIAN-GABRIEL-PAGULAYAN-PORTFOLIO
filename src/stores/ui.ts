import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { usePreferredReducedMotion, useStorage } from '@vueuse/core'
import type { ThemeId, Toast, ToastKind } from '@/types'
import { getTheme, defaultThemeId, themes } from '@/data/theme'

export const useUiStore = defineStore('ui', () => {
  const themeId = useStorage<ThemeId>('itschanity:theme', defaultThemeId)
  const breachUnlocked = useStorage<boolean>('itschanity:breach', false)

  const availableThemes = computed(() => themes.filter((t) => !t.hidden || breachUnlocked.value))

  function applyTheme(id: ThemeId): void {
    const theme = getTheme(id)
    const root = document.documentElement
    root.style.setProperty('--c-brand', theme.brand)
    root.style.setProperty('--c-accent', theme.accent)
    root.style.setProperty('--c-brand-2', theme.brand2)
    root.dataset.theme = theme.id
    applyThemedCursor(theme.brand)
  }

  function applyThemedCursor(brandRgb: string): void {
    const [r, g, b] = brandRgb.split(/\s+/).map(Number)
    if ([r, g, b].some((n) => Number.isNaN(n))) return
    const fill = `rgb(${r},${g},${b})`

    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
      <path d='M4 2 L4 20 L9 15 L12.5 22 L15.5 20.5 L12 14 L19 14 Z'
        fill='${fill}' stroke='white' stroke-width='1.2' stroke-linejoin='round'/>
    </svg>`
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 3 2, auto`
    document.body.style.cursor = url
  }

  function setTheme(id: ThemeId): void {
    themeId.value = id
    applyTheme(id)
  }

  function cycleTheme(): void {
    const list = availableThemes.value
    const idx = list.findIndex((t) => t.id === themeId.value)
    const next = list[(idx + 1) % list.length]
    setTheme(next.id)
  }

  const prefersReducedMotion = usePreferredReducedMotion()
  const reducedMotion = computed(() => prefersReducedMotion.value === 'reduce')

  const fxEnabled = useStorage<boolean>('itschanity:fx', !reducedMotion.value)
  function toggleFx(): void {
    fxEnabled.value = !fxEnabled.value
  }

  const effectsActive = computed(() => fxEnabled.value && !reducedMotion.value)

  const breachActive = ref(false)
  function triggerBreach(): void {
    breachUnlocked.value = true
    breachActive.value = true
    setTheme('breach')
    window.setTimeout(() => {
      breachActive.value = false
    }, 2600)
  }

  const glitchPulse = ref(0)
  function pulseGlitch(): void {
    glitchPulse.value += 1
  }

  const activeSkillId = ref<string | null>(null)
  const activeProjectId = ref<string | null>(null)
  function setActiveSkill(id: string | null): void {
    activeSkillId.value = activeSkillId.value === id ? null : id
  }
  function setActiveProject(id: string | null): void {
    activeProjectId.value = id
  }

  async function downloadCv(url: string): Promise<void> {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (!res.ok) throw new Error('missing')

      const a = document.createElement('a')
      a.href = url
      a.download = url.split('/').pop() ?? 'cv.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      toast('downloading CV...', 'success')
    } catch {
      toast('CV not uploaded yet — check back soon!', 'error')
    }
  }

  const editMode = ref(false)
  function toggleEditMode(): void {
    if (import.meta.env.DEV) editMode.value = !editMode.value
  }

  const toasts = ref<Toast[]>([])
  let toastId = 0
  function toast(message: string, kind: ToastKind = 'info'): void {
    const id = ++toastId
    toasts.value.push({ id, message, kind })
    window.setTimeout(() => dismissToast(id), 3200)
  }
  function dismissToast(id: number): void {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  watch(themeId, (id) => applyTheme(id))

  function init(): void {
    applyTheme(themeId.value)
  }

  return {
    themeId,
    availableThemes,
    breachUnlocked,
    breachActive,
    setTheme,
    cycleTheme,
    fxEnabled,
    toggleFx,
    reducedMotion,
    effectsActive,
    glitchPulse,
    pulseGlitch,
    activeSkillId,
    activeProjectId,
    setActiveSkill,
    setActiveProject,
    downloadCv,
    triggerBreach,
    editMode,
    toggleEditMode,
    toasts,
    toast,
    dismissToast,
    init,
  }
})
