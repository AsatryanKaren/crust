import { Pagination as AntPagination } from 'antd'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const Pagination: Props = ({
  current,
  totalItems,
  pageSize,
  onChange,
}) => {
  const { t } = useTranslation()

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
        locale={{
          prev_page: t('pages.catalog.pagination.prev'),
          next_page: t('pages.catalog.pagination.next'),
        }}
        onChange={onChange}
      />
    </div>
  )
}
