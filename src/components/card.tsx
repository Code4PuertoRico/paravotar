import { ReactNode, forwardRef, Ref } from "react"

export type CardRef = HTMLDivElement
type Props = {
  id?: string
  tabIndex?: number
  className?: string
  children: ReactNode
}

export default forwardRef<CardRef, Props>(
  (
    { id = "", className = "", tabIndex = 0, children }: Props,
    ref: Ref<CardRef>
  ) => (
    <div
      id={id}
      className={`flex flex-col flex-shrink-0 justify-start w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 ${className}`}
      tabIndex={tabIndex}
      ref={ref}
      data-testid={id}
    >
      {children}
    </div>
  )
)
