import type { SubmitEventHandler } from 'react'
import { Button, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import { SocialLinks } from '../SocialLinks'
import type { Props } from './types'
import styles from './styles.module.css'

export const FooterSubscribe: Props = () => {
  const { t } = useTranslation()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>{t('footer.subscribe.title')}</h2>
      <p className={styles.description}>{t('footer.subscribe.description')}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          variant="borderless"
          type="email"
          name="email"
          placeholder={t('footer.subscribe.emailPlaceholder')}
          aria-label={t('footer.subscribe.emailAriaLabel')}
        />
        <Button className={styles.button} htmlType="submit">
          {t('footer.subscribe.submit')}
        </Button>
      </form>
      <SocialLinks />
    </section>
  )
}
