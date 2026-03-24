import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserForm } from "@/hooks/useUserForm";

const UserForm = () => {
  const {
    formData,
    errors,
    isFormOpen,
    selectedUser,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useUserForm()

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => { if (!open) handleCancel() }}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser
                ? "Update the details below."
                : "Fill out the form to add a new user."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
        
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-xs text-destructive">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-xs text-destructive">{errors.city}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <span className="text-xs text-destructive">{errors.country}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <span className="text-xs text-destructive">{errors.state}</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer"
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : selectedUser ? "Update" : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm;
