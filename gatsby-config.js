const url = process.env.ROOT_URL || "https://www.paravotar.org"
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = url,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  BUNDLE_ANALYZER_TOKEN: BUNDLE_ANALYZER_TOKEN = false,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    siteUrl,
    title: `Para Votar`,
    description: `Inscríbete, Practica y Sal a Votar`,
    author: `@Code4PuertoRico`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Para Votar`,
        short_name: `Para Votar`,
        start_url: `/`,
        background_color: `#917149`,
        theme_color: `#917149`,
        display: `minimal-ui`,
        icon: `static/meta/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-react-axe",
      options: {
        // Integrate react-axe in production. This defaults to false.
        showInProduction: false,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-lodash`,

    BUNDLE_ANALYZER_TOKEN ? `@bundle-analyzer/gatsby-plugin` : false,

    `gatsby-plugin-no-sourcemaps`,
  ].filter(Boolean),
}
