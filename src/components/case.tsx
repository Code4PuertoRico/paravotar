import { ReactElement } from "react"

type Props = {
  value: string | number | {}
  children: ReactElement
}

export default function Case({ children }: Props) {
  return children
}

Case.componentName = "case"
