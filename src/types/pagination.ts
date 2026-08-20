export type PaginatedResponse<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
