import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const ProductGallery: Props = ({ images, productName }) => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const safeIndex = activeIndex < images.length ? activeIndex : 0
  const mainImage = images[safeIndex]
  const showThumbs = images.length > 1

  if (!mainImage) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <img
          className={styles.mainImage}
          src={mainImage}
          alt={t('pages.productDetails.gallery.mainAlt', { name: productName })}
        />
      </div>
      {showThumbs ? (
        <div className={styles.thumbs} role="list">
          {images.map((image, index) => {
            const isActive = index === safeIndex

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`${styles.thumb}${isActive ? ` ${styles.thumbActive}` : ''}`}
                aria-pressed={isActive}
                aria-current={isActive ? 'true' : undefined}
                aria-label={t('pages.productDetails.gallery.thumbAlt', {
                  name: productName,
                  index: index + 1,
                })}
                onClick={() => setActiveIndex(index)}
              >
                <img src={image} alt="" />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
