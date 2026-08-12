'use client'

import { useRouter } from "next/navigation"
import { ExpandingArrow} from "@mdm/ui"
import { Badge } from "@mdm/ui"
import { getStatusClassname } from "../../components/table/application-status"
import { formatDate, timeAgo } from "@mdm/utils"
import ApplicationStatus from "../../components/table/application-status"
import EmailDialog from "./EmailDialog"
import { AdminOption } from "../../components/table/columns"
import { ApplicationReviewer } from "../../components/table/application-reviewer"

const Header = ({
  application,
  admins
}:{
  application: any,
  admins: AdminOption[]
}) => {
  const router = useRouter()
  const applicationId = application?.id
  const reviewerId = application?.review?.reviewerId
  const status = application?.status?.status
  const sortedEmails = [...(application?.review?.emails ?? [])].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
  )

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

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <EmailDialog application={application} />
            <ApplicationReviewer applicationId={applicationId} reviewerId={reviewerId} admins={admins} />
            <ApplicationStatus applicationId={application?.id} status={status} />
          </div>

          {sortedEmails.length &&
            <div className="text-xs">
              Last email sent <span className="font-semibold">{timeAgo(sortedEmails[sortedEmails.length - 1]?.sentAt)}</span>
            </div>
          }
        </div>

      </div>
    </>
  )
}

export default Header
