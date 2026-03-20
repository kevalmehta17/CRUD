import { Input } from "@/components/ui/input"
import { setSearchQuery } from "@/store/userUiSlice"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/store/hooks"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(searchTerm))
    }, 700)
    return () => clearTimeout(timer)
  }, [searchTerm, dispatch])

  return (
    <Input
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar