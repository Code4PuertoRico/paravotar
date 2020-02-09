import React, { ReactNode } from "react"

import { Footer } from "../components/index"

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="w-10/12 mx-auto lg:w-full">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
