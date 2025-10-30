"use client"

import { useEffect, useState } from "react";
import { UserRow, columns } from "./components/columns";
import { UsersTable } from "./components/users-table";
import { useAtomValue } from "jotai";
import { usersAtom } from "@/store/usersAtom";

export default function UsersPage() {
  const users = useAtomValue(usersAtom);
  const [tableData, setTableData] = useState<UserRow[]>([])

  useEffect(() => {
    if (users) {
      setTableData(
        users.map((user: any) => ({
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          applicationId: user?.application?.id,
          teamId: user?.team?.id,
        }))
      )
    }
  }, [users])

  return (
    <div className="space-y-4">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Users
      </div>
      
      <UsersTable columns={columns} data={tableData} />
    </div>
  );
}