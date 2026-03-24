import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteUserMutation } from "@/store/usersApi"
import { Trash, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

interface DeleteProps {
  userId: string
}

export default function DeleteDialog({ userId }: DeleteProps) {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const handleDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Delete user error:", error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>  
            This will permanently delete the User. <br />
            Are You Sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
            type="submit"
            className="cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
