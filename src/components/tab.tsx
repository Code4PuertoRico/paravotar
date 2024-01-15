import { ReactNode } from "react"

type TabProps = {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}

export default function Tab({ isActive, onClick, children }: TabProps) {
  return (
    <button
      className={`mx-2 px-2 pb-2 border border-b-8 border-t-0 border-r-0 border-l-0 transition ease-in-out duration-300 ${
        isActive ? "border-primary opacity-100" : "border-white opacity-25"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
