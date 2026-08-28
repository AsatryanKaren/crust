import { App } from 'antd'
import type { TFunction } from 'i18next'
import type { NavigateFunction } from 'react-router-dom'

import { paths } from '../../../routes/paths'
import type { Props } from './types'
import styles from './styles.module.css'

type MessageApi = ReturnType<typeof App.useApp>['message']

const AddedToCartToastContent: Props = ({
  label,
  viewCartLabel,
  onViewCart,
}) => {
  return (
    <span className={styles.root}>
      {label}{' '}
      <button type="button" className={styles.viewCart} onClick={onViewCart}>
        {viewCartLabel}
      </button>
    </span>
  )
}

export const showAddedToCartToast = (
  messageApi: MessageApi,
  t: TFunction,
  navigate: NavigateFunction,
) => {
  messageApi.success({
    content: (
      <AddedToCartToastContent
        label={t('cartFeedback.added')}
        viewCartLabel={t('cartFeedback.viewCart')}
        onViewCart={() => {
          messageApi.destroy()
          void navigate(paths.cart)
        }}
      />
    ),
  })
}
