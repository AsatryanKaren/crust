import breadsImage from '../../../assets/images/WhatWeOfferSection/breads.jpg'
import cakesImage from '../../../assets/images/WhatWeOfferSection/cakes.jpg'
import cocktailsImage from '../../../assets/images/WhatWeOfferSection/cocktails.jpg'
import pastriesImage from '../../../assets/images/WhatWeOfferSection/pastries.jpg'

export const CATEGORY_IDS = [
  'breads',
  'pastries',
  'cakes',
  'cocktails',
] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export const CATEGORY_IMAGES: Record<CategoryId, string> = {
  breads: breadsImage,
  pastries: pastriesImage,
  cakes: cakesImage,
  cocktails: cocktailsImage,
}

export const CARD_GAP_PX = 24
