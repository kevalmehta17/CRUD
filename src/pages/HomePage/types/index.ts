import type { User } from "@/types/user"

export interface FormData {
  name: string
  city: string
  country: string
  state: string
}

export interface FormErrors {
  name?: string
  city?: string
  country?: string
  state?: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize: number
  onPageSizeChange: (size: number) => void
}

export interface TableListProps {
  data: User[]
  isLoading: boolean
  isError: boolean
  onEditClick: (user: User) => void
  onDeleteClick: (userId: string) => void
  isDeleting: boolean
}