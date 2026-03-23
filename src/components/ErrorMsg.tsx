import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorMsg() {
  console.log("inside Error component")
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Alert
        variant="destructive"
        className="max-w-md flex flex-col items-center"
      >
        <div className="flex flex-row gap-2">
          <AlertCircleIcon  />
          <AlertTitle>Data Fetching failed</AlertTitle>
        </div>
        <AlertDescription>
          Something Went Wrong to find your request.
        </AlertDescription>
      </Alert>{" "}
    </div>
  )
}
