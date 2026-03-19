import SearchBar from "./components/SearchBar/SearchBar"
import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import Pagination from "./components/Pagination/Pagination"
import { useGetUsersQuery } from "@/store/usersApi"
import { useDispatch } from "react-redux"
import { setSelectedUser } from "@/store/userUiSlice"
import type { User } from "@/types/user"

const HomePage = () => {
    const { data, isLoading, isError } = useGetUsersQuery();
    const dispatch = useDispatch();

    const handleEditClick = (user: User) => {
      setSelectedUser(user)
      console.log("selected user", user);
    }

  return (
    <div className="min-h-screen lg:px-8">
      <div className="flex flex-col  gap-6">
        <div className="border flex items-center p-4">
          <UserForm />
        </div>
        <div className="flex flex-col gap-3 border p-4">
          <div className="mb-4">
            <SearchBar />
          </div>
          <div className="flex-1 overflow-auto">
            <TableList data={data ?? []} onEditClick={handleEditClick} isLoading={isLoading} />
          </div>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
