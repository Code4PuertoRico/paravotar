import { PropsWithChildren } from "react"

export const StickyBanner = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="w-full lg:w-10/12 p-4 fixed bg-background bottom-0 md-whiteframe-12dp">
      {children}
    </div>
  )
}
