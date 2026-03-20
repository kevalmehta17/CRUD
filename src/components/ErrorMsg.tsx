import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

export default function ErrorMsg() {
    console.log("inside Error component")
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Data Fetching failed</AlertTitle>
      <AlertDescription>
       Something Went Wrong to find your request.
      </AlertDescription>
    </Alert>
  )
}
