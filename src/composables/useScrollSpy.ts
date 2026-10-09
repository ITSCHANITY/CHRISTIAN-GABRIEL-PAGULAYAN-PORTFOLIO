import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface ScrollSpyReturn {
  activeId: Ref<string>
  scrollTo: (id: string) => void
}

export function useScrollSpy(sectionIds: string[]): ScrollSpyReturn {
  const activeId = ref(sectionIds[0] ?? '')
  let observer: IntersectionObserver | null = null

  function scrollTo(id: string): void {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry
          }
        }
        if (best) activeId.value = best.target.id
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId, scrollTo }
}
