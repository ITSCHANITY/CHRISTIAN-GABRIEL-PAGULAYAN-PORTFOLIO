import type { Directive, DirectiveBinding } from 'vue'

export const vEditable: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    if (!import.meta.env.DEV) return
    el.setAttribute('data-edit', binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    if (!import.meta.env.DEV) return
    el.setAttribute('data-edit', binding.value)
  },
}
