export interface User {
  id: string
  name: string
  city: string
  country: string
  state: string
}

export interface UserUiState {
  searchQuery: string
  currentPage: number
  pageSize: number
  selectedUser: User | null
  isFormOpen: boolean
}
