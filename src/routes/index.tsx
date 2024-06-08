import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '~/components/7guis/counter'
import { TemperatureConverter } from '~/components/7guis/temperature-converter'
import { ThemeToggle } from '~/components/theme-toggle'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col gap-3">
      <ThemeToggle />
      <Counter />
      <TemperatureConverter />
    </div>
  )
}
