import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="text-center">
      <span className="i-carbon-arrow-left size-20" />
    </div>
  )
}
