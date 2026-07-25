import { useTranslation } from 'react-i18next'
import { AppLayout } from './components/Layout/AppLayout'

function App() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <h1>{t('app.setupTitle')}</h1>
    </AppLayout>
  )
}

export default App
