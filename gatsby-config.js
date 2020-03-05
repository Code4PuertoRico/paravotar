module.exports = {
  siteMetadata: {
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
  ],
}
