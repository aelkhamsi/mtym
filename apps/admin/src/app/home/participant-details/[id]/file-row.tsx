import {
  TableRow,
  TableCell
} from "@/components/shared/table";
import { FileStatus } from "./file-status";
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

const FileRow = ({
  key,
  fileName,
  fileUrl,
  fileStatus,
}:{
  key: string,
  fileName: string
  fileUrl: string,
  fileStatus: FileStatus,
}) => {
  return (
    <TableRow key={key}>
      <TableCell>{fileName}</TableCell>
      <TableCell><FileCard href={fileUrl} /></TableCell>
      <TableCell>{fileStatus}</TableCell>
    </TableRow>
  )
}

export default FileRow
