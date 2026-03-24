import type { User, UserUiState } from "@/types/user"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: UserUiState = {
  searchQuery: "",
  currentPage: 1,
  pageSize: 10,
  selectedUser: null,
  isFormOpen: false,
}

export const userUiSlice = createSlice({
  name: "userUi",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    openForm: (state) => {
      state.isFormOpen = true
    },
    closeForm: (state) => {
      state.isFormOpen = false
      state.selectedUser = null
    },
  },
})

export const {
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  setSelectedUser,
  openForm,
  closeForm,
} = userUiSlice.actions
export default userUiSlice.reducer
