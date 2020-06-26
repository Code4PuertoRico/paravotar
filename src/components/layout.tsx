import React, { ReactNode, useEffect } from "react"

import { Footer, Sidebar, Navbar } from "../components/index"
import { withTrans } from "../i18n/withTrans"

type Props = {
  children: ReactNode
  location: Location
}

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("smooth-scroll")('a[href*="#"]', {
    offset: () => 70,
  })
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
          scroll.animateScroll(anchor, null, {
            offset: () => 70,
          })
        }
      }
    }

    scrollOnInit()
  }, [hash])

  return (
    <>
      <a
        className="absolute overflow-hidden text-center w-1 h-1 mt-1 mx-1 focus:w-full focus:h-auto focus:overflow-none focus:z-50 focus:bg-secondary"
        href="#main-content"
      >
        Ir al contenido principal
      </a>
      <div className="lg:grid lg:grid-flow-col lg:grid-cols-5">
        <Sidebar pathname={pathname} />
        <Navbar pathname={pathname} />
        <div className="overflow-y-scroll bg-background lg:col-span-4">
          <main id="main-content" className="w-full mx-auto mt-3">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default withTrans(Layout)
