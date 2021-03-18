import React from 'react'
import { render } from 'react-dom'
import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  extendTheme
} from '@chakra-ui/react'

import { createGlobalStyle } from 'styled-components'
import ComputerGame from './games/ComputerGame'

import ComputerGameProvider from './src/providers/ComputerGameProvider'

import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'
import 'antd/dist/antd.compact.css'
import theme from './theme'

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

    
`

const Chess = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ComputerGameProvider>
        {/* <SocketProvider> */}
        <GlobalStyles />
        {/* <Game /> */}
        <ComputerGame />
        {/* </SocketProvider> */}
      </ComputerGameProvider>
    </ChakraProvider>
  </>
)

render(<Chess />, document.querySelector('#Root'))
