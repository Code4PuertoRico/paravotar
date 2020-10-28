import React, { ReactNode } from "react"
import i18next from "i18next"
import styled from "styled-components"

import { Footer, Sidebar, Navbar } from "../components/index"
import { withTrans } from "../i18n/withTrans"
import { useSidebar } from "../context/sidebar-context"
import NotiUno from "../assets/images/notiuno.png"
import Arrows from "./arrows"
import Link from "./link"
import Typography from "./typography"

type Props = {
  children: ReactNode
  location: Location
}

const PromoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 6px 10px #cacad9;
  border: 1px solid #886944;
  border-radius: 5px;
`

const Layout = ({ children, location }: Props) => {
  const hash = location?.hash || ""
  const pathname = location?.pathname || ""
  const { sidebarIsVisible, setSidebarIsVisible } = useSidebar()

  return (
    <>
      <a
        className="absolute overflow-hidden text-center w-1 h-1 mt-1 mx-1 focus:w-full focus:h-auto focus:overflow-none focus:z-50 focus:bg-secondary"
        href="#main-content"
      >
        Ir al contenido principal
      </a>
      <Navbar pathname={`${pathname}${hash}`} />
      {!sidebarIsVisible && (
        <nav className="hidden lg:flex lg:items-center lg:px-4 lg:py-2 lg:block lg:bg-secondary lg:shadow lg:sticky lg:top-0 lg:z-10">
          <button
            className="flex items-center"
            onClick={() => setSidebarIsVisible(!sidebarIsVisible)}
          >
            <Arrows className="mr-4" style={{ transform: "rotate(-90deg)" }} />
            {i18next.t("nav.show-menu")}
          </button>
        </nav>
      )}
      <div
        className={`wrapper ${
          sidebarIsVisible ? "wrapper-with-sidebar" : "wrapper-without-sidebar"
        }`}
      >
        {sidebarIsVisible && <Sidebar pathname={`${pathname}${hash}`} />}
        <div
          id="main-container"
          className={`main ${
            sidebarIsVisible ? "main-with-sidebar" : "main-without-sidebar"
          }`}
        >
          <main
            id="main-content"
            className={`main-content ${
              sidebarIsVisible ? "main-content-with-sidebar" : "max-w-full"
            }`}
          >
            <div className="px-4 mt-6 lg:hidden">
              <PromoContainer>
                <Link to="https://www.notiuno.com/" target="_blank">
                  <img className="h-10" src={NotiUno} alt="NotiUno" />
                </Link>
                <span className="ml-6">
                  <Typography variant="p" tag="span">
                    En alianza te invita a
                  </Typography>
                  <br />
                  <Typography variant="p" tag="span">
                    <strong className="text-primary">PRACTICAR</strong> tu voto.
                  </Typography>
                </span>
              </PromoContainer>
            </div>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default withTrans(Layout)
