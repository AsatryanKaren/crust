import fermentationJarImage from '../../../assets/images/About/fermentationJar.png'
import peopleImage from '../../../assets/images/About/people.png'
import wheatImage from '../../../assets/images/About/wheat.png'

export const PHILOSOPHY_IDS = ['organic', 'fermentation', 'community'] as const

export type PhilosophyId = (typeof PHILOSOPHY_IDS)[number]

export const PHILOSOPHY_IMAGES: Record<PhilosophyId, string> = {
  organic: wheatImage,
  fermentation: fermentationJarImage,
  community: peopleImage,
}
