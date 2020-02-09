module.exports = {
  siteMetadata: {
    title: `Title`,
    description: `Something that we need to add`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     custom: {
    //       families: ["Inter"],
    //       urls: ["/fonts/inter.css"],
    //     },
    //   },
    // },
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-react-axe",
      options: {
        // Integrate react-axe in production. This defaults to false.
        showInProduction: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
