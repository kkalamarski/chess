import React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import ComputerGame from './games/ComputerGame'

import ComputerGameProvider from './src/providers/ComputerGameProvider'

import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'
import 'antd/dist/antd.compact.css'

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
    margin: 0;
    padding: 0;

    font-family: 'Montserrat', sans-serif;
  }
`

const Chess = () => (
  <ComputerGameProvider>
    {/* <SocketProvider> */}
    <GlobalStyles />
    {/* <Game /> */}
    <ComputerGame />
    {/* </SocketProvider> */}
  </ComputerGameProvider>
)

render(<Chess />, document.querySelector('#Root'))
