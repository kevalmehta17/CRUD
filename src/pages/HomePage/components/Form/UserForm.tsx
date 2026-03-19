import { useGetUsersQuery } from "@/store/usersApi";

const UserForm = () => {
    const {isLoading, isError, data} = useGetUsersQuery();
    console.log("isLoading", isLoading);
    console.log("isError", isError);
    console.log("data", data);
  return (
    <div>
      
    </div>
  )
}

export default UserForm




// Table.tsx needs
//   → users[]          comes from RTK Query
//   → isLoading        comes from RTK Query
//   → onRowClick       comes from HomePage
//   → onDelete         comes from RTK Query mutation

// Form.tsx needs
//   → selectedUser     comes from uiSlice
//   → onSubmit         comes from RTK Query mutation
//   → onCancel         comes from HomePage

// Pagination.tsx needs
//   → currentPage      comes from uiSlice
//   → pageSize         comes from uiSlice
//   → totalCount       comes from RTK Query data

// SearchBar.tsx needs
//   → searchQuery      comes from uiSlice
//   → onSearch         comes from HomePage