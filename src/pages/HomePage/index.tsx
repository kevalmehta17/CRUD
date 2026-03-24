import TableList from "./components/Table"
import UserForm from "./components/Form"
import SearchBar from "./components/SearchBar"
import Pagination from "./components/Pagination"
import { Button } from "@/components/ui/button"
import { useUsersTable } from "@/pages/HomePage/hooks/useUserTable"

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
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-sm">
            <SearchBar />
          </div>
          <Button onClick={onAddUser} className="w-full sm:w-auto">
            + Add User
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border">
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
