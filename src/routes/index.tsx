import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '~/components/7guis/counter'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Counter />
    </div>
  )
}
