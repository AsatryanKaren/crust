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
import { App as AntdApp, ConfigProvider } from 'antd'

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
            colorLink: 'var(--color-accent)',
            colorLinkHover: 'var(--color-accent)',
            colorLinkActive: 'var(--color-primary-pressed)',
          },
        }}
      >
        <AntdApp>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </StrictMode>,
  )
})
