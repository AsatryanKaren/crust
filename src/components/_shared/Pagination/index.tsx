import { Pagination as AntPagination } from 'antd'

import type { Props } from './types'
import styles from './styles.module.css'

export const Pagination: Props = ({
  current,
  totalItems,
  pageSize,
  onChange,
}) => {
  if (totalItems <= pageSize) {
    return null
  }

  return (
    <div className={styles.root}>
      <AntPagination
        current={current}
        total={totalItems}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={onChange}
      />
    </div>
  )
}
