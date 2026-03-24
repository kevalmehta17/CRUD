import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchBar } from "./useSearchBar"

const SearchBar = () => {
  const { searchTerm, setSearchTerm, handleClearField } = useSearchBar()

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
