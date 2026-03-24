import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCreateUserMutation, useUpdateUserMutation } from "@/store/usersApi"
import { closeForm } from "@/store/userUiSlice"
import type { RootState } from "@/store/UserStore"
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

export const useUserForm = () => {
  const dispatch = useDispatch()
  const selectedUser = useSelector((state: RootState) => state.userUi.selectedUser)
  const isFormOpen = useSelector((state: RootState) => state.userUi.isFormOpen)

  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [errors, setErrors] = useState<FormErrors>({})

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  useEffect(() => {
    if (!isFormOpen) {
      setFormData(emptyFormData)
      setErrors({})
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // clear error on that field as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser.id, ...formData }).unwrap()
        toast.success("User updated successfully!")
      } else {
        await createUser(formData).unwrap()
        toast.success("User created successfully!")
      }
      dispatch(closeForm())
    } catch {
      toast.error("An error occurred while saving the user.")
    }
  }

  const handleCancel = () => dispatch(closeForm())

  return {
    formData,
    errors,
    isFormOpen,
    selectedUser,
    isLoading: isCreating || isUpdating,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}