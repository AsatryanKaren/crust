import type { Props } from './types'
import styles from './styles.module.css'

export const PhilosophyIcon: Props = ({ src, alt }) => {
  return (
    <div className={styles.shape}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  )
}
