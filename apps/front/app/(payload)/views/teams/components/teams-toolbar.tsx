"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button, Input } from "@mdm/ui"
import { TeamsViewOptions } from "./teams-view-options"
import { getStatusClassname, statusOptions, Status } from "./team-status"
import { TableFacetedFilter } from "@/app/(payload)/components/table-faceted-filter"
import { useState } from "react"
import CreateTeamButton from "./create-team-button"
import { AdminOption } from "./columns"
import UpdateTeamStatusesButton from "./update-team-statuses-button"
import HideFromJury from "@/app/(payload)/components/HideFromJury"
import {
  getIntermediateReportDecisionClassname,
  intermediateReportDecisionOptions,
  type IntermediateReportDecisionValue,
} from "./intermediate-report-decision"

interface TeamsToolbarProps<TData> {
  table: Table<TData>
  onTeamCreated?: (team: any) => void,
  admins: AdminOption[]
  currentAdminId: string
}

export function TeamsToolbar<TData>({ 
  table,
  onTeamCreated,
  admins,
  currentAdminId
}: TeamsToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [savedPageIndex, setSavedPageIndex] = useState<number | null>(null)

  const handleIdFilterChange = (value: string) => {
    const currentFilter = table.getColumn("id")?.getFilterValue() as string | undefined

    if (value !== "" && !currentFilter) {
      setSavedPageIndex(table.getState().pagination.pageIndex)
      table.setPageIndex(0)
    } else if (value === "" && currentFilter && savedPageIndex !== null) {
      table.setPageIndex(savedPageIndex)
      setSavedPageIndex(null)
    }

    table.getColumn("id")?.setFilterValue(value)
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by id"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => handleIdFilterChange(event.target.value)}
          className="w-[150px]"
        />
        <Input
          placeholder="Filter by team name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-[150px]"
        />
        <Input
          placeholder="Filter by quadrigram"
          value={(table.getColumn("quadrigram")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("quadrigram")?.setFilterValue(event.target.value)
          }
          className="w-[150px]"
        />
        <HideFromJury>
          <Input
            placeholder="Filter by member name"
            value={(table.getColumn("memberName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("memberName")?.setFilterValue(event.target.value)
            }
            className="w-[180px]"
          />
        </HideFromJury>
        <HideFromJury>
          {table.getColumn("status") && (
            <TableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusOptions}
              getOptionClassname={(value) => getStatusClassname(value as Status, 'sm')}
              onFilterChange={() => table.setPageIndex(0)}
            />
          )}
        </HideFromJury>
        {table.getColumn("intermediateReportDecision") && (
          <TableFacetedFilter
            column={table.getColumn("intermediateReportDecision")}
            title="Intermediate Report Decision"
            options={intermediateReportDecisionOptions}
            getOptionClassname={(value) =>
              getIntermediateReportDecisionClassname(
                value as IntermediateReportDecisionValue,
                "sm",
              )
            }
            onFilterChange={() => table.setPageIndex(0)}
          />
        )}
        {table.getColumn("reviewerId") && (
          <TableFacetedFilter
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
            onFilterChange={() => table.setPageIndex(0)}
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

      <div className="flex items-center gap-2">
        <HideFromJury>
          <UpdateTeamStatusesButton />
          {onTeamCreated && <CreateTeamButton onCreated={onTeamCreated} />}
        </HideFromJury>
        <HideFromJury>
          <TeamsViewOptions table={table} />
        </HideFromJury>
      </div>
    </div>
  )
}
