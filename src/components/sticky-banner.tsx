import React from "react"

export const StickyBanner: React.FunctionComponent = ({ children }) => {
  return (
    <div className="w-full lg:w-10/12 border-t border-grey p-6 fixed bg-white bottom-0">
      {children}
    </div>
  )
}
