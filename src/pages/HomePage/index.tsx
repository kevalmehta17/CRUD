import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import SearchBar from "./components/SearchBar/SearchBar"
import Pagination from "./components/Pagination/Pagination"
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/usersApi"
import { useAppDispatch } from "@/store/hooks"
import { openForm, setSelectedUser } from "@/store/userUiSlice"
import type { User } from "@/types/user"
import { useSelector } from "react-redux"

const HomePage = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const dispatch = useAppDispatch() 
  const getSearchQuery = useSelector((state) => state.userUi.searchQuery)

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

  const userData = () => {
    if (!getSearchQuery) {
      return data
    }
    const filteredData = data?.filter((user) => {
      const searchTerm = getSearchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.city.toLowerCase().includes(searchTerm) ||
        user.country.toLowerCase().includes(searchTerm) ||
        user.state.toLowerCase().includes(searchTerm)
      )
    })
    console.log("filteredData", filteredData);
    return filteredData;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex h-full flex-col gap-6">
        <aside className="w-95 shrink-0">
          <UserForm />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <SearchBar />
          <TableList
            data={userData()}
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
