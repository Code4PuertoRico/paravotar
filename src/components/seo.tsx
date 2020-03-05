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
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "image",
          content: Banner,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: Banner,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: Banner,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `es`,
  meta: [],
  description: ``,
}
