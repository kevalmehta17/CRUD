import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void
}

const getPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | "...")[] => {
  if (totalPages <= 4 ) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | "...")[] = [1]

  if (currentPage > 3) pages.push("...")

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (currentPage < totalPages - 2) pages.push("...");

  pages.push(totalPages)
  return pages
}

// const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
//   // total pages is small — show all
//   if (totalPages <= 5) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1)
//   }

//   // calculate start so currentPage is in middle
//   let start = currentPage - 2
//   let end = currentPage + 2

//   // fix if start goes below 1
//   if (start < 1) {
//     start = 1
//     end = 5
//   }

//   // fix if end goes above totalPages
//   if (end > totalPages) {
//     end = totalPages
//     start = totalPages - 4
//   }

//   // return [start, start+1, ..., end]
//   const pages = []
//   for (let i = start; i <= end; i++) {
//     pages.push(i)
//   }
//   return pages
// }

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) => {
  const pages = getPageNumbers(currentPage, totalPages)
  console.log("pages are", pages);

  return (
    <div className="flex items-center justify-between py-2">

      <div className="flex items-center gap-2 text-sm text-slate-300">
        <span>Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(val) => {
            onPageSizeChange(Number(val))
            onPageChange(1)
          }}
        >
          <SelectTrigger className="w-18 h-8 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent> 
            {[10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className="h-8 w-8 cursor-pointer"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

      </div>
    </div>
  )
}

export default Pagination