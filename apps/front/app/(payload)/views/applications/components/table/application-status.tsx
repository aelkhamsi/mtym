import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mdm/ui";
import { useAtom } from 'jotai';
import { applicationsAtom } from "@/app/store/admin/applicationsAtom";
import { toast } from "@mdm/ui";
import { putApplicationStatus } from "@/app/api/ApplicationApi";

export type Status =
  | 'DRAFT'
  | 'PENDING'
  | 'INFO_NEEDED'
  | 'NOTIFIED'
  | 'UPDATED'
  | 'VALIDATED'
  | 'REJECTED'
  | 'NOT_VALID'
  | 'NOT_SURE'

export const getStatusClassname = (status: Status, size: 'sm' | 'md') => {
  const baseClassname = `rounded-xl text-center ${size === 'md' ? 'px-4 py-1 w-[8rem]' : 'px-2'}`
  let colorClassname;

  switch(status) {
    case 'DRAFT':
      colorClassname = 'bg-gray-300 text-black';
      break;
    case 'PENDING':
      colorClassname = 'bg-[#FFE380] text-black';
      break;
    case 'INFO_NEEDED':
      colorClassname = 'bg-[#EFFF99] text-black';
      break;
    case 'NOTIFIED':
      colorClassname = 'bg-[#79E2F2] text-black';
      break;
    case 'UPDATED':
      colorClassname = 'bg-[#DBABFF] text-black';
      break;
    case 'VALIDATED':
      colorClassname = 'bg-[#41D997] text-black';
      break;
    case 'REJECTED':
      colorClassname = 'bg-[#BF2600] text-white';
      break;
    case 'NOT_VALID':
      colorClassname = 'bg-[#D1401B] text-white';
      break;
    case 'NOT_SURE':
      colorClassname = 'bg-[#EAED9A] text-black';
      break;
  }

  return `${baseClassname} ${colorClassname}`;
}

export const statusOptions = [
  { value: "DRAFT", label: "DRAFT"},
  { value: "PENDING", label: "PENDING"},
  { value: "INFO_NEEDED", label: "INFO NEEDED"},
  { value: "NOTIFIED", label: "NOTIFIED"},
  { value: "UPDATED", label: "UPDATED"},
  { value: "VALIDATED", label: "VALIDATED"},
  { value: "REJECTED", label: "REJECTED"},
  { value: "NOT_VALID", label: "NOT VALID"},
  { value: "NOT_SURE", label: "NOT SURE"}
]

const StatusCard = ({
  value,
}:{
  value: Status,
}) => {
  return (
    <div className={getStatusClassname(value, 'md')}>
      {value.split('_').join(' ')}
    </div>
  )
}

const ApplicationStatus = ({
  applicationId,
  status,
}:{
  applicationId: number,
  status: string,
}) => {
  const [applications, setApplications] = useAtom(applicationsAtom);
  const handleStatusChange = async (value: Status) => {
    const response = await putApplicationStatus(applicationId, {
      status: value,
    }) as any;

    if (response?.statusCode === 200) {
      setApplications(
        applications.map((entry: any) => {
          if (entry?.id === applicationId) {
            return {...entry, status: {...entry.status, status: value}}
          }
          return entry;
        }),
      )

      toast({
        title: 'Status update',
        description: 'The status is updated with success',
      })
    } else {
      toast({
        title: 'Status update failed',
        description: 'The status update have failed. Please try later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[11rem]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent
          style={{
            backgroundColor: "var(--theme-input-bg)",
            borderColor: "var(--theme-elevation-150)",
            color: "var(--theme-text)",
          }}
        >
          <SelectItem value="DRAFT"><StatusCard value='DRAFT' /></SelectItem>
          <SelectItem value="PENDING"><StatusCard value='PENDING' /></SelectItem>
          <SelectItem value="INFO_NEEDED"><StatusCard value='INFO_NEEDED' /></SelectItem>
          <SelectItem value="NOTIFIED"><StatusCard value='NOTIFIED' /></SelectItem>
          <SelectItem value="UPDATED"><StatusCard value='UPDATED' /></SelectItem>
          <SelectItem value="VALIDATED"><StatusCard value='VALIDATED' /></SelectItem>
          <SelectItem value="REJECTED"><StatusCard value='REJECTED' /></SelectItem>
          <SelectItem value="NOT_VALID"><StatusCard value='NOT_VALID' /></SelectItem>
          <SelectItem value="NOT_SURE"><StatusCard value='NOT_SURE' /></SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ApplicationStatus
