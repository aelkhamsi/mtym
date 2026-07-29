'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/shared/table";
import FilePreviewButton from "./file-preview-button";

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
        </TableRow>
      </TableHeader>

      <TableBody>
        {application?.fileCnieUrl && 
          <TableRow key='cnie'>
            <TableCell>CNIE</TableCell>
            <TableCell><FilePreviewButton filename={application?.fileCnieUrl} /></TableCell>
          </TableRow>
        }

        {application?.filePhotoUrl && 
          <TableRow key='photo'>
            <TableCell>Photo</TableCell>
            <TableCell><FilePreviewButton filename={application?.filePhotoUrl} /></TableCell>
          </TableRow>
        }

        {application?.fileGradesUrl && 
          <TableRow key='grades'>
            <TableCell>Grades</TableCell>
            <TableCell><FilePreviewButton filename={application?.fileGradesUrl} /></TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}

export default FilesTable
