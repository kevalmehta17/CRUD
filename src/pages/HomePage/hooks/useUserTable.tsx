import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/usersApi"
import {
  openForm,
  setSelectedUser,
  setCurrentPage,
  setPageSize,
} from "@/store/userUiSlice"
import type { RootState } from "@/store/UserStore"
import type { User } from "@/types/user"
import { toast } from "sonner"

export const useUsersTable = () => {
  const dispatch = useDispatch()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const { data, isLoading, isError } = useGetUsersQuery()

  const searchQuery = useSelector(
    (state: RootState) => state.userUi.searchQuery
  )
  const currentPage = useSelector(
    (state: RootState) => state.userUi.currentPage
  )
  const pageSize = useSelector((state: RootState) => state.userUi.pageSize)

  const filteredData = useMemo(() => {
    if (!data) return []
    if (!searchQuery.trim()) return data
    const searchTerm = searchQuery.toLowerCase()
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.city.toLowerCase().includes(searchTerm) ||
        user.country.toLowerCase().includes(searchTerm) ||
        user.state.toLowerCase().includes(searchTerm)
    )
  }, [data, searchQuery])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1

  const handleEditClick = (user: User) => {
    dispatch(setSelectedUser(user))
    dispatch(openForm())
  }

  const handleDelete = async (userId: string) => {
    console.log("Delete button clicked")
    try {
      await deleteUser(userId).unwrap()
      toast.success("User deleted successfully!")
      const newPage = Math.ceil((filteredData.length - 1) / pageSize) || 1
      if (newPage < currentPage) {
        dispatch(setCurrentPage(newPage))
      }
    } catch (error) {
      toast.error("Failed to delete user.")
      console.error("Delete user error:", error)
    }
  }

  return {
    paginatedData,
    isLoading,
    isError,
    currentPage,
    totalPages,
    pageSize,
    handleEditClick,
    onPageChange: (page: number) => dispatch(setCurrentPage(page)),
    onPageSizeChange: (size: number) => dispatch(setPageSize(size)),
    onAddUser: () => dispatch(openForm()),
    handleDelete,
    isDeleting,
  }
}
