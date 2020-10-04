import React, { ReactNode, useState } from "react"

import { Footer, Sidebar, Navbar } from "../components/index"
import { withTrans } from "../i18n/withTrans"
import Menu from "../assets/icons/menu.svg"

type Props = {
  children: ReactNode
  location: Location
}

const Layout = ({ children, location }: Props) => {
  const hash = location?.hash || ""
  const pathname = location?.pathname || ""
  const [showSidebar, toggleSidebar] = useState(true)

  return (
    <>
      <a
        className="absolute overflow-hidden text-center w-1 h-1 mt-1 mx-1 focus:w-full focus:h-auto focus:overflow-none focus:z-50 focus:bg-secondary"
        href="#main-content"
      >
        Ir al contenido principal
      </a>
      <Navbar pathname={`${pathname}${hash}`} />
      <div
        className="wrapper"
        style={{
          gridTemplateColumns: showSidebar ? "275px auto" : "auto",
        }}
      >
        {showSidebar && <Sidebar pathname={`${pathname}${hash}`} />}
        <div
          className="main"
          style={{
            gridColumnStart: showSidebar ? "2" : "1",
          }}
        >
          <main
            id="main-content"
            className="main-content"
            style={{
              maxWidth: showSidebar ? "calc(100vw - 275px)" : "100%",
            }}
          >
            <button
              className="sidebar-toggler"
              onClick={() => toggleSidebar(!showSidebar)}
            >
              <img className="h-5 w-5" src={Menu} alt="Menu" />
            </button>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default withTrans(Layout)
