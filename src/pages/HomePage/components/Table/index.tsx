import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/user"
import { Pencil } from "lucide-react"
import ErrorMsg from "@/components/ErrorMsg"
import DeleteDialog from "@/components/DeleteDialog"
import EmptyInputGroup from "@/components/EmptyInput"

interface TableListProps {
  data: User[]
  isLoading: boolean
  isError: boolean
  onEditClick: (user: User) => void
}

function TableData({ data, isLoading, isError, onEditClick }: TableListProps) {
  if (isLoading) {
    return (
      <div className="relative flex h-full items-center justify-center">
        <Button
          variant="outline"
          disabled
          size="sm"
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Spinner data-icon="inline-start" />
          Please wait
        </Button>
      </div>
    )
  }
  if (isError) {
    return <ErrorMsg />
  }
  if (!data || data.length == 0) {
    return <EmptyInputGroup />
  }
  return (
    <Table className="h-">
      <TableHeader className="sticky top-0 z-10 bg-slate-800">
        <TableRow className="hover:bg-transparent text-base">
          <TableHead>Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.state}</TableCell>
            <TableCell>
              <Button
                className="cursor-pointer"
                variant={"outline"}
                onClick={() => onEditClick(user)}
              >
                <Pencil />
              </Button>
            </TableCell>
            <TableCell>
              <DeleteDialog userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableData
