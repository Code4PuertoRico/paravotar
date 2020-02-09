import React, { ReactNode } from "react"

import { Footer } from "../components/index"

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(146deg, rgba(253,250,247,1) 0%, rgba(253,250,247,1) 50%, rgba(252,241,218,1) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <main className="w-10/12 mx-auto lg:w-full">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
