import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { closeForm, openForm } from "@/store/userUiSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const UserForm = () => {
  const selectedUser = useSelector((state) => state?.userUi.selectedUser)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    state: "",
  })
  const dispatch = useDispatch()
  console.log("selected user inside form", selectedUser)
  const isFormOpen = useSelector((state) => state.userUi.isFormOpen)
  console.log("formOpen", isFormOpen)

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        city: selectedUser.city,
        country: selectedUser.country,
        state: selectedUser.state,
      })
    } else {
      setFormData({
        name: "",
        city: "",
        country: "",
        state: "",
      })
    }
  }, [selectedUser])

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeForm())
        }
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => dispatch(openForm())}>
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Edit profile" : "Add User"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Field>
            <Field>
              <Label htmlFor="city-1">City</Label>
              <Input
                id="city-1"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value })
                }}
              />
            </Field>
            <Field>
              <Label htmlFor="country-1">Country</Label>
              <Input
                id="country-1"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </Field>
            <Field>
              <Label htmlFor="state-1">State</Label>
              <Input
                id="state-1"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => dispatch(closeForm())}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UserForm

// Table.tsx needs
//   → users[]          comes from RTK Query
//   → isLoading        comes from RTK Query
//   → onRowClick       comes from HomePage
//   → onDelete         comes from RTK Query mutation

// Form.tsx needs
//   → selectedUser     comes from uiSlice
//   → onSubmit         comes from RTK Query mutation
//   → onCancel         comes from HomePage

// Pagination.tsx needs
//   → currentPage      comes from uiSlice
//   → pageSize         comes from uiSlice
//   → totalCount       comes from RTK Query data

// SearchBar.tsx needs
//   → searchQuery      comes from uiSlice
//   → onSearch         comes from HomePage
