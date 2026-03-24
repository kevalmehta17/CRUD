import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import SearchBar from "./components/SearchBar/SearchBar"
import Pagination from "./components/Pagination/Pagination"
import { Button } from "@/components/ui/button"
import { useUsersTable } from "@/hooks/useUserTable"

const HomePage = () => {
  const {
    paginatedData,
    isLoading,
    isError,
    currentPage,
    totalPages,
    pageSize,
    handleEditClick,
    onPageChange,
    onPageSizeChange,
    onAddUser,
  } = useUsersTable()

  return (
  <div className="min-h-screen bg-background">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-4">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:max-w-sm">
          <SearchBar />
        </div>
        <Button onClick={onAddUser} className="w-full sm:w-auto">
          + Add User
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="h-137.5 overflow-auto">
          <TableList
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            onEditClick={handleEditClick}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>

      <UserForm />

    </div>
  </div>
)
}

export default HomePage
