import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})

function Root() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center font-serif antialiased">
      <Outlet />
      <Toaster position="bottom-center" />
    </div>
  )
}
