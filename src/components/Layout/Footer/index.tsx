import { BrandName } from '../../_shared/BrandName'
import { FooterBottom } from '../../features/footer/FooterBottom'
import { FooterColumn } from '../../features/footer/FooterColumn'
import { FooterSubscribe } from '../../features/footer/FooterSubscribe'
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_LINKS_ITEMS,
  FOOTER_OFFER_ITEMS,
} from '../../features/footer/consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const Footer: Props = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <BrandName />
          <FooterColumn
            titleKey="footer.contact.title"
            items={FOOTER_CONTACT_ITEMS}
          />
          <FooterColumn
            titleKey="footer.offer.title"
            items={FOOTER_OFFER_ITEMS}
          />
          <FooterColumn
            titleKey="footer.links.title"
            items={FOOTER_LINKS_ITEMS}
          />
          <FooterSubscribe />
        </div>
        <hr className={styles.divider} />
        <FooterBottom />
      </div>
    </footer>
  )
}
