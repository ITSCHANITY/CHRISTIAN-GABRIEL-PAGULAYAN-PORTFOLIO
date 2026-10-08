import type { Directive, DirectiveBinding } from 'vue'

// -------------------------------------------------------------------------
//  v-reveal — scroll-triggered reveal animation
//
//  Adds the `.reveal` class immediately, then `.is-visible` when the element
//  scrolls into view (see CSS in style.css). Respects prefers-reduced-motion
//  via the CSS media query. Optional value = stagger delay in ms.
//
//  Usage:  <div v-reveal>...</div>   |   <div v-reveal="120">...</div>
// -------------------------------------------------------------------------

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer!.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
    : null

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    if (prefersReducedMotion() || !observer) return

    el.classList.add('reveal')
    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}ms`
    }
    observer.observe(el)
  },
  unmounted(el: HTMLElement) {
    observer?.unobserve(el)
  },
}
