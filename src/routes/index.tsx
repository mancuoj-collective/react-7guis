import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '~/components/7guis/counter'
import { FlightBooker } from '~/components/7guis/flight-booker'
import { TemperatureConverter } from '~/components/7guis/temperature-converter'
import { Timer } from '~/components/7guis/timer'
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
      <FlightBooker />
      <Timer />
    </div>
  )
}
