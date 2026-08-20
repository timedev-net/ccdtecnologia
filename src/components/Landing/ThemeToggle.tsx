'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/providers/Theme'

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <button aria-label={label} className="theme-toggle" onClick={() => setTheme(isDark ? 'light' : 'dark')} type="button">
      <Sun aria-hidden="true" className="theme-toggle-sun" />
      <Moon aria-hidden="true" className="theme-toggle-moon" />
      <span className="sr-only">{label}</span>
    </button>
  )
}
