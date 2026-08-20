'use client'

import { useEffect, useRef } from 'react'

type Particle = { size: number; x: number; y: number; vx: number; vy: number }
type Trail = { life: number; x: number; y: number }

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = canvas.getContext('2d')
    if (!context) return

    const mouse = { x: -1000, y: -1000 }
    let animationFrame = 0
    let visible = true
    let particles: Particle[] = []
    let trail: Trail[] = []

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = bounds.width * ratio
      canvas.height = bounds.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const isCompact = bounds.width < 768
      const count = isCompact
        ? Math.min(80, Math.max(55, Math.round(bounds.width / 8)))
        : Math.min(160, Math.max(110, Math.round(bounds.width / 9)))
      particles = Array.from({ length: count }, () => ({
        size: 0.9 + Math.random() * 1.6,
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
      }))
    }

    const draw = () => {
      const bounds = canvas.getBoundingClientRect()
      context.clearRect(0, 0, bounds.width, bounds.height)
      trail = trail.filter((point) => point.life > 0.02)
      trail.forEach((point) => {
        point.life *= 0.91
        context.beginPath()
        context.fillStyle = `rgba(198, 255, 59, ${point.life * 0.72})`
        context.shadowBlur = 16
        context.shadowColor = 'rgba(198, 255, 59, 0.7)'
        context.arc(point.x, point.y, 1.5 + point.life * 4, 0, Math.PI * 2)
        context.fill()
      })
      context.shadowBlur = 0
      particles.forEach((particle, index) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.hypot(dx, dy)
        if (distance < 185) {
          particle.vx += (dx / Math.max(distance, 1)) * 0.018
          particle.vy += (dy / Math.max(distance, 1)) * 0.018
        }
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.992
        particle.vy *= 0.992
        if (particle.x < -10 || particle.x > bounds.width + 10) particle.vx *= -1
        if (particle.y < -10 || particle.y > bounds.height + 10) particle.vy *= -1

        context.beginPath()
        context.fillStyle = 'rgba(198, 255, 59, 0.82)'
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const connection = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (connection < 142) {
            context.beginPath()
            context.strokeStyle = `rgba(155, 244, 92, ${0.25 * (1 - connection / 142)})`
            context.lineWidth = 0.85
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      })
      if (visible) animationFrame = window.requestAnimationFrame(draw)
    }

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      mouse.x = event.clientX - bounds.left
      mouse.y = event.clientY - bounds.top
      trail.push({ life: 1, x: mouse.x, y: mouse.y })
      if (trail.length > 28) trail = trail.slice(-28)
    }
    const leave = () => { mouse.x = -1000; mouse.y = -1000 }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(draw)
      }
    })

    resize()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    canvas.parentElement?.addEventListener('pointerleave', leave)
    animationFrame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      canvas.parentElement?.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas aria-hidden="true" className="particle-field" ref={canvasRef} />
}
