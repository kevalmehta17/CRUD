import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/user"
import { Pencil, Trash } from "lucide-react"

interface TableListProps {
  data: User[];
  isLoading: boolean;
  onEditClick: (user: User) => void;
}

function TableDemo({data , isLoading, onEditClick} : TableListProps) {
  if (isLoading) {
    return (
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
    )
  }
  console.log("data inside", data)
  return (
    <Table>
      <TableCaption>User Data</TableCaption>
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
              <Button variant={"outline"} onClick ={() => onEditClick(user)}>
                <Pencil />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant={"destructive"}>
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableDemo
