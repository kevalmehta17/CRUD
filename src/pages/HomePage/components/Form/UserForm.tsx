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
import { useCreateUserMutation, useUpdateUserMutation } from "@/store/usersApi";
import type { RootState } from "@/store/UserStore";
import { closeForm } from "@/store/userUiSlice"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

interface FormData {
  name: string
  city: string
  country: string
  state: string
}

const emptyFormData: FormData = {
  name: "",
  city: "",
  country: "",
  state: "",
}

const UserForm = () => {
  const selectedUser = useSelector((state : RootState) => state.userUi.selectedUser)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    city: "",
    country: "",
    state: "",
  })
  const dispatch = useDispatch()
  console.log("selected user inside form", selectedUser)
  const isFormOpen = useSelector((state : RootState) => state.userUi.isFormOpen)
  console.log("formOpen", isFormOpen)
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (!isFormOpen) {
      setFormData(emptyFormData);
      return;
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
  }, [selectedUser, isFormOpen]);

  // handle Input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("inside eve", e.target.name);
    const inputName  = e.target.name;
    const changedValue = e.target.value;
    console.log("the name of e is:-", e.target.value);
    setFormData({...formData, [inputName]: changedValue });
  }

  // handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.country.trim() ||
      !formData.state.trim()
    ) {
      alert("please fill out all information");
      return;
    }
    // if everything is Good
    if (selectedUser) {
      await updateUser({ id: selectedUser.id, ...formData });
      console.log('after updated user', formData);
    }
    else {
      await createUser(formData);
      console.log('after created user', formData);
    }
    dispatch(closeForm());
    setFormData(emptyFormData);
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
              {selectedUser ? "Make changes to your profile here. Click save when you're done." : "Fill out the form below to add a new user."}
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
                onChange={handleChange
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
              <Button variant="outline" disabled={isCreating || isUpdating} onClick={() => dispatch(closeForm())}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{ isCreating || isUpdating ? "Saving..." : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm;