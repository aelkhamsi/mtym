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
  application
}:{
  application: any
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {application?.fileCnieUrl && 
          <TableRow key='cnie'>
            <TableCell>CNIE</TableCell>
            <TableCell><FileCard href={application?.fileCnieUrl} /></TableCell>
          </TableRow>
        }

        {application?.fileSchoolCertificateUrl && 
          <TableRow key='school-certificate'>
            <TableCell>School Certificate</TableCell>
            <TableCell><FileCard href={application?.fileSchoolCertificateUrl} /></TableCell>
          </TableRow>
        }

        {application?.fileGradesUrl && 
          <TableRow key='grades'>
            <TableCell>Grades</TableCell>
            <TableCell><FileCard href={application?.fileGradesUrl} /></TableCell>
          </TableRow>
        }

        {application?.fileRegulationsUrl && 
          <TableRow key='regulations'>
            <TableCell>Regulations</TableCell>
            <TableCell><FileCard href={application?.fileRegulationsUrl} /></TableCell>
          </TableRow>
        }
        
      </TableBody>
    </Table>
  )
}

export default FilesTable
