import { ReactElement } from "react"

type Props = {
  children: ReactElement
}

export default function Default({ children }: Props) {
  return children
}

Default.componentName = "default"
