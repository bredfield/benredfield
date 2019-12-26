module.exports = {
  siteMetadata: {
    title: `Ben Redfield`,
    description: `Personal website of developer and product manager Ben Redfield.`,
    author: `@benredfield`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          // include: /images/
        }
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`400`, `600`, `700`]
          }
        ],
      },
    },
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
      },
    },
  ],
}
