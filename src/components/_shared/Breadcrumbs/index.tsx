import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import type { Props } from './types'
import styles from './styles.module.css'

export const Breadcrumbs: Props = ({ items }) => {
  return (
    <Breadcrumb
      className={styles.root}
      items={items.map((item) => ({
        key: item.key,
        title: item.href ? (
          <Link to={item.href}>{item.label}</Link>
        ) : (
          item.label
        ),
      }))}
    />
  )
}
