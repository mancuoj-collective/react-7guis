import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="text-center">
      <span className="i-carbon-arrow-right size-20" />
    </div>
  )
}
