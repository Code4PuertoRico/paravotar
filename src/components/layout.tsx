import React, { ReactNode } from "react"

import { Footer } from "../components/index"

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="w-full mx-auto">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
