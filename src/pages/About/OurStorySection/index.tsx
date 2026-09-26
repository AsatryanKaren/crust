import { useTranslation } from 'react-i18next'

import { STORY_IMAGES } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const OurStorySection: Props = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.root} aria-labelledby="about-story-title">
      <h2 className={styles.title} id="about-story-title">
        {t('aboutStory.title')}
      </h2>

      <div className={styles.grid}>
        <div className={styles.mediaCell}>
          <img
            className={styles.photo}
            src={STORY_IMAGES.kneading}
            alt={t('aboutStory.kneadingAlt')}
          />
        </div>

        <div className={styles.textCell}>
          <img
            className={styles.textBg}
            src={STORY_IMAGES.textBg1}
            alt=""
            aria-hidden
          />
          <div className={styles.textContent}>
            <h3 className={styles.panelTitle}>{t('aboutStory.panel1Title')}</h3>
            <p className={styles.body}>{t('aboutStory.panel1Body1')}</p>
            <p className={styles.body}>{t('aboutStory.panel1Body2')}</p>
            <p className={styles.quote}>{t('aboutStory.quote')}</p>
          </div>
        </div>

        <div className={styles.textCell}>
          <img
            className={styles.textBg}
            src={STORY_IMAGES.textBg2}
            alt=""
            aria-hidden
          />
          <div className={styles.textContent}>
            <h3 className={styles.panelTitle}>{t('aboutStory.panel2Title')}</h3>
            <p className={styles.body}>{t('aboutStory.panel2Body1')}</p>
            <p className={styles.body}>{t('aboutStory.panel2Body2')}</p>
          </div>
        </div>

        <div className={styles.mediaCell}>
          <img
            className={styles.photo}
            src={STORY_IMAGES.breads}
            alt={t('aboutStory.breadsAlt')}
          />
        </div>
      </div>
    </section>
  )
}
