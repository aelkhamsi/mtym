"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@mdm/ui"
import { ApplicationsViewOptions } from "./applications-view-options"
import { statusOptions } from "./application-status"
import { ApplicationsFacetedFilter } from "./applications-faceted-filter"
import { FileTextIcon } from "@radix-ui/react-icons"
import type { AdminOption } from "./columns"
import { Input } from "@mdm/ui"

export interface ApplicationsToolbarProps<TData> {
  table: Table<TData>
  admins: AdminOption[]
  currentAdminId: string
}

export function ApplicationsToolbar<TData>({
  table,
  admins,
  currentAdminId,
}: ApplicationsToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const onExportData = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/excel/applications`,
      {
        method: "GET",
        credentials: "include",
      }
    )
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document?.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by id"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-[150px]"
        />
        {table.getColumn("status") && (
          <ApplicationsFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
            colorizeOptions
          />
        )}
        {table.getColumn("reviewerId") && (
          <ApplicationsFacetedFilter
            column={table.getColumn("reviewerId")}
            title="Reviewer"
            options={[
              { value: "__unassigned__", label: "Unassigned" },
              ...admins.map((admin) => ({
                value: admin.id,
                label: admin.id === currentAdminId
                  ? `Assigned to me (${admin.label})`
                  : admin.label,
              })),
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex space-x-4">
        {/* export applications excel */}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={onExportData}
        >
          <FileTextIcon className="mr-2 h-4 w-4" />

          Export data
        </Button>

        <ApplicationsViewOptions table={table} />
      </div>
    </div>
  )
}