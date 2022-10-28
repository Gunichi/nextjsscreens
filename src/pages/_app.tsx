import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ProSidebarProvider>
        <Component {...pageProps} />
      </ProSidebarProvider>
    </ChakraProvider>
  )
}

export default MyApp
