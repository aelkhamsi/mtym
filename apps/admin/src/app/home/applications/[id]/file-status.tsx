import { applicationsState } from '@/store/applicationsState'
import React, { ReactNode } from 'react'
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

export type FileStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'VALID'
  | 'NOT_VALID';

const getStatusClassname = (status: FileStatus) => {
  const baseClassname = 'rounded-lg px-6 py-1';
  let colorClassname;

  switch(status) {
    case 'DRAFT':
      colorClassname = 'bg-gray-300 text-black';
      break;
    case 'PENDING':
      colorClassname = 'bg-[#FFE380] text-black';
      break;
    case 'VALID':
      colorClassname = 'bg-[#006644] text-white';
      break;
    case 'NOT_VALID':
      colorClassname = 'bg-[#BF2600] text-white';
      break;
  }

  return `${baseClassname} ${colorClassname}`;
}

const StatusCard = ({
  value,
  children,
}:{
  value: FileStatus,
  children?: ReactNode,
}) => {
  return (
    <div className={getStatusClassname(value)}>
      {children}
    </div>
  )
}

const FileStatus = ({
  slug,
  application,
}:{
  slug: 'fileCnie' | 'fileMembersCnie' | 'fileGrades' | 'fileParentalAuthorization',
  application: any,
}) => {
  const [applications, setApplications] = useRecoilState(applicationsState);
  const currentFileStatus = application?.status[`${slug}Status`];
  const handleStatusChange = async (value: FileStatus) => {
    const response = await putApplicationStatus(application?.id, {
      [`${slug}Status`]: value,
    }) as any;

    if (response?.statusCode === 200) {
      setApplications(
        applications.map((entry: any) => {
          if (entry?.id === application?.id) {
            return {...entry, status: {...entry.status, [`${slug}Status`]: value}}
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
    <Select defaultValue={currentFileStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="DRAFT"><StatusCard value='DRAFT'>DRAFT</StatusCard></SelectItem>
        <SelectItem value="PENDING"><StatusCard value='PENDING'>PENDING</StatusCard></SelectItem>
        <SelectItem value="VALID"><StatusCard value='VALID'>VALID</StatusCard></SelectItem>
        <SelectItem value="NOT_VALID"><StatusCard value='NOT_VALID'>NOT VALID</StatusCard></SelectItem>
      </SelectContent>
    </Select>
  )
}

export default FileStatus
