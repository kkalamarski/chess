import React from 'react'
import { render } from 'react-dom'
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  CSSReset
} from '@chakra-ui/react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import ComputerGame from './games/ComputerGame'

import ComputerGameProvider from './src/providers/ComputerGameProvider'

import theme from './theme'
import LandingPage from './pages/LandingPage'

const GlobalStyles = createGlobalStyle`
  :root {
    --light-square: #FFFBFF;
    --dark-square: #83c5beff;
    --available-move: #E29578;
    --last-move: #ffddd2ff;

    --ming: #006d77ff;
    --middle-blue-green: #83c5beff;
    --alice-blue: #edf6f9ff;
    --dark-salmon: #e29578ff;
  }

  html, body {
    height: 100vh;
    width: 100vw;
  } 

  #Root {
    height: 100%;
  }
`

const Chess = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ComputerGameProvider>
        <GlobalStyles />
        <Router>
          <Box pos="fixed" top={0} left={0} right={0} h={100} p={5} zIndex={99}>
            <Link to="/">Chess </Link>
          </Box>
          <Route path="/" exact component={LandingPage} />
          <Route path="/chess" component={ComputerGame} />
        </Router>
      </ComputerGameProvider>
    </ChakraProvider>
  </>
)

render(<Chess />, document.querySelector('#Root'))
