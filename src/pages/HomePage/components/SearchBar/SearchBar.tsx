import { Input } from "@/components/ui/input"
import { setSearchQuery } from "@/store/userUiSlice";
import { useState } from "react"
import { useDispatch } from "react-redux";

const SearchBar = ({data}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const dispatch = useDispatch();
  dispatch(setSearchQuery(searchTerm));

  console.log("searched", searchTerm);
  const filteredData = data.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.city.toLowerCase().includes(searchTermLower) ||
      user.country.toLowerCase().includes(searchTermLower) ||
      user.state.toLowerCase().includes(searchTermLower)
    )
  })
  console.log('test', filteredData)
  return (
    <div>
      <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  )
}                                                      
export default SearchBar
  