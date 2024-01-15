import { createContext, useState, useContext, ReactNode } from "react"

type SidebarContextType = {
  sidebarIsVisible: boolean
  setSidebarIsVisible: (isVisible: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarIsVisible: true,
  setSidebarIsVisible: () => {
    // Pass
  },
})

type SidebarProps = {
  children: ReactNode
}

function SidebarProvider({ children }: SidebarProps) {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <SidebarContext.Provider
      value={{ sidebarIsVisible: isVisible, setSidebarIsVisible: setIsVisible }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  const context = useContext(SidebarContext)

  return context
}

export { useSidebar, SidebarProvider }
