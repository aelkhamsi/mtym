"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mdm/ui"
import { TeamsPagination } from "./teams-pagination"
import { useEffect, useState } from "react"
import { TeamsToolbar } from "./teams-toolbar"
import { usePersistedSorting } from '@/app/(payload)/hooks/usePersistedSorting';
import { useTablePreferences } from '@/app/(payload)/hooks/useTablePreferences';
import { AdminOption } from "./columns"

interface UsersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onTeamCreated?: (team: any) => void,
  admins: AdminOption[]
  currentAdminId: string
}

/* A team created from here lands wherever the current sorting puts it, which
 * is rarely the page being looked at. Rather than guessing a page, the table
 * is sent to the page that actually holds the new row and the row is
 * highlighted, so the creation is visible without resetting what the user had
 * set up (sorting, page size, filter). */
const HIGHLIGHT_DURATION = 4000

export function TeamsTable<TData, TValue>({
  columns,
  data,
  onTeamCreated,
  admins,
  currentAdminId,
}: UsersTableProps<TData, TValue>) {
  const [sorting, setSorting] = usePersistedSorting('teams-table-sorting')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ memberName: false })
  /* Two lifetimes, on purpose: the jump happens once, while the highlight
   * lingers. Keeping them together would re-jump under the user if they
   * re-sorted or filtered during the few seconds the row stays highlighted. */
  const [pendingPageFocusId, setPendingPageFocusId] = useState<string | null>(null)
  const [highlightedTeamId, setHighlightedTeamId] = useState<string | null>(null)
  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useTablePreferences(table, {
    storageKey: 'teams-table',
    persistedFilterIds: ['status'],
  })

  useEffect(() => {
    if (pendingPageFocusId === null) return

    const rows = table.getSortedRowModel().rows
    const rowIndex = rows.findIndex(
      (row) => String((row.original as any)?.id) === pendingPageFocusId
    )

    if (rowIndex === -1) {
      /* The row exists but the name filter hides it: clearing the filter is
       * the only way to show what was just created, and this effect runs
       * again on the filter change to jump to the right page. */
      if (table.getColumn("name")?.getFilterValue()) {
        table.getColumn("name")?.setFilterValue("")
      }
      return
    }

    table.setPageIndex(Math.floor(rowIndex / table.getState().pagination.pageSize))
    setPendingPageFocusId(null)
  }, [pendingPageFocusId, data, columnFilters, sorting, table])

  useEffect(() => {
    if (highlightedTeamId === null) return
    const timeout = setTimeout(() => setHighlightedTeamId(null), HIGHLIGHT_DURATION)
    return () => clearTimeout(timeout)
  }, [highlightedTeamId])

  return (
    <div className="space-y-2">
      <TeamsToolbar
        table={table}
        onTeamCreated={(team: any) => {
          setPendingPageFocusId(String(team?.id))
          setHighlightedTeamId(String(team?.id))
          onTeamCreated?.(team)
        }}
        admins={admins}
        currentAdminId={currentAdminId}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    String((row.original as any)?.id) === highlightedTeamId
                      ? "bg-green-50 ring-1 ring-inset ring-green-400"
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TeamsPagination table={table} />
    </div>
  )
}
