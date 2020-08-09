import React, { ReactNode } from "react"

import { Footer, Sidebar, Navbar } from "../components/index"
import { withTrans } from "../i18n/withTrans"

type Props = {
  children: ReactNode
  location: Location
}

const Layout = ({ children, location }: Props) => {
  const hash = location?.hash || ""
  const pathname = location?.pathname || ""

  return (
    <>
      <a
        className="absolute overflow-hidden text-center w-1 h-1 mt-1 mx-1 focus:w-full focus:h-auto focus:overflow-none focus:z-50 focus:bg-secondary"
        href="#main-content"
      >
        Ir al contenido principal
      </a>
      <div className="lg:grid lg:grid-flow-col lg:grid-cols-5">
        <Sidebar pathname={`${pathname}${hash}`} />
        <Navbar pathname={`${pathname}${hash}`} />
        <div className="overflow-y-scroll bg-background lg:col-span-4">
          <main id="main-content" className="w-full mx-auto pt-3">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default withTrans(Layout)
