import React, { ReactNode } from "react"

import { Footer, Sidebar } from "../components/index"

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="grid grid-flow-col grid-cols-5 overflow-hidden">
        <Sidebar />
        <div className="overflow-y-scroll h-screen col-span-4 bg-gradient">
          <main className="w-full mx-auto mt-3">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
