import Helmet from "react-helmet"

import Banner from "../../static/meta/banner.png"

const SITE_URL = "https://www.paravotar.org"
const TITLE = "Para Votar"
const DESCRIPTION = "Inscríbete, Practica y Sal a Votar"
const AUTHOR = "@Code4PuertoRico"

type Props = {
  title: string
  description?: string
  lang?: string
}

export default function SEO({
  title = TITLE,
  description = DESCRIPTION,
  lang = "es-PR",
}: Props) {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${title}`}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={Banner} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${Banner}`} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={AUTHOR} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${Banner}`} />
    </Helmet>
  )
}
