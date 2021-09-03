import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const ReactQueryWrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

const reactQueryRender = (ui, options) => render(ui, { wrapper: ReactQueryWrapper, ...options})

export { customRender as render, reactQueryRender };
