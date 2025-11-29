import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/shared/table";
import Link from "next/link";
import { FileIcon } from "@/components/shared/icons";

const FileCard = ({
  href,
}:{
  href: string,
}) => {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}.amazonaws.com/${href}`;

  return (
    <Link
      href={url}
      target='_blank'
    >
      <div 
        className='w-[6rem] h-[6rem] rounded-xl border flex flex-col justify-center items-center space-y-2 cursor-pointer hover:bg-gray-100'
      >
        <FileIcon />
      </div>
    </Link>
  )
}

const FilesTable = ({
  participantDetails
}:{
  participantDetails: any
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {participantDetails?.filePhotoUrl && 
          <TableRow key='cnie'>
            <TableCell>Photo</TableCell>
            <TableCell><FileCard href={participantDetails?.filePhotoUrl} /></TableCell>
          </TableRow>
        }

        {participantDetails?.fileParentalAuthorizationUrl && 
          <TableRow key='school-certificate'>
            <TableCell>Parental Authorization</TableCell>
            <TableCell><FileCard href={participantDetails?.fileParentalAuthorizationUrl} /></TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}

export default FilesTable
