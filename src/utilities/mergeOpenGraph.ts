import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Soluções digitais, dados, inteligência artificial e infraestrutura para empresas em movimento.',
  images: [
    {
      url: `${getServerSideURL()}/og/ccd-tecnologia-social.png`,
      width: 1200,
      height: 630,
      alt: 'CCD Tecnologia — Soluções digitais que transformam negócios.',
    },
  ],
  siteName: 'CCD Tecnologia',
  title: 'CCD Tecnologia | Soluções digitais que movem negócios',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
