import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import SearchBar from "./components/SearchBar/SearchBar"
import Pagination from "./components/Pagination/Pagination"
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/usersApi"
import { useAppDispatch } from "@/store/hooks"
import { openForm, setSelectedUser, setCurrentPage, setPageSize } from "@/store/userUiSlice"
import type { User } from "@/types/user"
import { useSelector } from "react-redux"
import { useMemo } from "react"

const HomePage = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const dispatch = useAppDispatch()
  const getSearchQuery = useSelector((state) => state.userUi.searchQuery)
  const currentPage = useSelector((state) => state.userUi.currentPage)
  const pageSize = useSelector((state) => state.userUi.pageSize)

  const handleEditClick = (user: User) => {
    console.log("user we found is", user)
    dispatch(openForm())
    dispatch(setSelectedUser(user))
  }
  const handleDeleteClick = async (id: string) => {
    try {
      await deleteUser(id)
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const filteredData = useMemo(() => {
    if (!data) return []
    if (!getSearchQuery.trim()) {
      return data
    }
    const userData = data?.filter((user) => {
      const searchTerm = getSearchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.city.toLowerCase().includes(searchTerm) ||
        user.country.toLowerCase().includes(searchTerm) ||
        user.state.toLowerCase().includes(searchTerm)
      )
    })
    return userData
  }, [data, getSearchQuery])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredData?.slice(startIndex, endIndex)
  }, [currentPage, pageSize, filteredData])

  const totalPages = Math.ceil(filteredData.length / pageSize)

  return (
    <div className="min-h-screen p-6">
      <div className="flex h-full flex-col gap-6">
        <aside className="w-95 shrink-0">
          <UserForm />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <SearchBar />
          <TableList
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            onEditClick={handleEditClick}
            deleteClick={handleDeleteClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            onPageSizeChange={(size) => dispatch(setPageSize(size))}
          />
        </section>
      </div>
    </div>
  )
}

export default HomePage
