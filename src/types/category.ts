export type CategoryIcon =
  | 'pastries'
  | 'breads'
  | 'cakes'
  | 'sandwiches'
  | 'drinks'
  | 'breakfast'
  | 'seasonal'

export type Category = {
  id: string
  slug: string
  nameKey: string
  icon: CategoryIcon
}
