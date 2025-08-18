"use client"

import { Provider } from 'jotai'

export default function JotaiContextProvider({ children }: { children: React.ReactNode }) {  
  return <Provider>{children}</Provider>;
}