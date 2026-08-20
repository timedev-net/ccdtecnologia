'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/users/login', {
      body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    setLoading(false)
    if (response.ok) {
      window.location.assign('/portal')
      return
    }

    setError('Não foi possível entrar. Confira suas credenciais.')
  }

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={submit}>
        <Link href="/" className="login-logo">
          <img alt="CCD Tecnologia" height="80" src="/logos/logo-ccdtecnologia-branca.png" width="120" />
        </Link>
        <p>Área do Cliente</p>
        <h1>Acesse seus aplicativos</h1>
        <label htmlFor="email">E-mail</label>
        <input autoComplete="email" id="email" name="email" required type="email" />
        <label htmlFor="password">Senha</label>
        <input autoComplete="current-password" id="password" name="password" required type="password" />
        {error && <p className="login-error" role="alert">{error}</p>}
        <button disabled={loading} type="submit">{loading ? 'Entrando...' : 'Entrar'}</button>
        <Link href="/">Voltar para o site</Link>
      </form>
    </main>
  )
}
