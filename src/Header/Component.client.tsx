'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'

export const HeaderClient: React.FC = () => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="site-header" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="ccd-container site-header-inner">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <nav aria-label="Navegação principal" className="site-nav">
          <Link href="/#sobre">Sobre</Link>
          <Link href="/#solucoes">Soluções</Link>
          <Link href="/#processo">Como fazemos</Link>
          <Link href="/#contato">Contato</Link>
          <Link className="client-access" href="/portal">Área do Cliente</Link>
        </nav>
      </div>
    </header>
  )
}
