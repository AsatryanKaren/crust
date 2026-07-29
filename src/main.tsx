import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n'
import './style.css'
import './ui/theme/fonts.css'
import './ui/theme/spacing.css'
import './ui/colors/colors.css'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'var(--font-family-base)',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
