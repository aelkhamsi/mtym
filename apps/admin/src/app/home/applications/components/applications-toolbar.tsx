"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/shared/button"
import { ApplicationsViewOptions } from "./applications-view-options"
import { statusOptions } from "./application-status"
import { ApplicationsFacetedFilter } from "./applications-faceted-filter"
import { FileTextIcon } from "@radix-ui/react-icons"
import axios from 'axios-typescript';
import { getToken } from "@/lib/utils"

export interface ApplicationsToolbarProps<TData> {
  table: Table<TData>
}

export function ApplicationsToolbar<TData>({
  table,
}: ApplicationsToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const onExportData = async () => {
    axios({
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + `excel/applications`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      responseType: 'blob', // important
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document?.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <ApplicationsFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
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