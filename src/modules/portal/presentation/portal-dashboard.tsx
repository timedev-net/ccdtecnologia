import Link from 'next/link'
import { ArrowUpRight, LogOut } from 'lucide-react'

import type { ClientApplication } from '../domain/application'
import { ApplicationIcon } from './application-icon'

type Props = {
  applications: ClientApplication[]
  name: string
}

const statusLabels = {
  maintenance: 'Em manutenção',
  online: 'Online',
  unavailable: 'Indisponível',
} as const

export const PortalDashboard = ({ applications, name }: Props) => (
  <main className="portal-shell">
    <section className="portal-container">
      <header className="portal-header">
        <Link className="portal-brand" href="/">
          <img alt="CCD Tecnologia" height="64" src="/logos/logo-ccdtecnologia-branca.png" width="96" />
        </Link>
        <a className="portal-signout" href="/api/users/logout">
          Sair <LogOut aria-hidden="true" className="size-4" />
        </a>
      </header>

      <div className="portal-intro">
        <p>Área do Cliente</p>
        <h1>Olá, {name}.</h1>
        <span>Estes são os produtos digitais disponíveis para sua empresa.</span>
      </div>

      {applications.length ? (
        <div className="portal-grid">
          {applications.map((application) => (
            <a
              className="portal-app-card"
              href={application.url}
              key={application.id}
              rel="noreferrer"
              target="_blank"
            >
              <div className="portal-app-icon">
                <ApplicationIcon name={application.icon} />
              </div>
              <span className={`portal-status portal-status-${application.status}`}>
                {statusLabels[application.status]}
              </span>
              <h2>{application.name}</h2>
              <p>{application.description}</p>
              <span className="portal-open">Acessar aplicativo <ArrowUpRight aria-hidden="true" className="size-4" /></span>
            </a>
          ))}
        </div>
      ) : (
        <div className="portal-empty">
          <h2>Nenhum aplicativo disponível ainda.</h2>
          <p>Quando um produto for liberado para sua empresa, ele aparecerá aqui.</p>
        </div>
      )}
    </section>
  </main>
)
