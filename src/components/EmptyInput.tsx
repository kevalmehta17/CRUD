import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"


export default function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-red-600 text-xl">404 - Not Found</EmptyTitle>
        <EmptyDescription className="text-red-500">
          The term you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  )
}
