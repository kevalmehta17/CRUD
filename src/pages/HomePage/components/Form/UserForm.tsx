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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateUserMutation, useUpdateUserMutation } from "@/store/usersApi"
import type { RootState } from "@/store/UserStore"
import { closeForm } from "@/store/userUiSlice"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

interface FormData {
  name: string
  city: string
  country: string
  state: string
}
interface FormErrors {
  name?: string
  city?: string
  country?: string
  state?: string
}

const emptyFormData: FormData = {
  name: "",
  city: "",
  country: "",
  state: "",
}

const UserForm = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.userUi.selectedUser
  )
  const [formData, setFormData] = useState<FormData>({
    name: "",
    city: "",
    country: "",
    state: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const dispatch = useDispatch()
  console.log("selected user inside form", selectedUser)
  const isFormOpen = useSelector((state: RootState) => state.userUi.isFormOpen)
  console.log("formOpen", isFormOpen)
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  useEffect(() => {
    if (!isFormOpen) {
      setFormData(emptyFormData)
      return
    }
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        city: selectedUser.city,
        country: selectedUser.country,
        state: selectedUser.state,
      })
    } else {
      setFormData(emptyFormData)
    }
  }, [selectedUser, isFormOpen])

  // handle Input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("inside eve", e.target.name)
    const inputName = e.target.name
    const changedValue = e.target.value
    console.log("the name of e is:-", e.target.value)
    setFormData({ ...formData, [inputName]: changedValue })
  }

  // validation
  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    setErrors(newErrors)
    console.log("the error length is", Object.keys(newErrors).length)
    return Object.keys(newErrors).length === 0
  }

  // handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      console.log("try selected", selectedUser)
      if (selectedUser) {
        console.log("selectedUser edit", selectedUser)
         await updateUser({ id: selectedUser.id, ...formData }).unwrap();
        console.log("after updated user", formData)
        toast.success("User updated successfully!")
      } else {
        console.log("selectedUser create", selectedUser)
        await createUser(formData).unwrap();
        toast.success("User created successfully!")
        console.log("after created user", formData)
      }
      dispatch(closeForm())
      setFormData(emptyFormData)
    } catch (error) {
      toast.error("An error occurred while saving the user.")
      console.error("Error saving user:", error)
    }
  }

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeForm())
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Edit profile" : "Add User"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser
                ? "Make changes to your profile here. Click save when you're done."
                : "Fill out the form below to add a new user."}
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
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-sm text-destructive">{errors.name}</span>
              )}
            </Field>
            <Field>
              <Label htmlFor="city-1">City</Label>
              <Input
                id="city-1"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-sm text-destructive">{errors.city}</span>
              )}
            </Field>
            <Field>
              <Label htmlFor="country-1">Country</Label>
              <Input
                id="country-1"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <span className="text-sm text-destructive">
                  {errors.country}
                </span>
              )}
            </Field>
            <Field>
              <Label htmlFor="state-1">State</Label>
              <Input
                id="state-1"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <span className="text-sm text-destructive">{errors.state}</span>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isCreating || isUpdating}
                onClick={() => dispatch(closeForm())}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {isCreating || isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
