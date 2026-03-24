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
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <SearchBar />
          </div>
          <Button className="cursor-pointer" onClick={onAddUser}>+ Add User</Button>
        </div>

        <div className="overflow-hidden rounded-md border">
          <div className="h-150 overflow-y-auto">
            <TableList
              data={paginatedData}
              isLoading={isLoading}
              isError={isError}
              onEditClick={handleEditClick}
            />
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />

        <UserForm />
      </div>
    </div>
  )
}

export default HomePage
