'use client'

import { useRouter } from "next/navigation"
import { ExpandingArrow} from "@mdm/ui"
import { Badge } from "@mdm/ui"
import { Button } from "@mdm/ui"
import { getStatusClassname } from "../../components/table/application-status"
import { formatDate } from "@mdm/utils"
import ApplicationStatus from "../../components/table/application-status"

const Header = ({
  application,
}:{
  application: any,
}) => {
  const router = useRouter()
  const status = application?.status?.status

  return (
    <>
      <div
        className='font-semibold flex cursor-pointer'
        onClick={() => router.back()}
      >
        <ExpandingArrow className='rotate-180 mr-2'/> {"  "} Go Back
      </div>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Application #{application?.id} - {application?.firstName} {application?.lastName}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <Badge className={getStatusClassname(status, 'sm')}>
              {status}
            </Badge>

            <span className="text-muted-foreground text-sm">
              Submitted on {formatDate(application?.createdAt)}
            </span>
          </div>
        </div>

        
        <ApplicationStatus applicationId={application?.id} status={status} />
      </div>
    </>
  )
}

export default Header