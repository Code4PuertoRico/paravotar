import { ReactNode } from "react"


// const Tour = Loadable({
//   loader: () => import("reactour"),
//   loading: () => null,
// })

type BallotContainerProps = {
  children: ReactNode
}

export default function BallotContainer(props: BallotContainerProps) {

  return (
    <div id="ballot-container" className="overflow-scroll -mx-6 mt-6">
      {props.children}
    </div>
  )
}
