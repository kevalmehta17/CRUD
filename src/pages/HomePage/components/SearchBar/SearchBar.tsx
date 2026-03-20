import { Input } from "@/components/ui/input"
import { setSearchQuery } from "@/store/userUiSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const dispatch = useDispatch()
  dispatch(setSearchQuery(searchTerm))

  console.log("searched", searchTerm); 
  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
export default SearchBar
