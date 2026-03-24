import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { setSearchQuery } from "@/store/userUiSlice"
import { useDispatch } from "react-redux"

export const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 700)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch))
  }, [debouncedSearch, dispatch])

  const handleClearField = () => {
    setSearchTerm("")
    dispatch(setSearchQuery(""))
  }
  return {
    searchTerm,
    setSearchTerm,
    handleClearField,
  }
}
