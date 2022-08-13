import type { AppProps } from 'next/app'
import { Box, Button, ChakraProvider, CSSReset, Link } from '@chakra-ui/react'
import theme from '../src/theme'
import { createGlobalStyle } from 'styled-components'
import { useEffect } from 'react'

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
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function(err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyles />
      <Box h="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
