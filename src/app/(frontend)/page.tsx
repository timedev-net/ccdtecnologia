import type { Metadata } from 'next'

import { Landing } from '@/components/Landing/Component'

export default function HomePage() {
  return <Landing />
}

export const metadata: Metadata = {
  title: 'CCD Tecnologia | Soluções digitais que movem negócios',
  description: 'Software, aplicativos, automações, inteligência artificial, dados e infraestrutura para sua empresa evoluir.',
}
