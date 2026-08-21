import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="pt-BR" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'CCD Tecnologia | Soluções digitais',
    template: '%s | CCD Tecnologia',
  },
  description: 'Soluções digitais, dados, inteligência artificial e infraestrutura para empresas em movimento.',
  openGraph: mergeOpenGraph({
    description: 'Tecnologia sob medida para transformar e acelerar negócios.',
    title: 'CCD Tecnologia',
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@ccdtecnologia',
    title: 'CCD Tecnologia | Soluções digitais que movem negócios',
    description: 'Soluções digitais, dados, inteligência artificial e infraestrutura para empresas em movimento.',
    images: [
      {
        url: '/og/ccd-tecnologia-social.png',
        alt: 'CCD Tecnologia — Soluções digitais que transformam negócios.',
      },
    ],
  },
}
