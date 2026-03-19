import SearchBar from "./components/SearchBar/SearchBar"
import TableList from "./components/Table/TableList"
import UserForm from "./components/Form/UserForm"
import Pagination from "./components/Pagination/Pagination"

const HomePage = () => {
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
            <TableList />
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
