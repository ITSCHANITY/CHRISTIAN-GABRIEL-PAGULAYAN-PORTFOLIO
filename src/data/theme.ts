import type { Theme, ThemeId } from '@/types'

export const defaultThemeId: ThemeId = 'crimson'

export const themes: Theme[] = [
  {
    id: 'crimson',
    label: 'Crimson',
    brand: '225 29 72',
    accent: '34 211 238',
    brand2: '255 23 68',
  },
  {
    id: 'matrix',
    label: 'Matrix Green',
    brand: '0 255 65',
    accent: '34 211 238',
    brand2: '0 255 65',
  },
  {
    id: 'cyan',
    label: 'Cyber Cyan',
    brand: '0 217 255',
    accent: '125 211 252',
    brand2: '0 217 255',
  },
  {
    id: 'breach',
    label: 'SYSTEM BREACH',
    brand: '244 63 94',
    accent: '250 204 21',
    brand2: '255 255 255',
    hidden: true,
  },
]

export function getTheme(id: ThemeId): Theme {
  return themes.find((t) => t.id === id) ?? themes[0]
}
