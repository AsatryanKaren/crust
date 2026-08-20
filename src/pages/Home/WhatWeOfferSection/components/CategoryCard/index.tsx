import { ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { paths } from '../../../../../routes/paths'
import { CATEGORY_IMAGES } from '../../consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const CategoryCard: Props = ({ categoryId }) => {
  const { t } = useTranslation()
  const title = t(`whatWeOffer.categories.${categoryId}.title`)

  return (
    <Link
      className={styles.card}
      to={paths.catalog}
      aria-label={t('whatWeOffer.categoryLinkAriaLabel', { category: title })}
    >
      <img
        className={styles.image}
        src={CATEGORY_IMAGES[categoryId]}
        alt={title}
      />
      <div className={styles.label}>
        <span>{title}</span>
        <ArrowRightOutlined className={styles.icon} aria-hidden />
      </div>
    </Link>
  )
}
