import { ReactNode, forwardRef, RefObject, Ref } from "react"

export type CardRef = HTMLDivElement
type Props = {
  id?: string
  ref?: RefObject<CardRef>
  tabIndex?: number
  className?: string
  children: ReactNode
}

const Card = (props: Props, ref: Ref<CardRef>) => (
  <div
    id={props.id}
    className={`flex flex-col flex-shrink-0 justify-start w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 ${props.className}`}
    tabIndex={props.tabIndex}
    ref={ref}
    data-testid={props.id}
  >
    {props.children}
  </div>
)

Card.defaultProps = {
  id: "",
  className: "",
  tabIndex: 0,
}

export default forwardRef<CardRef, Props>(Card)
