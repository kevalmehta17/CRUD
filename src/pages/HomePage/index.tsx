import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import SearchBar from "./components/SearchBar/SearchBar"
import Pagination from "./components/Pagination/Pagination"
import type { RootState } from "../../store/UserStore"
import { useGetUsersQuery } from "@/store/usersApi"
import { useAppDispatch } from "@/store/hooks"
import { openForm, setSelectedUser, setCurrentPage, setPageSize } from "@/store/userUiSlice"
import type { User } from "@/types/user"
import { useSelector } from "react-redux"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  const dispatch = useAppDispatch()

  const getSearchQuery = useSelector((state: RootState) => state.userUi.searchQuery)
  const currentPage = useSelector((state: RootState) => state.userUi.currentPage)
  const pageSize = useSelector((state: RootState) => state.userUi.pageSize)

  const handleEditClick = (user: User) => {
    dispatch(setSelectedUser(user))
    dispatch(openForm())
  }

  const filteredData = useMemo(() => {
    if (!data) return []
    if (!getSearchQuery.trim()) return data
    const searchTerm = getSearchQuery.toLowerCase()
    return data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.city.toLowerCase().includes(searchTerm) ||
      user.country.toLowerCase().includes(searchTerm) ||
      user.state.toLowerCase().includes(searchTerm)
    )
  }, [data, getSearchQuery])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, filteredData])

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1

  return (
    <div className="min-h-screen bg-background">
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-4">

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full max-w-sm">
          <SearchBar />
        </div>
        <Button onClick={() => dispatch(openForm())}>
          + Add User
        </Button>
      </div>

      {/* Table — fixed height, scrollable */}
      <div className="rounded-md border overflow-hidden">
        <div className="h-150 overflow-y-auto">
          <TableList
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            onEditClick={handleEditClick}
          />
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        onPageSizeChange={(size) => dispatch(setPageSize(size))}
      />

      {/* Modal — no visible UI, controlled by Redux */}
      <UserForm />

    </div>
  </div>
)
}

export default HomePage