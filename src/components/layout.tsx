import React, { ReactNode, useEffect } from "react"

import SmoothScroll from "smooth-scroll"

import { Footer, Sidebar } from "../components/index"

type Props = {
  children: ReactNode
  location: Location
}

if (typeof window !== "undefined") {
  new SmoothScroll('a[href*="#"]')
}

const Layout = ({ children, location }: Props) => {
  const hash = location?.hash
  const pathname = location?.pathname || ""

  useEffect(() => {
    const scrollOnInit = () => {
      if (typeof window !== "undefined" && hash) {
        console.log("check", hash)
        const scroll = new SmoothScroll()
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
      <div className="grid grid-flow-col grid-cols-5">
        <Sidebar pathname={pathname} />
        <div className="overflow-y-scroll col-span-4 bg-background">
          <main className="w-full mx-auto mt-3">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
