'use client'

import Script from 'next/script'

declare global {
  interface Window {
    chatwootSDK?: {
      run: (configuration: { baseUrl: string; websiteToken: string }) => void
    }
  }
}

const baseUrl = 'https://chatwoot.ccdtecnologia.com'

export const ChatwootWidget = () => (
  <Script
    id="chatwoot-sdk"
    src={`${baseUrl}/packs/js/sdk.js`}
    strategy="afterInteractive"
    onLoad={() => window.chatwootSDK?.run({ baseUrl, websiteToken: 'ccYeepfWReMPhLTzV5V6738Y' })}
  />
)
