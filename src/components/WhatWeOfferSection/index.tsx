import { ExportOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import CategoryCard from './components/CategoryCard'
import { CATALOG_ROUTE, CATEGORY_IDS } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

const WhatWeOfferSection: Props = () => {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollTrack = useCallback((direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const firstCard = track.firstElementChild
    const cardWidth = firstCard?.getBoundingClientRect().width ?? track.clientWidth
    const gap = 24
    const offset = direction === 'next' ? cardWidth + gap : -(cardWidth + gap)

    track.scrollBy({ left: offset, behavior: 'smooth' })
  }, [])

  return (
    <section className={styles.section} aria-labelledby="what-we-offer-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="what-we-offer-title">
          {t('whatWeOffer.title')}
        </h2>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            aria-label={t('whatWeOffer.prevCategories')}
            onClick={() => scrollTrack('prev')}
          >
            <LeftOutlined aria-hidden />
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label={t('whatWeOffer.nextCategories')}
            onClick={() => scrollTrack('next')}
          >
            <RightOutlined aria-hidden />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {CATEGORY_IDS.map((categoryId) => (
          <CategoryCard key={categoryId} categoryId={categoryId} />
        ))}
      </div>

      <div className={styles.cta}>
        <Link className={styles.ctaLink} to={CATALOG_ROUTE}>
          {t('whatWeOffer.exploreCategories')}
          <ExportOutlined className={styles.ctaIcon} aria-hidden />
        </Link>
      </div>
    </section>
  )
}

export default WhatWeOfferSection
