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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
