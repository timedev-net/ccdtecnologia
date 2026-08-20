'use client'

import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CloudCog,
  Code2,
  Database,
  Globe2,
  Layers3,
  LineChart,
  Mail,
  MessageSquareMore,
  MousePointer2,
  Network,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { CSSProperties, MouseEvent, useEffect, useRef } from 'react'

type Service = { icon: LucideIcon; title: string; text: string }

const services: Service[] = [
  { icon: Code2, title: 'Software sob medida', text: 'Sistemas que traduzem processos complexos em experiências simples.' },
  { icon: Smartphone, title: 'Aplicativos mobile', text: 'Produtos nativos e multiplataforma sempre perto do seu cliente.' },
  { icon: Workflow, title: 'Automações', text: 'Fluxos inteligentes que eliminam trabalho manual e aceleram decisões.' },
  { icon: Bot, title: 'IA e chatbots', text: 'Atendimento e operação ampliados por inteligência artificial.' },
  { icon: Network, title: 'Integrações', text: 'Todos os seus sistemas conversando sem atrito.' },
  { icon: LineChart, title: 'Dados e BI', text: 'Indicadores claros para decisões que movem o negócio.' },
  { icon: CloudCog, title: 'Cloud e on-premise', text: 'Infraestrutura segura, escalável e feita para a sua realidade.' },
  { icon: Globe2, title: 'Presença digital', text: 'Site, e-mail profissional, social media e estratégia conectados.' },
]

const capabilities = ['Diagnóstico estratégico', 'Produto digital', 'Integração e automação', 'Evolução contínua']

const parallaxPhotos = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
]

export const Landing = () => {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.15 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const tilt = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -8}deg`)
    target.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 8}deg`)
  }

  return (
    <main className="ccd-site" ref={root}>
      <section className="ccd-hero" id="inicio">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
        <div className="hero-photo hero-photo-back" style={{ backgroundImage: `url(${parallaxPhotos[1]})` }} />
        <div className="hero-photo hero-photo-front" style={{ backgroundImage: `url(${parallaxPhotos[0]})` }} />
        <div className="ccd-container hero-content">
          <span className="eyebrow"><Sparkles aria-hidden="true" /> Tecnologia que acompanha sua ambição</span>
          <h1>O próximo salto do seu negócio <em>começa agora.</em></h1>
          <p>Desenvolvemos produtos digitais, automações e estratégias de tecnologia para empresas que querem transformar intenção em impacto.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#contato">Vamos conversar <ArrowDownRight aria-hidden="true" /></a>
            <a className="button-ghost" href="#solucoes">Conheça as soluções</a>
          </div>
          <div className="hero-proof"><span /> Pessoas, dados e tecnologia trabalhando na mesma direção.</div>
        </div>
      </section>

      <section className="ccd-section intro-section" id="sobre">
        <div className="ccd-container intro-layout" data-reveal>
          <p className="section-kicker">CCD TECNOLOGIA</p>
          <h2>Transformamos desafios de hoje em estruturas prontas para o amanhã.</h2>
          <div><p>Não entregamos apenas código. Combinamos visão de negócio, design e engenharia para criar uma operação mais ágil, inteligente e conectada.</p><a href="#processo">Como construímos <ArrowDownRight aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="ccd-section services-section" id="solucoes">
        <div className="ccd-container">
          <div className="section-heading" data-reveal><div><p className="section-kicker">ECOSSISTEMA DIGITAL</p><h2>Uma parceira para toda a sua evolução.</h2></div><p>Da primeira ideia à infraestrutura que mantém sua operação em movimento.</p></div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }, index) => <article className="service-card" data-reveal key={title} onMouseMove={tilt} onMouseLeave={(event) => { event.currentTarget.style.removeProperty('--tilt-x'); event.currentTarget.style.removeProperty('--tilt-y') }} style={{ '--delay': `${index * 55}ms` } as CSSProperties}><div className="service-icon"><Icon aria-hidden="true" /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight aria-hidden="true" className="service-arrow" /></article>)}
          </div>
        </div>
      </section>

      <section className="ccd-section signal-section">
        <div className="signal-photo" style={{ backgroundImage: `url(${parallaxPhotos[1]})` }} />
        <div className="ccd-container signal-content" data-reveal><MousePointer2 aria-hidden="true" /><p className="section-kicker">TECNOLOGIA COM PROPÓSITO</p><h2>Menos ruído. Mais movimento.</h2><p>Construímos uma base digital em que cada ferramenta resolve um problema real e cria espaço para o seu time ir além.</p></div>
      </section>

      <section className="ccd-section process-section" id="processo">
        <div className="ccd-container"><div className="process-copy" data-reveal><p className="section-kicker">NOSSO JEITO DE FAZER</p><h2>Clareza no caminho. Evolução em cada entrega.</h2></div><ol className="process-list">{capabilities.map((capability, index) => <li data-reveal key={capability}><span>0{index + 1}</span><h3>{capability}</h3><p>{['Entendemos o contexto, as pessoas e a oportunidade antes de propor qualquer solução.', 'Projetamos experiências e tecnologias que fazem sentido para o seu negócio.', 'Conectamos ferramentas, dados e times em fluxos de alto desempenho.', 'Acompanhamos resultados e evoluímos o que importa com você.'][index]}</p></li>)}</ol></div>
      </section>

      <section className="ccd-section contact-section" id="contato">
        <div className="contact-glow" />
        <div className="ccd-container contact-layout" data-reveal>
          <div><p className="section-kicker">VAMOS COMEÇAR?</p><h2>Sua ideia merece ganhar escala.</h2><p>Conte um pouco sobre o desafio da sua empresa. Nossa equipe entra em contato para desenhar o próximo passo.</p></div>
          <form className="contact-form" action="mailto:contato@ccdtecnologia.com.br" method="post" encType="text/plain"><label>Seu nome<input name="nome" required placeholder="Como podemos te chamar?" /></label><label>E-mail corporativo<input name="email" required type="email" placeholder="voce@empresa.com" /></label><label>O que você quer transformar?<textarea name="mensagem" required placeholder="Conte brevemente sobre seu projeto" rows={4} /></label><button className="button-primary" type="submit">Enviar mensagem <Mail aria-hidden="true" /></button></form>
        </div>
      </section>
    </main>
  )
}
