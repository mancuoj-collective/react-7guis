import type { QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'
import { Meteors } from '~/components/ui/meteors'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})

function Root() {
  return (
    <ScrollArea className="h-dvh">
      <div className="flex flex-col font-sans antialiased">
        <div className="mx-auto p-20">
          <nav className="mb-10 flex items-center gap-3">
            <Link to="/" className="font-bold text-foreground/60 [&.active]:text-foreground">
              Home
            </Link>
            <Link to="/about" className="font-bold text-foreground/60 [&.active]:text-foreground">
              About
            </Link>
            <ThemeToggle />
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <Meteors />
      <Toaster />
    </ScrollArea>
  )
}
