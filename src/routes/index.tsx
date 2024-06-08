import { createFileRoute } from '@tanstack/react-router'
import { Cells } from '~/components/7guis/cells'
import { CircleDrawer } from '~/components/7guis/circle-drawer'
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
    <div className="flex gap-5">
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
      <div className="flex flex-col gap-3">
        <CircleDrawer />
        <Cells />
      </div>
    </div>
  )
}
