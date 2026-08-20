import { useQuery } from '@tanstack/react-query'

import { fetchCategories } from '../api/categories'

export const categoriesQueryKey = ['categories'] as const

export const useCategories = () => {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: fetchCategories,
  })
}
