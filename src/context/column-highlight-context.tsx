import React, { createContext, useState, useContext, ReactNode } from "react"

type ColumnHighlightContextType = {
  highlightedColumn: number | null
  setHighlightedColumn: (column: number | null) => void
}

const ColumnHighlightContext = createContext<ColumnHighlightContextType>({
  highlightedColumn: null,
  setHighlightedColumn: () => {
    //Pass
  },
})

type ColumnHighlightProps = {
  children: ReactNode
}

function ColumnHighlightProvider({ children }: ColumnHighlightProps) {
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(
    null
  )

  return (
    <ColumnHighlightContext.Provider
      value={{ highlightedColumn, setHighlightedColumn }}
    >
      {children}
    </ColumnHighlightContext.Provider>
  )
}

function useColumnHighlight() {
  const context = useContext(ColumnHighlightContext)

  return context
}

export { useColumnHighlight, ColumnHighlightProvider }
