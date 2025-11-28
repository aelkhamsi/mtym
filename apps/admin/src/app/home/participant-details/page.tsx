"use client"

import { ApplicationsTable } from "@/app/home/applications/components/applications-table";
import { columns } from "./components/columns";
import { ApplicationRow } from "./components/columns";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { participantDetailsAtom } from "@/store/participantDetailsAtom";

export default function ApplicationsPage() {
  const participantDetails = useAtomValue(participantDetailsAtom);
  const [tableData, setTableData] = useState<ApplicationRow[]>([])

  useEffect(() => {
    if (participantDetails) {
      setTableData(
        participantDetails.map((details: any) => ({
          id: details?.id,
          firstName: details?.user?.firstName,
          lastName: details?.user?.lastName,
          status: details?.status
        }))
      )
    }
  }, [participantDetails])

  return (
    <div className="space-y-8">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Participants Details
      </div>

      <ApplicationsTable columns={columns} data={tableData} />
    </div>
  );
}