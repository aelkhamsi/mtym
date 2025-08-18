import { applicationsState } from '@/store/applicationsState'
import { useRecoilState } from 'recoil'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { putApplicationStatus } from '@/api/ApplicationApi';
import { toast } from '@/components/hooks/use-toast';

export type Status =
  | 'DRAFT'
  | 'PENDING'
  | 'NOTIFIED'
  | 'UPDATED'
  | 'VALIDATED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WAITLIST';

export const getStatusClassname = (status: Status, size: 'sm' | 'md') => {
  const baseClassname = size === 'md' 
    ? 'rounded-lg px-6 py-1'
    : 'rounded-lg px-2';

  let colorClassname;

  switch(status) {
    case 'DRAFT':
      colorClassname = 'bg-gray-300 text-black';
      break;
    case 'PENDING':
      colorClassname = 'bg-[#FFE380] text-black';
      break;
    case 'NOTIFIED':
      colorClassname = 'bg-[#79E2F2] text-black';
      break;
    case 'UPDATED':
      colorClassname = 'bg-[#B3D4FF] text-black';
      break;
    case 'VALIDATED':
      colorClassname = 'bg-[#79F2C0] text-black';
      break;
    case 'ACCEPTED':
      colorClassname = 'bg-[#006644] text-white';
      break;
    case 'REJECTED':
      colorClassname = 'bg-[#BF2600] text-white';
      break;
    case 'WAITLIST':
      colorClassname = 'bg-[#403294] text-white';
      break;
  }

  return `${baseClassname} ${colorClassname}`;
}

export const statusOptions = [
  { value: "DRAFT", label: "DRAFT"},
  { value: "PENDING", label: "PENDING"},
  { value: "NOTIFIED", label: "NOTIFIED"},
  { value: "UPDATED", label: "UPDATED"},
  { value: "VALIDATED", label: "VALIDATED"},
  { value: "ACCEPTED", label: "ACCEPTED"},
  { value: "REJECTED", label: "REJECTED"},
  { value: "WAITLIST", label: "WAITLIST"}
]

const StatusCard = ({
  value,
}:{
  value: Status,
}) => {
  return (
    <div className={getStatusClassname(value, 'md')}>
      {value}
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
  const [applications, setApplications] = useRecoilState(applicationsState);
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
      <Select defaultValue={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DRAFT"><StatusCard value='DRAFT' /></SelectItem>
          <SelectItem value="PENDING"><StatusCard value='PENDING' /></SelectItem>
          <SelectItem value="NOTIFIED"><StatusCard value='NOTIFIED' /></SelectItem>
          <SelectItem value="UPDATED"><StatusCard value='UPDATED' /></SelectItem>
          <SelectItem value="VALIDATED"><StatusCard value='VALIDATED' /></SelectItem>
          <SelectItem value="ACCEPTED"><StatusCard value='ACCEPTED' /></SelectItem>
          <SelectItem value="REJECTED"><StatusCard value='REJECTED' /></SelectItem>
          <SelectItem value="WAITLIST"><StatusCard value='WAITLIST' /></SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ApplicationStatus
