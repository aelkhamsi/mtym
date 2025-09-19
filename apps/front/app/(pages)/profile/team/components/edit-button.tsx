import { PencilIcon } from "lucide-react"

const EditButton = ({
  className,
}:{
  className?: string
}) => {
  return (
    <div className={`border p-2 hover:cursor-pointer rounded-md ${className}`}>
      <PencilIcon />
    </div>
  )
}

export default EditButton
