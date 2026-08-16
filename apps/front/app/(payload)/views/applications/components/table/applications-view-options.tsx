"use client"

import { useEffect, useRef } from "react"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table, VisibilityState } from "@tanstack/react-table"
import { Button } from "@mdm/ui"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@mdm/ui"

interface ApplicationsViewOptionsProps<TData> {
  table: Table<TData>  
}

const columnVisibilityStorageKey = 'applications-table-column-visibility'

export function ApplicationsViewOptions<TData>({
  table,
}: ApplicationsViewOptionsProps<TData>) {
  const hasHydrated = useRef(false)
  const columnVisibility = table.getState().columnVisibility

  useEffect(() => {
    if (hasHydrated.current) return
    hasHydrated.current = true

    try {
      const saved = localStorage.getItem(columnVisibilityStorageKey)
      if (!saved) return
      
      const visibility: VisibilityState = JSON.parse(saved)
      table.getAllColumns().forEach((column) => {
        if (!column.getCanHide()) return
        if (column.id in visibility) {
          column.toggleVisibility(!!visibility[column.id])
        }
      })
    } catch {}
  }, [])

  useEffect(() => {
    if (!hasHydrated.current) return
    
    try {
      localStorage.setItem(columnVisibilityStorageKey, JSON.stringify(columnVisibility))
    } catch {}
  }, [columnVisibility, columnVisibilityStorageKey])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}