import { useTranslation } from 'react-i18next'

import { PhilosophyIcon } from '../../../../../components/_shared/PhilosophyIcon'
import { PHILOSOPHY_IMAGES } from '../../consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const PhilosophyCard: Props = ({ philosophyId }) => {
  const { t } = useTranslation()
  const title = t(`aboutPhilosophy.items.${philosophyId}.title`)

  return (
    <article className={styles.root}>
      <PhilosophyIcon src={PHILOSOPHY_IMAGES[philosophyId]} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>
        {t(`aboutPhilosophy.items.${philosophyId}.description`)}
      </p>
    </article>
  )
}
