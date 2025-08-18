"use client"

import { ApplicationsTable } from "@/app/home/applications/components/applications-table";
import { applicationsState } from "@/store/applicationsState";
import { useRecoilValue } from "recoil";
import { columns } from "./components/columns";
import { ApplicationRow } from "./components/columns";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const applications = useRecoilValue(applicationsState);
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
          establishment: application?.universityName,
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