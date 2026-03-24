import { Input } from "@/components/ui/input"
import { setSearchQuery } from "@/store/userUiSlice"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { useDebounce } from "@/hooks/useDebounce"

const SearchBar = () => {
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

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-10"
      />

      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClearField}
          className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default SearchBar
