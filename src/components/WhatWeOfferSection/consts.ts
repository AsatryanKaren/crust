import breadsImage from '../../images/categories/breads.jpg'
import pastriesImage from '../../images/categories/pastries.jpg'
import cakesImage from '../../images/categories/cakes.jpg'
import cocktailsImage from '../../images/categories/cocktails.jpg'

export const CATEGORY_IDS = ['breads', 'pastries', 'cakes', 'cocktails'] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export const CATEGORY_IMAGES: Record<CategoryId, string> = {
  breads: breadsImage,
  pastries: pastriesImage,
  cakes: cakesImage,
  cocktails: cocktailsImage,
}

export const CATALOG_ROUTE = '/catalog'
