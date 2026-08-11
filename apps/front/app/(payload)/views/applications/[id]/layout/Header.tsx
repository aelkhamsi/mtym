'use client'

import { useRouter } from "next/navigation"
import { ExpandingArrow} from "@mdm/ui"
import { Badge } from "@mdm/ui"
import { getStatusClassname } from "../../components/table/application-status"
import { formatDate } from "@mdm/utils"
import ApplicationStatus from "../../components/table/application-status"
import EmailDialog from "./EmailDialog"

const timeAgo = (updatedAt: string) => {
  const diffMs = Date.now() - new Date(updatedAt).getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'just now';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}min ago`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
}

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

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <EmailDialog user={application?.user} />
            <ApplicationStatus applicationId={application?.id} status={status} />
          </div>

          <div className="text-xs">
            Last status update <span className="font-semibold">{timeAgo(application?.status?.updatedAt)}</span>
          </div>
        </div>

      </div>
    </>
  )
}

export default Header
