import { useState, useEffect } from 'react'
import { SortingState } from '@tanstack/react-table'

export function usePersistedSorting(key: string, defaultValue: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(defaultValue)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) setSorting(JSON.parse(stored))
    } catch {}
  }, [key])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(sorting))
    } catch {}
  }, [key, sorting])

  return [sorting, setSorting] as const
}