import { ArrowRightOutlined  } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CATALOG_ROUTE, CATEGORY_IMAGES } from '../../consts'
import type { Props } from './types'
import styles from './styles.module.css'

const CategoryCard: Props = ({ categoryId }) => {
  const { t } = useTranslation()
  const title = t(`whatWeOffer.categories.${categoryId}.title`)

  return (
    <Link
      className={styles.card}
      to={CATALOG_ROUTE}
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

export default CategoryCard
