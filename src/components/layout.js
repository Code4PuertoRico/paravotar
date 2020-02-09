/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Footer } from "../components/index"

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-background">
        <div className="max-w-6xl mx-auto">
          <main className="w-10/12 mx-auto lg:w-full">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
