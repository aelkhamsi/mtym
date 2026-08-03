"use client"

import { ApplicationsTable } from "./components/table/applications-table";
import { getColumns, type AdminOption } from "./components/table/columns";
import { ApplicationRow } from "./components/table/columns";
import { useEffect, useMemo, useState } from "react";
import { applicationsAtom } from "@/app/store/admin/applicationsAtom";
import { useAtomValue } from "jotai";

export default function ApplicationsClient({
  admins,
  currentAdminId,
}: {
  admins: AdminOption[]
  currentAdminId: string
}) {
  const applications = useAtomValue(applicationsAtom);
  const [tableData, setTableData] = useState<ApplicationRow[]>([])
  const columns = useMemo(() => getColumns(admins), [admins])

  useEffect(() => {
    if (applications) {
      const list = Array.isArray(applications) ? applications : []
      setTableData(
        list.map((application: any) => ({
          id: application?.id,
          firstName: application?.user?.firstName,
          lastName: application?.user?.lastName,
          email: application?.user?.email,
          city: application?.city,
          establishment: application?.highschool,
          educationLevel: application?.educationLevel,
          status: application?.status?.status,
          assignedAdminId: application?.assignedAdminId ?? null,
        }))
      )
    }
  }, [applications])

  return (
    <div className="space-y-8">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Applications
      </div>

      <ApplicationsTable
        columns={columns}
        data={tableData}
        admins={admins}
        currentAdminId={currentAdminId}
      />
    </div>
  );
}