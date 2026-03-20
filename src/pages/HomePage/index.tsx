import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import SearchBar from "./components/SearchBar/SearchBar"
import Pagination from "./components/Pagination/Pagination"
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/usersApi"
import { useAppDispatch } from "@/store/hooks"
import { setSelectedUser } from "@/store/userUiSlice"
import type { User } from "@/types/user"

const HomePage = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const dispatch = useAppDispatch()

  const handleEditClick = (user: User) => {
    console.log("user we found is", user)
    dispatch(setSelectedUser(user))
  }
  const handleDeleteClick = async (id: string) => {
    try {
      await deleteUser(id)
      
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-row gap-6 h-full">

        <aside className="w-95 shrink-0">
          <UserForm />
        </aside>

        <section className="flex-1 min-w-0 flex flex-col gap-4">
          <SearchBar data={data ?? []} />
          <TableList
            data={data ?? []}
            isLoading={isLoading}
            isError={isError}
            onEditClick={handleEditClick}
            deleteClick={handleDeleteClick}
          />
          <Pagination />
        </section>

      </div>
    </div>
  )
}

export default HomePage
