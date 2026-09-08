import { useEffect, useState } from "react"
import { Table, VisibilityState } from "@tanstack/react-table"
import { usePathname, useSearchParams } from "next/navigation"

type TablePreferencesOptions = {
  storageKey: string
  persistedFilterIds: string[]
  columnVisibilityDefaults?: VisibilityState
}

export function useTablePreferences<TData>(
  table: Table<TData>,
  { storageKey, persistedFilterIds, columnVisibilityDefaults }: TablePreferencesOptions,
) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hasHydrated, setHasHydrated] = useState(false)
  const columnVisibility = table.getState().columnVisibility
  const columnFilters = table.getState().columnFilters
  const { pageIndex, pageSize } = table.getState().pagination

  useEffect(() => {
    try {
      const savedVisibility = localStorage.getItem(`${storageKey}-column-visibility`)
      if (savedVisibility) {
        const visibility: VisibilityState = JSON.parse(savedVisibility)
        table.getAllColumns().forEach((column) => {
          if (!column.getCanHide()) return
          if (column.id in visibility) {
            column.toggleVisibility(!!visibility[column.id])
          }
        })
      }

      persistedFilterIds.forEach((filterId) => {
        const savedFilter = localStorage.getItem(`${storageKey}-filter:${filterId}`)
        if (!savedFilter) return

        const values: string[] = JSON.parse(savedFilter)
        if (Array.isArray(values) && values.length) {
          table.getColumn(filterId)?.setFilterValue(values)
        }
      })
    } catch {}

    const pageParam = searchParams.get("page")
    const sizeParam = searchParams.get("pageSize")

    if (sizeParam && !isNaN(Number(sizeParam))) {
      table.setPageSize(Number(sizeParam))
    }
    if (pageParam && !isNaN(Number(pageParam))) {
      table.setPageIndex(Math.max(0, Number(pageParam) - 1))
    }

    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!columnVisibilityDefaults) return

    Object.entries(columnVisibilityDefaults).forEach(([columnId, isVisible]) => {
      table.getColumn(columnId)?.toggleVisibility(isVisible)
    })
  }, [columnVisibilityDefaults])

  useEffect(() => {
    if (!hasHydrated) return

    try {
      localStorage.setItem(
        `${storageKey}-column-visibility`,
        JSON.stringify(columnVisibility),
      )

      persistedFilterIds.forEach((filterId) => {
        const filterValue = columnFilters.find((filter) => filter.id === filterId)?.value
        const filterStorageKey = `${storageKey}-filter:${filterId}`

        if (filterValue && (filterValue as string[]).length) {
          localStorage.setItem(filterStorageKey, JSON.stringify(filterValue))
        } else {
          localStorage.removeItem(filterStorageKey)
        }
      })
    } catch {}
  }, [hasHydrated, columnVisibility, columnFilters])

  useEffect(() => {
    if (!hasHydrated) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", `${pageIndex + 1}`)
    params.set("pageSize", `${pageSize}`)

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
  }, [hasHydrated, pageIndex, pageSize])
}
