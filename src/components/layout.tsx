import React, { ReactNode, useEffect } from "react"

import { Footer, Sidebar, Navbar } from "../components/index"

type Props = {
  children: ReactNode
  location: Location
}

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("smooth-scroll")('a[href*="#"]')
}

const Layout = ({ children, location }: Props) => {
  const hash = location?.hash
  const pathname = location?.pathname || ""

  useEffect(() => {
    const scrollOnInit = () => {
      if (typeof window !== "undefined" && hash) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const scroll = require("smooth-scroll")()
        const anchor = document.querySelector(hash)

        if (anchor) {
          scroll.animateScroll(anchor)
        }
      }
    }

    scrollOnInit()
  }, [hash])

  return (
    <>
      <div className="md:grid md:grid-flow-col md:grid-cols-5">
        <Sidebar pathname={pathname} />
        <Navbar pathname={pathname} />
        <div className="overflow-y-scroll bg-background md:col-span-4">
          <main className="w-full mx-auto mt-3">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
