import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { queryClient } from './api'
import './i18n'
import './style.css'
import './ui/theme/fonts.css'
import './ui/theme/spacing.css'
import './ui/colors/colors.css'
import { ConfigProvider } from 'antd'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

void enableMocking().then(() => {
  const rootElement = document.getElementById('app')
  if (!rootElement) {
    throw new Error('Root element #app not found')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'var(--font-family-base)',
            colorPrimary: 'var(--color-accent)',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </StrictMode>,
  )
})
