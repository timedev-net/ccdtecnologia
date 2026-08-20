import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="site-footer">
      <div className="ccd-container site-footer-inner">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
        <p>© {new Date().getFullYear()} CCD Tecnologia. Tecnologia que move negócios.</p>
        <Link href="/portal">Área do Cliente</Link>
      </div>
    </footer>
  )
}
