import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@mdm/ui"

const ReviewPanel = ({
  review,
}:{
  review: any
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 py-6">
        <CardTitle className="text-lg">Review Panel</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        
      </CardContent>
    </Card>
  )
}

export default ReviewPanel