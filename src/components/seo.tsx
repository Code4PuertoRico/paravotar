import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import Banner from "../../static/meta/banner.png"

type Meta = {
  description?: string
  lang?: string
  title: string
}

type Props = {
  description?: string
  lang?: string
  title: string
  meta: Meta[]
}

export default function SEO({ description, lang, title, meta }: Props) {
  const { site } =
    useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              title
              description
              author
              siteUrl
            }
          }
        }
      `
    ) || {}
  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={Banner} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`${site.siteMetadata.siteUrl}${Banner}`}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={`${site.siteMetadata.siteUrl}${Banner}`}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `es`,
  meta: [],
  description: ``,
}
