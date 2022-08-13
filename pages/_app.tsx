import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import theme from '../src/theme'
import { createGlobalStyle } from 'styled-components'

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
