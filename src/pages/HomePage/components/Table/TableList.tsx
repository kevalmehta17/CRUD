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
  deleteClick: (id: string) => void
}

function TableData({
  data,
  isLoading,
  isError,
  onEditClick,
  deleteClick,
}: TableListProps) {

  console.log("data in table list is", data)

  if (isLoading) {
    return (
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
    )
  }
  if (isError) {
    return <ErrorMsg />
  }
  if(!data || data.length == 0){
    console.log("i am here")
    return <EmptyInputGroup />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>State</TableHead>
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
              <Button variant={"outline"} onClick={() => onEditClick(user)}>
                <Pencil />
              </Button>
            </TableCell>
            <TableCell>
              <DeleteDialog userId={user.id} onDelete={deleteClick} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableData;
