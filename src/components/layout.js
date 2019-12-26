/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components";

export const Colors = {
  "green": "#CAF0C1",
  "greenDark": "#015D67",
  "blue": "#87E4DB",
  "gray": "#70A2A7",
  "grayLight": "#ADC9CD",
  "grayDark": "#4A5159",
  "orange": "#FC7560",
  "pink": "#F4B8B8",
  "fg": "#F5F9F9",
  "bg": "#015D67"
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
    background-color: ${Colors.bg};
    color: ${Colors.fg};
  }

  p {
    line-height: 24px;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: ${Colors.green};
  }

  a:hover {
    color: ${Colors.blueDark};
  }
`

const Layout = ({ children }) => {
  return (
    <React.Fragment>

      <GlobalStyle />
      <main>{children}</main>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
