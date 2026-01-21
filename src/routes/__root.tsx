import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'react-hot-toast'

import Header from '../components/Header'

import TanStackQueryDevtools from '../providers/tanstack-query-devtools'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

// Routes without navbar
const routesWithoutNavbar = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/otp',
  '/reset-otp',
  '/coming-soon',
  '/maintenance',
  '/404',
]

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const pathname = window.location.pathname
  const showNavbar = !routesWithoutNavbar.includes(pathname)

  return (
    <>
      {showNavbar && <Header />}
      <Outlet />
      <Toaster position="top-right" />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  )
}
