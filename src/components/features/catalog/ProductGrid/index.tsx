import { ProductCard } from '../ProductCard'
import type { Props } from './types'
import styles from './styles.module.css'

export const ProductGrid: Props = ({ products, onFavorite, onAddToCart }) => {
  return (
    <div className={styles.root}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavorite={onFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
