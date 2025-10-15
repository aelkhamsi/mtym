"use client"

import { ApplicationsTable } from "@/app/home/applications/components/applications-table";
import { columns } from "./components/columns";
import { ApplicationRow } from "./components/columns";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { applicationsAtom } from "@/store/applicationsAtom";

export default function ApplicationsPage() {
  const applications = useAtomValue(applicationsAtom);
  const [tableData, setTableData] = useState<ApplicationRow[]>([])

  useEffect(() => {
    if (applications) {
      setTableData(
        applications.map((application: any) => ({
          id: application?.id,
          firstName: application?.user?.firstName,
          lastName: application?.user?.lastName,
          email: application?.user?.email,
          city: application?.city,
          establishment: application?.highschool,
          educationLevel: application?.educationLevel,
          status: application?.status?.status,
        }))
      )
    }
  }, [applications])

  return (
    <div className="space-y-8">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Applications
      </div>

      <ApplicationsTable columns={columns} data={tableData} />
    </div>
  );
}