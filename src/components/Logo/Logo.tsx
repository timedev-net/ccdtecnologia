import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'dark' | 'light'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, variant } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  if (variant) {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img
        alt="CCD Tecnologia"
        width={144}
        height={48}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[9rem] w-full h-auto object-contain', className)}
        src={variant === 'light' ? '/logos/logo-ccdtecnologia.png' : '/logos/logo-ccdtecnologia-branca.png'}
      />
    )
  }

  return (
    <span className="ccd-logo">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="CCD Tecnologia"
        width={144}
        height={48}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('ccd-logo-dark max-w-[9rem] w-full h-auto object-contain', className)}
        src="/logos/logo-ccdtecnologia-branca.png"
      />
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        width={144}
        height={48}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('ccd-logo-light max-w-[9rem] w-full h-auto object-contain', className)}
        src="/logos/logo-ccdtecnologia.png"
      />
    </span>
  )
}
