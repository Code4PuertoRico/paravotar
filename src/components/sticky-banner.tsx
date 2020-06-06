import React from "react"

export const StickyBanner: React.FunctionComponent = ({ children }) => {
  return (
    <div
      className="w-full lg:w-10/12 p-6 fixed bg-background bottom-0"
      style={{ boxShadow: "0px 2px 10px #cacad9" }}
    >
      {children}
    </div>
  )
}
