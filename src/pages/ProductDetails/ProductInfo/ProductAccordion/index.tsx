import { Collapse } from 'antd'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

const renderList = (items: string[], emptyLabel: string) => {
  if (items.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export const ProductAccordion: Props = ({ ingredients, allergens }) => {
  const { t } = useTranslation()
  const emptyLabel = t('pages.productDetails.noneListed')

  return (
    <Collapse
      ghost
      expandIconPlacement="end"
      className={styles.root}
      items={[
        {
          key: 'ingredients',
          label: t('pages.productDetails.ingredients'),
          children: renderList(ingredients, emptyLabel),
        },
        {
          key: 'allergens',
          label: t('pages.productDetails.allergens'),
          children: renderList(allergens, emptyLabel),
        },
      ]}
    />
  )
}
