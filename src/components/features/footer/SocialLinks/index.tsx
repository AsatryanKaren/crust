import { useTranslation } from 'react-i18next'

import { FOOTER_SOCIAL_LINKS } from '../consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const SocialLinks: Props = () => {
  const { t } = useTranslation()

  return (
    <ul className={styles.list}>
      {FOOTER_SOCIAL_LINKS.map(({ id, href, icon }) => (
        <li key={id}>
          <a
            className={styles.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(`footer.social.${id}`)}
          >
            <img
              className={styles.icon}
              src={icon}
              alt=""
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
