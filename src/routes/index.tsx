import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '~/components/7guis/counter'
import { Crud } from '~/components/7guis/crud'
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
      <div className="flex gap-3">
        <Counter />
        <ThemeToggle />
      </div>
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
      <Crud />
    </div>
  )
}
