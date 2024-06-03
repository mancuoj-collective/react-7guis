import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})

function Root() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center font-sans antialiased">
      <ThemeToggle />
      <Outlet />
      <Toaster />
    </div>
  )
}
